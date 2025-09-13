import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const Experience = mongoose.model('Experience', experienceSchema);
