import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExperiences = async () => {
  try {
    const response = await api.get('/experiences');
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
};

export const getEducation = async () => {
  try {
    const response = await api.get('/education');
    return response.data;
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
};

export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};
