import { query } from '../config/database.js';
import { uploadFileToS3, deleteFileFromS3, moveFileOnS3, getS3ObjectStream } from '../services/uploadService.js';
import fs from 'fs';
import path from 'path';

// Get all jobs formatted for frontend careers page
export const getJobs = async (req, res, next) => {
    try {
        const showAll = req.query.all === 'true';
        const platform = req.params.platform || req.query.platform;
        
        let selectQuery = `SELECT * FROM jobs WHERE status = 'active'`;
        const params = [];
        
        if (showAll) {
            selectQuery = `SELECT * FROM jobs`;
        }
        
        if (platform) {
            const platformParam = `%${platform.trim().toLowerCase()}%`;
            if (showAll) {
                selectQuery += ` WHERE platform LIKE $1`;
            } else {
                selectQuery += ` AND platform LIKE $1`;
            }
            params.push(platformParam);
        }
        
        selectQuery += ` ORDER BY id DESC`;
        const result = await query(selectQuery, params);
        const rows = result.rows || [];

        // Format to match jobs.json shape
        const formattedJobs = rows.map(job => {
            let jdPath = job.jd_file_path || "";
            if (!showAll && jdPath) {
                const filename = jdPath.split('/').pop().split('\\').pop();
                const protocol = req.headers['x-forwarded-proto'] || req.protocol;
                const host = req.get('host');
                jdPath = `${protocol}://${host}/api/jds/view/${filename}`;
            }
            return {
                id: job.id,
                title: job.title,
                status: job.status || "active",
                platform: job.platform || "pmc",
                details: {
                    "Qualification": job.qualification || "",
                    "Location": job.location || "Pan India",
                    "Gender": job.gender || "Any"
                },
                jd_file_path: jdPath
            };
        });

        // Always include the dummy header row "Position" at the very beginning of the response array
        // to maintain 100% layout compatibility with any old frontend index filter dependencies.
        const responseData = [
            { title: "Position", details: {} },
            ...formattedJobs
        ];

        return res.status(200).json({ ok: true, data: responseData });
    } catch (error) {
        next(error);
    }
};

