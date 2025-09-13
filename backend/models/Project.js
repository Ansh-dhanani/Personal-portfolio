import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  badges: [{
    type: String
  }],
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  liveText: {
    type: String
  },
  githubText: {
    type: String
  }
});

export const Project = mongoose.model('Project', projectSchema);
