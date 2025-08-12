import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ModeToggle } from "@/components/ui/Mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "./components/ui/ProjectCard";
import History from "./components/ui/History";
import ExperienceUI from "@/components/ui/ExperienceUI";
import GradualBlurEffect from "./components/ui/Gradualblur";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";
import LeetCodeIcon from "./components/ui/LeetCodeIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import "./App.css";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isChevronAnimating, setIsChevronAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlertType("success");
        setAlertMessage("Message sent successfully!");
        setDialogOpen(false);
        setShowAlert(true);
        e.target.reset();
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setAlertType("error");
        setAlertMessage("Failed to send message. Please try again.");
        setDialogOpen(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(`Error: ${error.message}`);
      setDialogOpen(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
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
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

 const [experiences] = useState([
  {
    companyName: "Freelance / Personal Projects",
    position: "Frontend Developer & Designer",
    logo: "https://picsum.photos/150/150?random=1",
    startDate: "2023",
    endDate: "Present",
    description:
      "Design and develop responsive, high-performance web applications using React, Next.js, Vite, and Tailwind CSS. Specialize in crafting modern, user-focused interfaces with Shadcn UI and custom design systems. Delivered SaaS products, admin dashboards, and AI-driven tools for clients and personal use, focusing on scalability, accessibility, and smooth UX.",
  },
  {
    companyName: "Hackathon Projects",
    position: "Full Stack Developer",
    logo: "https://picsum.photos/150/150?random=2",
    startDate: "2023",
    endDate: "Present",
    description:
      "Built and deployed multiple award-winning hackathon projects by integrating AI/ML models into full-stack applications. Utilized Flask, TensorFlow.js, and REST APIs to create real-time, data-driven solutions. Experienced in rapid prototyping, agile teamwork, and delivering functional MVPs under tight deadlines.",
  },
]);

const [educations] = useState([
  {
    companyName: "Charotar University of Science and Technology",
    position: "B.Tech in Artificial Intelligence and Machine Learning",
    logo: "/charusatlogo.png",
    startDate: "2024",
    endDate: "2028",
    description:
      "Pursuing a comprehensive degree in AI & ML, covering deep learning, natural language processing, computer vision, and data science. Actively engaged in hackathons, collaborative research, and building industry-relevant projects that bridge academic learning with real-world applications. Committed to open-source contributions and AI-powered web development.",
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
  { tech: "Figma" },
]);

const [projectsData] = useState([
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack, responsive e-commerce platform featuring authentication, cart management, secure Stripe payments, and an admin dashboard for managing products and orders. Built with React, Node.js, and MongoDB for speed, scalability, and modern UI/UX.",
    video: "/v1.mp4",
    date: "2024-01-15",
    badges: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/Ansh-dhanani",
    liveText: "Website",
    githubText: "GitHub",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A real-time collaborative task manager with drag-and-drop features, Firebase backend, live updates, and socket-based notifications. Supports role-based permissions and responsive design for team productivity.",
    video: "/v1.mp4",
    date: "2024-02-20",
    badges: ["React", "Firebase", "Tailwind", "Socket.io"],
    liveUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/Ansh-dhanani",
    liveText: "Website",
    githubText: "GitHub",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A dynamic weather dashboard using Weather API and Chart.js to display real-time forecasts, temperature trends, and location-based updates. Includes animated components and responsive charts for a smooth user experience.",
    video: "/v1.mp4",
    date: "2024-03-10",
    badges: ["React", "Weather API", "Chart.js", "CSS3"],
    liveUrl: "https://weather-dashboard-demo.com",
    githubUrl: "https://github.com/Ansh-dhanani",
    liveText: "Website",
    githubText: "GitHub",
  },
]);

const [historyData] = useState([
  {
    id: 1,
    logo: "https://picsum.photos/150/150?random=5",
    date: "12-July-2024",
    title: "Hack Western",
    place: "London, Ontario",
    info: "Developed an AR-based bedtime storytelling app for children, featuring interactive animations, voice integration, and personalized content generation for immersive learning.",
    githubUrl: "https://github.com/Ansh-dhanani",
    siteUrl: "https://hackwestern-demo.com",
  },
  {
    id: 2,
    logo: "https://picsum.photos/150/150?random=6",
    date: "15-March-2024",
    title: "Tech Conference Speaker",
    place: "San Francisco, CA",
    info: "Delivered a keynote on AI-powered frontend development, showcasing how ML models can be seamlessly integrated into modern web applications for smarter user experiences.",
    siteUrl: "https://techconf2024.com",
  },
  {
    id: 3,
    logo: "https://picsum.photos/150/150?random=7",
    date: "08-November-2023",
    title: "Open Source Contribution",
    place: "Remote",
    info: "Contributed reusable UI components and performance improvements to a React library with 10k+ GitHub stars, improving accessibility and developer experience.",
    githubUrl: "https://github.com/Ansh-dhanani",
  },
]);



  return (
    <>
      <GradualBlurEffect />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100000] bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-3">
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                GitHub
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://x.com/AnshDhanan64704" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                Twitter
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                LinkedIn
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:contact@example.com">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                Email
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://leetcode.com/u/ansh_dhanani/" target="_blank" rel="noopener noreferrer">
                <LeetCodeIcon className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                LeetCode
              </Badge>
            </div>
          </div>
          <div className="w-px h-6 bg-foreground/20 mx-1"></div>
          <div className="relative group">
            <ModeToggle />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                Theme
              </Badge>
            </div>
          </div>
        </div>
        {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96">
            <Alert
              variant={alertType === "success" ? "default" : "destructive"}
              className={
                alertType === "success"
                  ? "border-green-400 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 dark:border-green-400"
                  : "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
              }
            >
              {alertType === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {alertType === "success" ? "Success!" : "Error!"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}
        
        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {selectedProject.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <video 
                    src={selectedProject.video} 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full rounded-lg"
                  />
                  <p className="text-sm leading-relaxed">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">{badge}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {selectedProject.liveUrl && (
                      <Button asChild>
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button variant="outline" asChild>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        <div className="bg-background flex flex-col items-center justify-center p-5 pt-10 md:pt-20 ">

          <div className="main max-w-2xl w-full flex flex-col gap-10">
            <div className="hero flex flex-row sm:flex-row gap-4 sm:text-left">
              <div className="title">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter whitespace-normal break-words">
                  Hello! I'm Ansh 👋
                </h1>
                <p className="text-[1.2rem] tracking-tighter sm:tracking-normal text-stone-600 dark:text-stone-400">
                  A passionate frontend developer and AI enthusiast, blending
                  design with technology to create impactful, user-focused
                  digital experiences.
                </p>
              </div>
              <div className="relative min-w-20 max-w-[100px] max-[458px]:hidden sm:max-w-[300px] ">
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
                I’m currently pursuing my B.Tech in Artificial Intelligence and
                Machine Learning at CHARUSAT University. I specialize in
                frontend development, UI/UX design, and integrating AI into web
                applications. I’ve participated in multiple hackathons, built
                real-world SaaS projects, and collaborated with teams to create
                solutions that are both functional and visually appealing.
              </p>
            </div>

            <div className="work experience">
              <h1 className="font-bold text-[1.2rem]">Work Experience</h1>
              <div className="flex flex-col gap-5 pt-3">
                {isLoading
                  ? Array(2)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                          <div className="flex-1 space-y-1">
                            <Skeleton className="h-[17px] w-[280px]" />
                            <Skeleton className="h-[13px] w-[200px]" />
                            <Skeleton className="h-3 w-[120px]" />
                          </div>
                        </div>
                      ))
                  : experiences.map((exp, index) => (
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
                {isLoading
                  ? Array(2)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                          <div className="flex-1 space-y-1">
                            <Skeleton className="h-[17px] w-[320px]" />
                            <Skeleton className="h-[13px] w-[240px]" />
                            <Skeleton className="h-3 w-[140px]" />
                          </div>
                        </div>
                      ))
                  : educations.map((exp, index) => (
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
                {isLoading
                  ? Array(12)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-[22px] w-[60px] rounded-full"
                        />
                      ))
                  : Skills.map((data, index) => (
                      <Badge
                        key={index}
                        size="sm"
                        shape="pill"

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
                  From AI-powered applications to modern UI projects, here are
                  some of the works I’ve built recently.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="rounded-2xl overflow-hidden w-full h-full flex flex-col border-2"
                        >
                          <Skeleton className="h-[180px] w-full" />
                          <div className="p-[7px] flex flex-col space-y-2">
                            <Skeleton className="h-[18px] w-[200px]" />
                            <Skeleton className="h-[14px] w-[100px]" />
                            <div className="space-y-1">
                              <Skeleton className="h-3 w-full" />
                              <Skeleton className="h-3 w-[90%]" />
                              <Skeleton className="h-3 w-[80%]" />
                            </div>
                            <div className="flex gap-1 pt-2">
                              <Skeleton className="h-[18px] w-[50px] rounded" />
                              <Skeleton className="h-[18px] w-[60px] rounded" />
                              <Skeleton className="h-[18px] w-[55px] rounded" />
                            </div>
                            <div className="flex gap-1 pt-1">
                              <Skeleton className="h-[24px] w-[70px] rounded" />
                              <Skeleton className="h-[24px] w-[60px] rounded" />
                            </div>
                          </div>
                        </div>
                      ))
                  : projectsData.map((project) => (
                      <div key={project.id} onClick={() => { if (window.innerWidth >= 768) { setSelectedProject(project); setProjectDialogOpen(true); } }} className="md:cursor-pointer">
                        <ProjectCard project={project} />
                      </div>
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
                  I actively participate in hackathons and collaborative tech
                  events, creating innovative projects in just 2–3 days with
                  passionate teams.
                </p>
              </div>
              <div>
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="relative flex flex-row gap-4 ml-14 p-2 pl-5 pt-4 border-l-2"
                        >
                          <div className="absolute -left-6 top-2 flex items-center w-12 h-12">
                            <Skeleton className="w-full h-full rounded-full" />
                          </div>
                          <div className="flex-grow ml-5 space-y-2">
                            <Skeleton className="h-[14px] w-[100px]" />
                            <Skeleton className="h-[15px] w-[180px]" />
                            <Skeleton className="h-[14px] w-[120px]" />
                            <div className="space-y-1 pt-1">
                              <Skeleton className="h-[14px] w-full" />
                              <Skeleton className="h-[14px] w-[85%]" />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Skeleton className="h-[24px] w-[60px] rounded" />
                              <Skeleton className="h-[24px] w-[50px] rounded" />
                            </div>
                          </div>
                        </div>
                      ))
                  : historyData.map((item) => (
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
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setIsChevronAnimating(false)}>
                      {isChevronAnimating && (
                        <div className="animate-bounce">
                          <ChevronDown className="h-6 w-6" />
                        </div>
                      )}
                      <Button>Contact</Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Get in Touch</DialogTitle>
                      <DialogDescription>
                        Send me a message and I'll get back to you as soon as
                        possible.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell me about your project or idea..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <h1 className="text-5xl font-bold pt-1">Get in Touch</h1>
                <p className="pt-2 text-2xl text-stone-600 dark:text-stone-400 tracking-tight">
                  Want to collaborate or discuss a project? Reach out via
                  Twitter DM or GitHub, and I’ll respond as soon as I can.
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
