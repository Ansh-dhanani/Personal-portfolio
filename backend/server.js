import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Experience } from './models/Experience.js';
import { Education } from './models/Education.js';
import { Skill } from './models/Skill.js';
import { Project } from './models/Project.js';
import { History } from './models/History.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['https://anshdhanani.is-a.dev', 'http://localhost:3000', 'http://localhost:5173', 'https://the-perfect-portfolio-zp8b.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Allow all IPs for MongoDB Atlas connection (for Vercel deployment)
mongoose.set('strictQuery', false);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find({ type: { $ne: 'section' } }).sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/history-section', async (req, res) => {
  try {
    const section = await History.findOne({ type: 'section' });
    res.json(section ? { description: section.sectionDescription } : { description: '' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // In production, you should validate against a database
    if (username === process.env.ADMIN_USERNAME && 
        await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected Admin Routes
// Projects
app.post('/api/admin/projects', authenticateToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    // Validate input data if needed here

    // Find the project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields explicitly to avoid overwriting unintended fields
    Object.keys(req.body).forEach(key => {
      project[key] = req.body[key];
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Experiences
app.post('/api/admin/experiences', authenticateToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/experiences/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    Object.keys(req.body).forEach(key => {
      experience[key] = req.body[key];
    });

    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/experiences/:id', authenticateToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Education
app.post('/api/admin/education', authenticateToken, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/education/:id', authenticateToken, async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    Object.keys(req.body).forEach(key => {
      education[key] = req.body[key];
    });

    await education.save();
    res.json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/education/:id', authenticateToken, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Skills
app.post('/api/admin/skills', authenticateToken, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    Object.keys(req.body).forEach(key => {
      skill[key] = req.body[key];
    });

    await skill.save();
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/skills/:id', authenticateToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// History
app.post('/api/admin/history', authenticateToken, async (req, res) => {
  try {
    const history = new History(req.body);
    await history.save();
    res.status(201).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/history/:id', authenticateToken, async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    Object.keys(req.body).forEach(key => {
      history[key] = req.body[key];
    });

    await history.save();
    res.json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/history/:id', authenticateToken, async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: 'History deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/admin/history-section', authenticateToken, async (req, res) => {
  try {
    let section = await History.findOne({ type: 'section' });
    if (!section) {
      section = new History({ id: 0, type: 'section', sectionDescription: req.body.description });
    } else {
      section.sectionDescription = req.body.description;
    }
    await section.save();
    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
