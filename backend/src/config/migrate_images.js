import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const db = knex({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: process.env.DB_ADMIN_USER || process.env.WEBSITE_DB_USER,
    password: process.env.DB_ADMIN_PASSWORD || process.env.WEBSITE_DB_PASSWORD,
    database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
  },
});

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

if (!s3Client) {
  console.error("❌ AWS S3 Client could not be initialized. Check S3 credentials.");
  process.exit(1);
}

const PUBLIC_DIR = path.resolve(__dirname, '../../../frontend/public');

const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };
  return map[ext] || 'image/jpeg';
};

async function run() {
  try {
    console.log("Fetching projects from database...");
    const projects = await db('projects').select('*');
    console.log(`Found ${projects.length} projects.`);

    for (const project of projects) {
      console.log(`\nProcessing project: "${project.title}"`);
      
      let imageUrls = [];
      try {
        imageUrls = typeof project.images === 'string' ? JSON.parse(project.images) : (project.images || []);
      } catch (e) {
        console.error(`Failed to parse images for project ID ${project.id}:`, e);
        continue;
      }

      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        console.log("No images found for this project.");
        continue;
      }

      let updatedUrls = [];
      let updatedAny = false;

      for (const imgUrl of imageUrls) {
        // If it is already an S3 URL, keep it
        if (imgUrl.includes('amazonaws.com')) {
          console.log(`Image already on S3: ${imgUrl}`);
          updatedUrls.push(imgUrl);
          continue;
        }
        
        // If it is any other external URL, keep it
        if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://') || imgUrl.startsWith('//')) {
          console.log(`External image URL: ${imgUrl}`);
          updatedUrls.push(imgUrl);
          continue;
        }

        // Clean path to map to file system (remove leading slashes, decode URL encoding)
        const relativePath = decodeURIComponent(imgUrl.startsWith('/') ? imgUrl.substring(1) : imgUrl);
        const localFilePath = path.join(PUBLIC_DIR, relativePath);

        if (!fs.existsSync(localFilePath)) {
          console.warn(`⚠️ Local file not found: ${localFilePath}`);
          updatedUrls.push(imgUrl); // Keep fallback if not found
          continue;
        }

        const filename = path.basename(localFilePath);
        // Directory structure: projects/[project title]/[filename]
        const s3Key = `projects/${project.title}/${filename}`;

        console.log(`Uploading local image to S3: ${s3Key}`);
        const fileStream = fs.createReadStream(localFilePath);
        const mimeType = getMimeType(localFilePath);

        const uploadParams = {
          Bucket: bucketName,
          Key: s3Key,
          Body: fileStream,
          ContentType: mimeType,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURI(s3Key)}`;
        console.log(`Uploaded successfully! URL: ${publicUrl}`);
        
        updatedUrls.push(publicUrl);
        updatedAny = true;
      }

      if (updatedAny) {
        console.log(`Updating database record for project "${project.title}"...`);
        await db('projects')
          .where({ id: project.id })
          .update({
            images: JSON.stringify(updatedUrls),
            updated_at: db.fn.now()
          });
        console.log("Database updated successfully.");
      }
    }

    console.log("\nImage migration to S3 completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
