import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Experience } from './models/Experience.js';
import { Education } from './models/Education.js';
import { Skill } from './models/Skill.js';
import { Project } from './models/Project.js';
import { History } from './models/History.js';

dotenv.config();

const experiences = [
  {
    companyName: "Freelance / Personal Projects",
    position: "Frontend Developer & Graphics Designer",
    logo: "./Freelancer.jpg",
    startDate: "2023",
    endDate: "Present",
    description:
      "Design and develop responsive, high-performance web applications using React, Next.js, Vite, and Tailwind CSS. Specialize in crafting modern, user-focused interfaces with Shadcn UI and custom design systems. Delivered SaaS products, admin dashboards, and AI-driven tools for clients and personal use, focusing on scalability, accessibility, and smooth UX.",
  },
  {
    companyName: "Hackathon Projects",
    position: "Full Stack Developer",
    logo: "./Hackathon.jpg",
    startDate: "2023",
    endDate: "Present",
    description:
      "Built and deployed multiple award-winning hackathon projects by integrating AI/ML models into full-stack applications. Utilized Flask, TensorFlow.js, and REST APIs to create real-time, data-driven solutions. Experienced in rapid prototyping, agile teamwork, and delivering functional MVPs under tight deadlines.",
  }
];

const education = [
  {
    companyName: "Charotar University of Science and Technology",
    position: "B.Tech in Artificial Intelligence and Machine Learning",
    logo: "/charusatlogo.png",
    startDate: "2024",
    endDate: "2028",
    description:
      "Pursuing a comprehensive degree in AI & ML, covering deep learning, natural language processing, computer vision, and data science. Actively engaged in hackathons, collaborative research, and building industry-relevant projects that bridge academic learning with real-world applications. Committed to open-source contributions and AI-powered web development.",
  },
];

const skills = [
  { tech: "React" },
  { tech: "Next.js" },
  { tech: "Tailwind CSS" },
  { tech: "Shadcn UI" },
  { tech: "Vite" },
  { tech: "JavaScript" },
  { tech: "Python" },
  { tech: "TensorFlow.js" },
  { tech: "Flask" },
  { tech: "C++" },
  { tech: "Git & GitHub" },
  { tech: "Figma" },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      History.deleteMany({})
    ]);

    // Insert new data
    const projects = [
      {
        title: "Reactbits - Contribution",
        description: "I made contributions to Reactbits, a well-known open-source React component library (24k stars). I developed a \"Gradual Blur\" component that creates a smooth blur effect at the top of the page or any element, enhancing visual appeal and user experience. Among top 8 contributors on GitHub.",
        video: "./gradualblur1 (2).mp4",
        date: "2024-07-01",
        badges: ["React", "AI/ML", "Netlify", "Healthcare"],
        liveUrl: "https://reactbits.dev/animations/gradual-blur",
        githubUrl: "https://github.com/DavidHDev/react-bits/pull/425",
        liveText: "Live Demo",
        githubText: "GitHub"
      },
      {
        title: "Scanix AI - Brain Tumor Detection",
        description: "An AI-powered healthcare tool for brain tumor detection. Built in React, this web app leverages advanced ML models to analyze medical images and provide fast, accurate predictions. Awarded in Tech-Tonic Hackathon.",
        video: "./scanix.mp4",
        date: "2024-07-01",
        badges: ["React", "AI/ML", "Netlify", "Healthcare"],
        liveUrl: "https://scanix-ai.netlify.app",
        githubUrl: "https://github.com/Ansh-dhanani/Scanix_AI",
        liveText: "Live Demo",
        githubText: "GitHub"
      },
      {
        title: "NPM package - Gradual blur",
        description: "I made a NPM gradual blur package as an animation effect with support for React, Svelte, Sve and with and without typescript in react.",
        video: "./package.mp4",
        date: "2024-07-01",
        badges: ["React", "AI/ML", "Netlify", "Healthcare"],
        liveUrl: "https://reactbits.dev/animations/gradual-blur",
        githubUrl: "https://github.com/DavidHDev/react-bits/pull/425",
        liveText: "Live Demo",
        githubText: "GitHub"
      }
    ];

const history = [
  {
    id: 1,
    logo: "https://picsum.photos/150/150?random=8",
    date: "12-July-2024",
    title: "Tech-Tonic Hackathon — Scanix AI",
    place: "Remote / Online",
    info: "Built Scanix AI, an AI-powered brain tumor detection tool. Awarded for innovation in healthcare tech.",
    githubUrl: "https://github.com/Ansh-dhanani/Scanix_AI",
    siteUrl: "https://scanix-ai.netlify.app"
  },
  {
    id: 2,
    logo: "https://picsum.photos/150/150?random=9",
    date: "15-March-2024",
    title: "Oodo Hackathon — CheckWise AI",
    place: "Remote / Online",
    info: "Developed CheckWise AI, an automated CBC report diagnosis system using modern AI/ML models.",
    githubUrl: "https://github.com/Ansh-dhanani/CheckwiseAI",
    siteUrl: "https://check-wise.netlify.app/"
  },
  {
    id: 3,
    logo: "https://picsum.photos/150/150?random=7",
    date: "April-2024",
    title: "Open Source — React Template Library",
    place: "GitHub",
    info: "Published and maintained a React template library providing free premium templates and components.",
    githubUrl: "https://github.com/Ansh-dhanani/react_template"
  },
  {
    id: 4,
    logo: "https://picsum.photos/150/150?random=12",
    date: "May-2024",
    title: "Stock Prediction App Launched",
    place: "Personal Project",
    info: "Designed and launched a modern React-based stock tracking and visualization app.",
    siteUrl: "https://stockpredicti0n.netlify.app/"
  }
];

    // Insert new data
    console.log('Inserting new data...');
    await Promise.all([
      Experience.insertMany(experiences),
      Education.insertMany(education),
      Skill.insertMany(skills),
      Project.insertMany(projects),
      History.insertMany(history)
    ]);

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
