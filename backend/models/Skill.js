import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  tech: {
    type: String,
    required: true
  }
});

export const Skill = mongoose.model('Skill', skillSchema);
