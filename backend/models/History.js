import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String
  },
  siteUrl: {
    type: String
  }
});

export const History = mongoose.model('History', historySchema);
