import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Support both S3_* and AWS_* environment variables for compatibility
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION || process.env.S3_REGION || 'ap-south-1';
const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET;

const s3Client = (accessKeyId && secretAccessKey && bucketName)
    ? new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        }
    })
    : null;

if (s3Client) {
    console.log(`☁️ AWS S3 Client initialized. Bucket: ${bucketName}, Region: ${region}`);
} else {
    console.log('📂 AWS S3 credentials missing. Falling back to local file storage.');
}

/**
 * Downloads a file stream from S3.
 */
export const getS3ObjectStream = async (key) => {
    if (!s3Client) return null;
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key
    });
    return await s3Client.send(command);
};

/**
 * Uploads a file to S3 under careers/resume or careers/jds prefix if configured, 
 * or falls back to returning the local path for static serving.
 */
export const uploadFileToS3 = async (file, folder = 'careers/resume') => {
    const isJD = folder.includes('jds');
    const isBlog = folder.includes('blogs');
    const fileLabel = isJD ? 'JD' : (isBlog ? 'blog image' : 'resume');

    if (!s3Client) {
        // Fallback to local storage: Multer has already saved the file in the local resumes or jds folder.
        // We just return the relative path that the static files middleware serves.
        const filename = path.basename(file.path);
        const relativePath = isJD 
            ? `uploads/careers/jds/${filename}`
            : (isBlog ? `uploads/blogs/${filename}` : `uploads/resumes/${filename}`);
            
        return relativePath;
    }

    try {
        const fileStream = fs.createReadStream(file.path);
        const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        
        const uploadParams = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileStream,
            ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        // Clean up the local temp staging file
        try {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        } catch (unlinkErr) {
            console.error('Failed to delete local temp file:', unlinkErr);
        }

        // Return public S3 access URL
        return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    } catch (err) {
        console.error(`S3 Upload failed, falling back to local file path for ${fileLabel}:`, err);
        // On S3 upload error, fall back to keeping the file locally rather than failing the request
        const filename = path.basename(file.path);
        return isJD 
            ? `uploads/careers/jds/${filename}`
            : `uploads/resumes/${filename}`;
    }
};

/**
 * Deletes a file from either S3 or the local uploads directory.
 */
export const deleteFileFromS3 = async (fileUrlOrPath) => {
    if (!fileUrlOrPath) return;

    if (fileUrlOrPath.includes('amazonaws.com') && s3Client) {
        try {
            const urlParts = fileUrlOrPath.split('.com/');
            if (urlParts.length > 1) {
                const key = decodeURIComponent(urlParts[1]);
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: key
                }));
            }
        } catch (err) {
            console.error('Failed to delete S3 file:', err);
        }
    } else {
        // Local file deletion logic
        const filename = path.basename(fileUrlOrPath);
        
        // Resolve paths relative to different possible running locations for resumes and jds
        const pathsToTry = [
            path.join(process.cwd(), 'uploads/resumes', filename),
            path.join(process.cwd(), 'backend/uploads/resumes', filename),
            path.join(process.cwd(), 'backend/src/uploads/resumes', filename),
            path.join(process.cwd(), 'uploads/careers/jds', filename),
            path.join(process.cwd(), 'backend/uploads/careers/jds', filename),
            path.join(process.cwd(), 'backend/src/uploads/careers/jds', filename)
        ];
        
        for (const filePath of pathsToTry) {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`📂 Deleted local file: ${filePath}`);
                    break;
                }
            } catch (err) {
                console.error(`Failed to delete local file at ${filePath}:`, err);
            }
        }
    }
};

/**
 * Moves/Renames a file in S3 or local directory to a new folder destination.
 */
export const moveFileOnS3 = async (fileUrlOrPath, newFolder) => {
    if (!fileUrlOrPath) return null;

    if (fileUrlOrPath.includes('amazonaws.com') && s3Client) {
        try {
            const urlParts = fileUrlOrPath.split('.com/');
            if (urlParts.length > 1) {
                const oldKey = decodeURIComponent(urlParts[1]);
                
                // Construct new key keeping the same filename
                const filename = path.basename(oldKey);
                const newKey = `${newFolder}/${filename}`;
                
                if (oldKey === newKey) {
                    return fileUrlOrPath; // Nothing to move
                }

                // Copy object to new location
                await s3Client.send(new CopyObjectCommand({
                    Bucket: bucketName,
                    CopySource: `${bucketName}/${oldKey}`,
                    Key: newKey
                }));

                // Delete old object
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: oldKey
                }));

                // Return new public URL
                return `https://${bucketName}.s3.${region}.amazonaws.com/${newKey}`;
            }
        } catch (err) {
            console.error('Failed to move S3 file:', err);
            return fileUrlOrPath; // Return existing on error
        }
    }
    return fileUrlOrPath;
};
