import fs from 'fs';
import path from 'path';
import { ManoWebDB } from '../config/database.js';
import { uploadFileToS3, deleteFileFromS3, uploadJSONToS3, getS3ObjectStream } from '../services/uploadService.js';

// Helper to safely parse JSON strings
const safeParse = (data, fallback) => {
  try {
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const S3_BASE = 'https://mano-static-website.s3.us-east-1.amazonaws.com/';

const enc = (pathStr) => pathStr.split('/').map(p => encodeURIComponent(p)).join('/');

// Mapping fallback for legacy seed paths to exact valid 200 OK S3 object keys
const legacyPathMap = {
  'Hotel Moon Kinshasa/001 (3).webp': S3_BASE + enc('projects/Hotel Moon Palace - Kinshasa/001 (3).webp'),
  'Hotel Moon Kinshasa/002 (3).webp': S3_BASE + enc('projects/Hotel Moon Palace - Kinshasa/002 (3).webp'),
  'Hotel Moon Kinshasa/003 (3).webp': S3_BASE + enc('projects/Hotel Moon Palace - Kinshasa/003 (3).webp'),
  'Hotel Moon Kinshasa/006 (2).webp': S3_BASE + enc('projects/Hotel Moon Palace - Kinshasa/006 (2).webp'),
  'HD Picture TRIVENI Crown, Kalyan/MAIN GATE/1.option 01-crown gate 01.webp': S3_BASE + enc('projects/Triveni Crown/1.option 01-crown gate 01.webp'),
  'HD Picture TRIVENI Crown, Kalyan/MAIN GATE/5.option 02-crown gate 03.webp': S3_BASE + enc('projects/Triveni Crown/5.option 02-crown gate 03.webp'),
  'HD Picture TRIVENI Crown, Kalyan/MAIN GATE/6.option 02-crown gate 04.webp': S3_BASE + enc('projects/Triveni Crown/6.option 02-crown gate 04.webp'),
  'projects_img/Ananda Residency - Paradigm Ambit Buildcon..webp': S3_BASE + enc('projects/Ananda Residency - Paradigm Ambit Buildcon/Ananda Residency - Paradigm Ambit Buildcon..webp'),
  'Ananda residency/Aerial.webp': S3_BASE + enc('projects/Ananda Residency - Paradigm Ambit Buildcon/Aerial.webp'),
  'Ananda residency/podium.webp': S3_BASE + enc('projects/Ananda Residency - Paradigm Ambit Buildcon/podium.webp'),
  'Ananda residency/pool.webp': S3_BASE + enc('projects/Ananda Residency - Paradigm Ambit Buildcon/pool.webp'),
  'Ananda residency/terrace 2.webp': S3_BASE + enc('projects/Ananda Residency - Paradigm Ambit Buildcon/terrace 2.webp'),
  'projects_img/Westside – Tata Trent Ltd.(1).webp': S3_BASE + enc('projects/Westside – Tata Trent Ltd./Westside – Tata Trent Ltd.(1).webp'),
  'projects_img/Westside– Tata Trent Ltd..webp': S3_BASE + enc('projects/Westside – Tata Trent Ltd./Westside– Tata Trent Ltd..webp'),
  '30 Juin/Tranjio Hotel 03.webp': S3_BASE + enc('projects/30 Juin/Tranjio Hotel 03.webp'),
  '30 Juin/Tranjio Hotel 04.webp': S3_BASE + enc('projects/30 Juin/Tranjio Hotel 04.webp'),
  '30 Juin/Tranjio Hotel 06.webp': S3_BASE + enc('projects/30 Juin/Tranjio Hotel 06.webp'),
  'projects_img/Sati Darshan - Goyal Group..webp': S3_BASE + enc('projects/Sati Darshan - Goyal Group/Sati Darshan - Goyal Group..webp'),
  'projects_img/Celestia - Shree Ram Samarth..webp': S3_BASE + enc('projects/Celestia - Shree Ram Samarth/Celestia - Shree Ram Samarth..webp'),
  'projects_img/Shubharambh Residency - Veer Housing Projects LLP..webp': S3_BASE + enc('projects/Shubharambh Residency/Shubharambh Residency - Veer Housing Projects LLP..webp'),
  'Golf Apartment/Golf Appartment 1 .jpg.webp': S3_BASE + enc('projects/Golf Apartment/Golf Appartment 1 .jpg.webp'),
  'Golf Apartment/Golf Appartment 2 .jpg.webp': S3_BASE + enc('projects/Golf Apartment/Golf Appartment 2 .jpg.webp'),
  'HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (NEW view) in progress.webp': S3_BASE + enc('projects/Triveni Classics/Triveni CLASSIC (NEW view) in progress.webp'),
  'HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (Old view).webp': S3_BASE + enc('projects/Triveni Classics/Triveni CLASSIC (Old view).webp'),
  'projects_img/Zudio – Tata Trent Ltd.(3).webp': S3_BASE + enc('projects/Zudio / Tata Trent Projects/Zudio – Tata Trent Ltd.(3).webp'),
  'projects_img/Zudio – Tata Trent Ltd.(4).webp': S3_BASE + enc('projects/Zudio / Tata Trent Projects/Zudio – Tata Trent Ltd.(4).webp'),
  'NIDIMO - Kamala mill/2025-12-19 123025 1.webp': S3_BASE + enc('projects/NIDIMO - Kamala Mill/2025-12-19 123025 1.webp'),
  'NIDIMO - Kamala mill/2025-12-19 123143 3.webp': S3_BASE + enc('projects/NIDIMO - Kamala Mill/2025-12-19 123143 3.webp'),
  'NIDIMO - Kamala mill/2025-12-19 123201 2.webp': S3_BASE + enc('projects/NIDIMO - Kamala Mill/2025-12-19 123201 2.webp'),
  'NIDIMO - Kamala mill/2025-12-19 123244 4.webp': S3_BASE + enc('projects/NIDIMO - Kamala Mill/2025-12-19 123244 4.webp'),
  'projects_img/NSCI Dome – National Sports Club of India..webp': S3_BASE + enc('projects/NSCI Dome – Worli/NSCI Dome – National Sports Club of India..webp'),
  'NSCI/16.webp': S3_BASE + enc('projects/NSCI Dome – Worli/16.webp'),
  'NSCI/21.webp': S3_BASE + enc('projects/NSCI Dome – Worli/21.webp'),
  'NSCI/25.webp': S3_BASE + enc('projects/NSCI Dome – Worli/25.webp'),
  'projects_img/More Hyper Mart -Aher Constructions Pvt. Ltd..webp': S3_BASE + enc('projects/More Hyper Mart/More Hyper Mart -Aher Constructions Pvt. Ltd..webp'),
  'projects_img/Expeditors – Studio DNA .webp': S3_BASE + enc('projects/Expeditors – Studio DNA/Expeditors – Studio DNA .webp'),
  'projects_img/Expeditors – Studio DNA.webp': S3_BASE + enc('projects/Expeditors – Studio DNA/Expeditors – Studio DNA.webp'),
  'projects_img/Maharail – Studio DNA.webp': S3_BASE + enc('projects/Maharail – Studio DNA/Maharail – Studio DNA.webp'),
  'projects_img/Prima Plastics Limited..webp': S3_BASE + enc('projects/Prima Plastics Limited/Prima Plastics Limited..webp'),
  'projects_img/Textile Factory - Micro Interlinings Pvt. Ltd..webp': S3_BASE + enc('projects/Textile Factory/Textile Factory - Micro Interlinings Pvt. Ltd..webp'),
  'projects_img/Gaiwadi Industrial Estate - Amazon Warehouse..webp': S3_BASE + enc('projects/Gaiwadi Industrial Estate/Gaiwadi Industrial Estate - Amazon Warehouse..webp'),
  'projects_img/JNPC Infra Development– TUV Rheinland (India) Pvt Ltd..webp': S3_BASE + enc('projects/JNPC Infra Development/JNPC Infra Development– TUV Rheinland (India) Pvt Ltd..webp'),
  'projects_img/KAPCO Banquets & Catering Pvt. Ltd..webp': S3_BASE + enc('projects/KAPCO Banquets & Catering/KAPCO Banquets & Catering Pvt. Ltd..webp')
};

// Format a project record for API consumption
const formatProject = (project) => {
  if (!project) return null;
  
  const rawImages = typeof project.images === 'string'
    ? safeParse(project.images, [])
    : (project.images || []);

  const processedImages = rawImages.map(img => {
    if (!img) return img;

    const cleanImg = img.replace(/^\/+/, '');

    // 1. Check direct legacy path mapping
    if (legacyPathMap[cleanImg]) {
      return legacyPathMap[cleanImg];
    }

    // 2. Handle /api/projects/images?key=...
    if (img.includes('/api/projects/images?key=')) {
      const key = img.split('/api/projects/images?key=')[1];
      const decodedKey = decodeURIComponent(key).replace(/^\/+/, '');
      return S3_BASE + enc(decodedKey);
    }

    // 3. Handle S3 URLs — ensure proper URL component encoding
    if (img.includes('amazonaws.com')) {
      try {
        const urlObj = new URL(img);
        const parts = urlObj.pathname.split('/').map(p => encodeURIComponent(decodeURIComponent(p)));
        return `${urlObj.origin}${parts.join('/')}${urlObj.search}`;
      } catch (e) {
        return img;
      }
    }

    // 4. Fallback relative path starting with projects/
    if (cleanImg.startsWith('projects/')) {
      return S3_BASE + enc(cleanImg);
    }

    return img;
  });

  return {
    ...project,
    featured: Boolean(project.featured),
    images: processedImages,
    scope: project.scope || ''
  };
};


// Redirect directly to S3 URL for image requests, bypassing local proxy streaming and disk fallback
export const getProjectImage = async (req, res, next) => {
  try {
    const { key } = req.query;
    if (!key) {
      return res.status(400).json({ ok: false, message: 'Image key is required.' });
    }

    const decodedKey = decodeURIComponent(key).replace(/^\/+/, '');

    const bucketName = process.env.S3_BUCKET || process.env.AWS_S3_BUCKET_NAME || 'mano-static-website';
    const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
    
    // Construct the direct S3 URL
    const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${decodedKey}`;
    
    // Redirect client browser directly to the public S3 object URL
    return res.redirect(s3Url);
  } catch (error) {
    next(error);
  }
};


// Sync active projects to S3 bucket as a public JSON file
export const syncProjectsToS3 = async () => {
  try {
    const rawProjects = await ManoWebDB('projects')
      .where({ status: 'active' })
      .orderBy('display_order', 'asc')
      .orderBy('id', 'asc');
    const formatted = rawProjects.map(formatProject);
    const jsonString = JSON.stringify({ ok: true, data: formatted });
    const s3Url = await uploadJSONToS3('projects.json', jsonString);
    console.log(`🌐 Projects synchronized to S3 successfully. S3 URL: ${s3Url}`);
    return s3Url;
  } catch (error) {
    console.error('❌ Failed to sync projects to S3:', error);
    return null;
  }
};

// GET /api/projects — Public
export const getProjects = async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = ManoWebDB('projects').orderBy('display_order', 'asc').orderBy('id', 'asc');
    if (category && category !== 'All') {
      query = query.where({ category });
    }
    if (status) {
      query = query.where({ status });
    } else {
      // Public API: only show active projects
      query = query.where({ status: 'active' });
    }
    const rawProjects = await query;
    return res.status(200).json({ ok: true, data: rawProjects.map(formatProject) });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error fetching projects' });
  }
};

// GET /api/projects/admin — Admin: returns all (active + inactive)
export const getAllProjectsAdmin = async (req, res) => {
  try {
    const rawProjects = await ManoWebDB('projects').orderBy('display_order', 'asc').orderBy('id', 'asc');
    return res.status(200).json({ ok: true, data: rawProjects.map(formatProject) });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error fetching projects' });
  }
};

// GET /api/projects/:id — Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const rawProject = await ManoWebDB('projects').where({ id }).first();
    if (!rawProject) {
      return res.status(404).json({ ok: false, message: 'Project not found' });
    }
    return res.status(200).json({ ok: true, data: formatProject(rawProject) });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error fetching project' });
  }
};

// POST /api/projects — Admin only
export const createProject = async (req, res) => {
  try {
    const { title, location, category, scope, highlight, featured, status, display_order, existing_images } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ ok: false, message: 'Project title is required.' });
    }

    // Upload new image files
    let imageUrls = [];

    // Include any pre-existing image URLs passed from client
    if (existing_images) {
      const parsed = safeParse(existing_images, []);
      if (Array.isArray(parsed)) imageUrls = [...parsed];
    }

    // Upload newly added files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadFileToS3(file, `projects/${title.trim()}`);
        imageUrls.push(url);
      }
    }

    const newProject = {
      title: title.trim(),
      location: location ? location.trim() : '',
      category: category || 'Commercial',
      scope: scope ? scope.trim() : '',
      highlight: highlight ? highlight.trim() : '',
      images: JSON.stringify(imageUrls),
      featured: (featured === 'true' || featured === true || featured === 1) ? 1 : 0,
      status: status || 'active',
      display_order: display_order ? parseInt(display_order) : 0
    };

    const [insertedId] = await ManoWebDB('projects').insert(newProject);
    const createdProject = await ManoWebDB('projects').where({ id: insertedId }).first();
    await syncProjectsToS3().catch(err => console.error('S3 sync error:', err));
    return res.status(201).json({ ok: true, message: 'Project created successfully!', data: formatProject(createdProject) });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error creating project' });
  }
};

// PUT /api/projects/:id — Admin only
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, category, scope, highlight, featured, status, display_order, existing_images, remove_images } = req.body;

    const existingProject = await ManoWebDB('projects').where({ id }).first();
    if (!existingProject) {
      return res.status(404).json({ ok: false, message: 'Project not found' });
    }

    // Start with existing image list
    let currentImages = safeParse(existingProject.images, []);

    // Handle images marked for removal
    if (remove_images) {
      const toRemove = safeParse(remove_images, []);
      if (Array.isArray(toRemove) && toRemove.length > 0) {
        for (const imgUrl of toRemove) {
          // Only delete S3/uploaded images, not static public paths
          if (imgUrl && !imgUrl.startsWith('/') && (imgUrl.includes('amazonaws.com') || imgUrl.includes('uploads/projects') || imgUrl.includes('uploads/blogs') || imgUrl.includes('uploads/resumes'))) {
            await deleteFileFromS3(imgUrl);
          }
        }
        currentImages = currentImages.filter(img => !toRemove.includes(img));
      }
    }

    // Override with explicit existing_images list from client if provided
    if (existing_images !== undefined) {
      const parsed = safeParse(existing_images, null);
      if (Array.isArray(parsed)) {
        currentImages = parsed;
      }
    }

    // Upload newly added files
    if (req.files && req.files.length > 0) {
      const projectTitle = title !== undefined ? title.trim() : existingProject.title;
      for (const file of req.files) {
        const url = await uploadFileToS3(file, `projects/${projectTitle}`);
        currentImages.push(url);
      }
    }

    const updatedData = {
      title: title !== undefined ? title.trim() : existingProject.title,
      location: location !== undefined ? location.trim() : existingProject.location,
      category: category !== undefined ? category : existingProject.category,
      scope: scope !== undefined ? scope.trim() : existingProject.scope,
      highlight: highlight !== undefined ? highlight.trim() : existingProject.highlight,
      images: JSON.stringify(currentImages),
      featured: featured !== undefined
        ? ((featured === 'true' || featured === true || featured === 1) ? 1 : 0)
        : existingProject.featured,
      status: status !== undefined ? status : existingProject.status,
      display_order: display_order !== undefined ? parseInt(display_order) : existingProject.display_order,
      updated_at: ManoWebDB.fn.now()
    };

    await ManoWebDB('projects').where({ id }).update(updatedData);
    const updatedProject = await ManoWebDB('projects').where({ id }).first();
    await syncProjectsToS3().catch(err => console.error('S3 sync error:', err));
    return res.status(200).json({ ok: true, message: 'Project updated successfully!', data: formatProject(updatedProject) });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error updating project' });
  }
};

// DELETE /api/projects/:id — Admin only
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProject = await ManoWebDB('projects').where({ id }).first();
    if (!existingProject) {
      return res.status(404).json({ ok: false, message: 'Project not found' });
    }

    // Delete uploaded images (not static public paths)
    const images = safeParse(existingProject.images, []);
    for (const imgUrl of images) {
      if (imgUrl && !imgUrl.startsWith('/') && (imgUrl.includes('amazonaws.com') || imgUrl.includes('uploads/projects') || imgUrl.includes('uploads/blogs') || imgUrl.includes('uploads/resumes'))) {
        await deleteFileFromS3(imgUrl).catch(() => {});
      }
    }

    await ManoWebDB('projects').where({ id }).del();
    await syncProjectsToS3().catch(err => console.error('S3 sync error:', err));
    return res.status(200).json({ ok: true, message: 'Project deleted successfully!' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error deleting project' });
  }
};
