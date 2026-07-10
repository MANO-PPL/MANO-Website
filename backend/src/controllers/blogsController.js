import { ManoWebDB } from '../config/database.js';
import { uploadFileToS3, deleteFileFromS3 } from '../services/uploadService.js';

// Helper to safely parse JSON strings
const safeParse = (data, fallback) => {
  try {
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to format blog record for API consumption
const formatBlog = (blog) => {
  if (!blog) return null;
  return {
    ...blog,
    featured: Boolean(blog.featured),
    tags: typeof blog.tags === 'string' ? safeParse(blog.tags, []) : (blog.tags || []),
    content: typeof blog.content === 'string' ? safeParse(blog.content, { sections: [], keyTakeaways: [] }) : (blog.content || { sections: [], keyTakeaways: [] })
  };
};

export const getBlogs = async (req, res) => {
  try {
    const rawBlogs = await ManoWebDB('blogs').orderBy('id', 'desc');
    const blogs = rawBlogs.map(formatBlog);
    return res.status(200).json({ ok: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error fetching blogs' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const rawBlog = await ManoWebDB('blogs').where({ id }).first();
    if (!rawBlog) {
      return res.status(404).json({ ok: false, message: 'Blog post not found' });
    }
    return res.status(200).json({ ok: true, data: formatBlog(rawBlog) });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error fetching blog' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const {
      title, summary, author, author_role, date, read_time,
      category, image, featured, tags, content
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ ok: false, message: 'Title is required.' });
    }

    let image_url = image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop';
    if (req.file) {
      image_url = await uploadFileToS3(req.file, 'blogs/images');
    }

    let parsedTags = tags;
    if (typeof tags === 'string') {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    let parsedContent = content;
    if (typeof content === 'string') {
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {}
    }

    const newBlog = {
      title: title.trim(),
      summary: summary ? summary.trim() : '',
      author: author ? author.trim() : '',
      author_role: author_role || '',
      date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      read_time: read_time || '5 min read',
      category: category || 'General',
      image: image_url,
      featured: (featured === 'true' || featured === true || featured === 1 || featured === '1') ? 1 : 0,
      tags: JSON.stringify(parsedTags || []),
      content: JSON.stringify(parsedContent || { sections: [], keyTakeaways: [] })
    };

    const [insertedId] = await ManoWebDB('blogs').insert(newBlog);
    
    // Fetch inserted blog
    const createdBlog = await ManoWebDB('blogs').where({ id: insertedId }).first();
    return res.status(201).json({ ok: true, message: 'Blog post created successfully!', data: formatBlog(createdBlog) });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error creating blog' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, summary, author, author_role, date, read_time,
      category, image, featured, tags, content
    } = req.body;

    const existingBlog = await ManoWebDB('blogs').where({ id }).first();
    if (!existingBlog) {
      return res.status(404).json({ ok: false, message: 'Blog post not found' });
    }

    let image_url = image;
    if (req.file) {
      if (existingBlog.image && (existingBlog.image.includes('blogs/images') || existingBlog.image.includes('uploads/blogs'))) {
        await deleteFileFromS3(existingBlog.image);
      }
      image_url = await uploadFileToS3(req.file, 'blogs/images');
    }

    let parsedTags = tags;
    if (tags !== undefined && typeof tags === 'string') {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    let parsedContent = content;
    if (content !== undefined && typeof content === 'string') {
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {}
    }

    const updatedData = {
      title: title !== undefined ? title.trim() : existingBlog.title,
      summary: summary !== undefined ? summary.trim() : existingBlog.summary,
      author: author !== undefined ? author.trim() : existingBlog.author,
      author_role: author_role !== undefined ? author_role : existingBlog.author_role,
      date: date !== undefined ? date : existingBlog.date,
      read_time: read_time !== undefined ? read_time : existingBlog.read_time,
      category: category !== undefined ? category : existingBlog.category,
      image: image_url !== undefined ? image_url : existingBlog.image,
      featured: featured !== undefined ? ((featured === 'true' || featured === true || featured === 1 || featured === '1') ? 1 : 0) : existingBlog.featured,
      tags: parsedTags !== undefined ? JSON.stringify(parsedTags) : existingBlog.tags,
      content: parsedContent !== undefined ? JSON.stringify(parsedContent) : existingBlog.content,
      updated_at: ManoWebDB.fn.now()
    };

    await ManoWebDB('blogs').where({ id }).update(updatedData);

    const updatedBlog = await ManoWebDB('blogs').where({ id }).first();
    return res.status(200).json({ ok: true, message: 'Blog post updated successfully!', data: formatBlog(updatedBlog) });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error updating blog' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBlog = await ManoWebDB('blogs').where({ id }).first();
    if (!existingBlog) {
      return res.status(404).json({ ok: false, message: 'Blog post not found' });
    }

    await ManoWebDB('blogs').where({ id }).del();
    return res.status(200).json({ ok: true, message: 'Blog post deleted successfully!' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error deleting blog' });
  }
};
