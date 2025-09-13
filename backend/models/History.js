import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['item', 'section'],
    default: 'item'
  },
  logo: {
    type: String
  },
  date: {
    type: String
  },
  title: {
    type: String
  },
  place: {
    type: String
  },
  info: {
    type: String
  },
  sectionDescription: {
    type: String
  },
  githubUrl: {
    type: String
  },
  siteUrl: {
    type: String
  }
});

export const History = mongoose.model('History', historySchema);
