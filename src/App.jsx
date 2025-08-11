import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "./App.css";
import ProjectCard from "./components/ui/ProjectCard";
import History from "./components/ui/History";
import ExperienceUI from "@/components/ui/experienceUI";
import GradualBlurEffect from "./components/ui/Gradualblur";

function App() {
  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        const lenis = new Lenis();

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
      } catch (error) {
        console.log("Lenis not available");
      }
    };

    initLenis();
  }, []);

  const [experiences] = useState([
    {
      companyName: "Freelance / Personal Projects",
      position: "Frontend Developer & Designer",
      logo: "/Ansh.jpg",
      startDate: "2023",
      endDate: "Present",
      description:
        "Designing and developing modern, responsive, and interactive websites using React, Vite, Tailwind CSS, and Shadcn UI. Experienced in building scalable UI components and integrating APIs for real-world applications."
    },
    {
      companyName: "Hackathon Projects",
      position: "Full Stack Developer",
      logo: "/Ansh.jpg",
      startDate: "2023",
      endDate: "Present",
      description:
        "Built AI-powered and data-driven projects for hackathons, including web apps using Flask, TensorFlow.js, and React, focusing on problem-solving and user experience."
    },
  ]);

  const [educations] = useState([
    {
      companyName: "Charotar University of Science and Technology",
      position: "B.Tech in Artificial Intelligence and Machine Learning",
      logo: "/Ansh.jpg",
      startDate: "2023",
      endDate: "2027 (Expected)",
      description:
        "Pursuing a strong foundation in AI, ML, and software engineering. Actively engaged in hackathons, research, and building portfolio projects to bridge the gap between academic knowledge and industry applications."
    },
    {
      companyName: "Higher Secondary Education",
      position: "Science (PCM + Computer Science)",
      logo: "/Ansh.jpg",
      startDate: "2021",
      endDate: "2023",
      description:
        "Focused on Physics, Chemistry, Mathematics, and Computer Science, building problem-solving skills and logical thinking essential for programming and AI."
    },
  ]);

  const [Skills] = useState([
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
    { tech: "Figma" }
  ]);

  const [projectsData] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A responsive and full-stack e-commerce platform built using React and Node.js, featuring authentication, cart management, secure payments, and an admin dashboard for product and order control.",
      video: "/v1.mp4",
      date: "2024-01-15",
      badges: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A real-time collaborative task manager with drag-and-drop features, Firebase integration, and live updates to enhance productivity for teams.",
      video: "/v1.mp4",
      date: "2024-02-20",
      badges: ["React", "Firebase", "Tailwind", "Socket.io"],
      liveUrl: "https://task-manager-demo.com",
      githubUrl: "https://github.com/username/task-manager",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A modern weather dashboard using Weather API and Chart.js, with real-time forecasts, location detection, and smooth animations.",
      video: "/v1.mp4",
      date: "2024-03-10",
      badges: ["React", "Weather API", "Chart.js", "CSS3"],
      liveUrl: "https://weather-dashboard-demo.com",
      githubUrl: "https://github.com/username/weather-dashboard",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
  ]);

  const [historyData] = useState([
    {
      id: 1,
      logo: "/Ansh.jpg",
      date: "12-July-2024",
      title: "Hack Western",
      place: "London, Ontario",
      info: "Built an AR-based bedtime storytelling app for kids, integrating interactive animations and voice features for immersive learning.",
      githubUrl: "https://github.com/username/hackwestern-project",
      siteUrl: "https://hackwestern-demo.com"
    },
    {
      id: 2,
      logo: "/Ansh.jpg",
      date: "15-March-2024",
      title: "Tech Conference Speaker",
      place: "San Francisco, CA",
      info: "Delivered a talk on the future of AI-powered frontend development, sharing insights on integrating ML models with web applications.",
      siteUrl: "https://techconf2024.com"
    },
    {
      id: 3,
      logo: "/Ansh.jpg",
      date: "08-November-2023",
      title: "Open Source Contribution",
      place: "Remote",
      info: "Contributed reusable UI components and performance optimizations to a React library with 10k+ GitHub stars.",
      githubUrl: "https://github.com/username/react-components"
    }
  ]);

  return (
    <>
      <GradualBlurEffect />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background flex flex-col items-center justify-center p-5 pt-10 md:pt-20 ">
          <div className="fixed left-20 top-10">
            <ModeToggle />
          </div>
          <div className="main max-w-2xl w-full flex flex-col gap-10">
            <div className="hero flex flex-row sm:flex-row gap-4 sm:text-left">
              <div className="title">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter whitespace-normal break-words">
                  Hello! I'm Ansh 👋
                </h1>
                <p className="text-[1.2rem] tracking-tighter sm:tracking-normal text-stone-600 dark:text-stone-400">
                  A passionate frontend developer and AI enthusiast, blending design with technology to create impactful, user-focused digital experiences.
                </p>
              </div>
              <div className="min-w-20 max-w-[100px] max-[458px]:hidden sm:max-w-[300px] ">
                <img
                  src="/Ansh.jpg"
                  alt="Profile picture of Ansh"
                  className="rounded-full aspect-square w-full object-cover"
                />
              </div>
            </div>

            <div className="About">
              <h1 className="font-bold text-[1.2rem]">About</h1>
              <p className="text-stone-600 dark:text-stone-400 text-[1rem]">
                I’m currently pursuing my B.Tech in Artificial Intelligence and Machine Learning at CHARUSAT University. I specialize in frontend development, UI/UX design, and integrating AI into web applications.  
                I’ve participated in multiple hackathons, built real-world SaaS projects, and collaborated with teams to create solutions that are both functional and visually appealing.
              </p>
            </div>

            <div className="work experience">
              <h1 className="font-bold text-[1.2rem]">Work Experience</h1>
              <div className="flex flex-col gap-5 pt-3">
                {experiences.map((exp, index) => (
                  <ExperienceUI
                    key={index}
                    companyName={exp.companyName}
                    position={exp.position}
                    logo={exp.logo}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    description={exp.description}
                  />
                ))}
              </div>
            </div>

            <div className="Education">
              <h1 className="font-bold text-[1.2rem]">Education</h1>
              <div className="flex flex-col pt-3 gap-5">
                {educations.map((exp, index) => (
                  <ExperienceUI
                    key={index}
                    companyName={exp.companyName}
                    position={exp.position}
                    logo={exp.logo}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    description={exp.description}
                  />
                ))}
              </div>
            </div>

            <div className="Skills">
              <h1 className="font-bold text-[1.2rem] pb-5">Skills</h1>
              <div className="flex w-full gap-1 flex-wrap">
                {Skills.map((data, index) => (
                  <Badge
                    key={index}
                    size="sm"
                    shape="pill"
                    interactive={true}
                    className="cursor-pointer"
                  >
                    {data.tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="Projects pt-14">
              <div className="flex-col text-center justify-center pb-10">
                <Button>My Projects</Button>
                <h1 className="text-5xl font-bold pt-1">
                  Check out my latest work
                </h1>
                <p className="pt-2 text-2xl text-stone-600 dark:text-stone-400 tracking-tight">
                  From AI-powered applications to modern UI projects, here are some of the works I’ve built recently.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsData.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            <div className="History pt-14">
              <div className="flex-col text-center justify-center pb-10">
                <Button>History</Button>
                <h1 className="text-5xl font-bold pt-1">
                  I like building things
                </h1>
                <p className="pt-2 text-1xl text-stone-600 dark:text-stone-400 tracking-tight">
                  I actively participate in hackathons and collaborative tech events, creating innovative projects in just 2–3 days with passionate teams.
                </p>
              </div>
              <div>
                {historyData.map((item) => (
                  <History
                    key={item.id}
                    logo={item.logo}
                    date={item.date}
                    title={item.title}
                    place={item.place}
                    info={item.info}
                    githubUrl={item.githubUrl}
                    siteUrl={item.siteUrl}
                  />
                ))}
              </div>
            </div>

            <div className="Contact pt-14 pb-14">
              <div className="flex-col text-center justify-center pb-10">
                <Button>Contact</Button>
                <h1 className="text-5xl font-bold pt-1">
                  Get in Touch
                </h1>
                <p className="pt-2 text-2xl text-stone-600 dark:text-stone-400 tracking-tight">
                  Want to collaborate or discuss a project? Reach out via Twitter DM or GitHub, and I’ll respond as soon as I can.
                </p>
              </div>
            </div>

          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