// Create a new job opening
export const createJob = async (req, res, next) => {
    try {
        const { title, qualification, location, gender, status, platform } = req.body;
        const platformParam = platform || req.params.platform || 'pmc';
        const cleanedPlatforms = platformParam.split(',')
            .map(p => p.trim().toLowerCase())
            .filter(p => ['pmc', 'epc'].includes(p));
        const finalPlatform = cleanedPlatforms.length > 0 ? cleanedPlatforms.join(',') : 'pmc';

        if (!title || !title.trim()) {
            return res.status(400).json({ ok: false, message: 'Job title is required' });
        }

        let finalGender = 'Any';
        if (gender) {
            const trimmedGender = gender.trim();
            if (['Male', 'Female', 'Any'].includes(trimmedGender)) {
                finalGender = trimmedGender;
            }
        }

        let jd_file_path = null;
        if (req.file) {
            const primaryPlatform = finalPlatform.split(',')[0] || 'pmc';
            jd_file_path = await uploadFileToS3(req.file, `${primaryPlatform}/jd`);
        }

        const insertQuery = `
            INSERT INTO jobs (title, qualification, location, gender, jd_file_path, status, platform)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        await query(insertQuery, [
            title.trim(),
            qualification ? qualification.trim() : '',
            location ? location.trim() : 'Pan India',
            finalGender,
            jd_file_path,
            status === 'inactive' ? 'inactive' : 'active',
            finalPlatform
        ]);

        return res.status(201).json({ ok: true, message: 'Job opening created successfully' });
    } catch (error) {
        next(error);
    }
};

// Update an existing job opening
export const updateJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, qualification, location, gender, status, platform, remove_jd } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ ok: false, message: 'Job title is required' });
        }

        // Verify job exists
        const checkQuery = `SELECT id, jd_file_path, status, platform, gender FROM jobs WHERE id = $1`;
        const checkResult = await query(checkQuery, [id]);
        if (!checkResult.rows || checkResult.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Job opening not found' });
        }

        const existingJob = checkResult.rows[0];
        let jd_file_path = existingJob.jd_file_path;
        const finalStatus = (status === 'inactive') ? 'inactive' : 'active';

        // Platform priority: body platform > URL param > existing platform
        // This ensures moving a job between EPC/PMC works correctly
        const platformParam = platform || req.params.platform || existingJob.platform || 'pmc';
        const cleanedPlatforms = platformParam.split(',')
            .map(p => p.trim().toLowerCase())
            .filter(p => ['pmc', 'epc'].includes(p));
        const finalPlatform = cleanedPlatforms.length > 0 ? cleanedPlatforms.join(',') : 'pmc';

        // Handle moving existing JD file to new platform folder on S3 if primary platform changed
        const oldPrimary = (existingJob.platform || 'pmc').split(',')[0] || 'pmc';
        const newPrimary = finalPlatform.split(',')[0] || 'pmc';
        if (jd_file_path && !req.file && remove_jd !== 'true' && oldPrimary !== newPrimary) {
            jd_file_path = await moveFileOnS3(jd_file_path, `${newPrimary}/jd`);
        }

        let finalGender = 'Any';
        if (gender) {
            const trimmedGender = gender.trim();
            if (['Male', 'Female', 'Any'].includes(trimmedGender)) {
                finalGender = trimmedGender;
            }
        } else if (existingJob.gender) {
            finalGender = existingJob.gender;
        }

        // Handle JD removal
        if (remove_jd === 'true' && jd_file_path) {
            await deleteFileFromS3(jd_file_path);
            jd_file_path = null;
        }

        if (req.file) {
            // Delete the old JD file if it exists
            if (jd_file_path) {
                await deleteFileFromS3(jd_file_path);
            }
            // Upload the new one
            const primaryPlatform = finalPlatform.split(',')[0] || 'pmc';
            jd_file_path = await uploadFileToS3(req.file, `${primaryPlatform}/jd`);
        }

        const updateQuery = `
            UPDATE jobs 
            SET title = $1, 
                qualification = $2, 
                location = $3, 
                gender = $4, 
                jd_file_path = $5, 
                status = $6,
                platform = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
        `;

        await query(updateQuery, [
            title.trim(),
            qualification ? qualification.trim() : '',
            location ? location.trim() : 'Pan India',
            finalGender,
            jd_file_path,
            finalStatus,
            finalPlatform,
            id
        ]);

        return res.status(200).json({ ok: true, message: 'Job opening updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Toggle job active/inactive status
export const toggleJobStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Verify job exists
        const checkQuery = `SELECT id, status FROM jobs WHERE id = $1`;
        const checkResult = await query(checkQuery, [id]);
        if (!checkResult.rows || checkResult.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Job opening not found' });
        }

        const existingJob = checkResult.rows[0];
        const newStatus = existingJob.status === 'inactive' ? 'active' : 'inactive';

        const updateQuery = `
            UPDATE jobs 
            SET status = $1, 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
        `;
        await query(updateQuery, [newStatus, id]);

        return res.status(200).json({ ok: true, message: `Job opening is now ${newStatus}`, status: newStatus });
    } catch (error) {
        next(error);
    }
};

// Delete a job opening permanently
export const deleteJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Verify job exists and get its JD file path
        const checkQuery = `SELECT id, jd_file_path, title FROM jobs WHERE id = $1`;
        const checkResult = await query(checkQuery, [id]);
        if (!checkResult.rows || checkResult.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Job opening not found' });
        }

        const existingJob = checkResult.rows[0];

        // Delete JD file from S3 if it exists
        if (existingJob.jd_file_path) {
            try {
                await deleteFileFromS3(existingJob.jd_file_path);
            } catch (fileErr) {
                console.warn('Warning: Could not delete JD file from storage:', fileErr.message);
            }
        }

        // Delete from database
        await query(`DELETE FROM jobs WHERE id = $1`, [id]);

        return res.status(200).json({ ok: true, message: `Job "${existingJob.title}" deleted successfully` });
    } catch (error) {
        next(error);
    }
};

// Stream JD file from S3 or local fallback
export const viewJD = async (req, res, next) => {
    try {
        const { filename } = req.params;
        
        if (!filename) {
            return res.status(400).json({ ok: false, message: 'Filename is required' });
        }

        // Look up in the database to retrieve the file_path
        const selectQuery = `SELECT jd_file_path FROM jobs WHERE jd_file_path LIKE $1 ORDER BY id DESC LIMIT 1`;
        const selectResult = await query(selectQuery, [`%${filename}%`]);

        let s3Key = null;
        let isLocal = false;
        let localPath = null;

        if (selectResult.rows && selectResult.rows.length > 0 && selectResult.rows[0].jd_file_path) {
            const filePath = selectResult.rows[0].jd_file_path;
            if (filePath.includes('amazonaws.com')) {
                const urlParts = filePath.split('.com/');
                if (urlParts.length > 1) {
                    s3Key = decodeURIComponent(urlParts[1]);
                }
            } else {
                isLocal = true;
                localPath = filePath;
            }
        }

        // Fallbacks for legacy/local paths
        if (!s3Key && !isLocal) {
            s3Key = `pmc/jd/${filename}`;
        }

        if (s3Key) {
            try {
                const s3StreamResult = await getS3ObjectStream(s3Key);
                if (s3StreamResult) {
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
                    s3StreamResult.Body.pipe(res);
                    return;
                }
            } catch (s3Err) {
                // If first folder failed, try fallback EPC
                try {
                    const altS3Key = `epc/jd/${filename}`;
                    const s3StreamResultAlt = await getS3ObjectStream(altS3Key);
                    if (s3StreamResultAlt) {
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
                        s3StreamResultAlt.Body.pipe(res);
                        return;
                    }
                } catch (s3AltErr) {
                    console.error('S3 stream error for JD keys:', s3Err, s3AltErr);
                }
            }
        }

        // Fallback to local file if S3 download fails or path is local
        const resolvedFilename = localPath ? path.basename(localPath) : filename;
        const localPathsToTry = [
            path.join(process.cwd(), 'uploads/careers/jds', resolvedFilename),
            path.join(process.cwd(), 'backend/uploads/careers/jds', resolvedFilename),
            path.join(process.cwd(), 'backend/src/uploads/careers/jds', resolvedFilename)
        ];

        for (const filePath of localPathsToTry) {
            if (fs.existsSync(filePath)) {
                return res.sendFile(filePath);
            }
        }

        return res.status(404).json({ ok: false, message: 'JD file not found' });
    } catch (error) {
        next(error);
    }
};

