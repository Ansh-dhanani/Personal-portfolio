import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ModeToggle } from "@/components/ui/Mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import "./App.css";
import ProjectCard from "./components/ui/ProjectCard";
import History from "./components/ui/History";
import ExperienceUI from "@/components/ui/ExperienceUI";
import GradualBlurEffect from "./components/ui/Gradualblur";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Github, Twitter, Linkedin, Mail } from "lucide-react";
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

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
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
        "Designing and developing modern, responsive, and interactive websites using React, Vite, Tailwind CSS, and Shadcn UI. Experienced in building scalable UI components and integrating APIs for real-world applications.",
    },
    {
      companyName: "Hackathon Projects",
      position: "Full Stack Developer",
      logo: "https://picsum.photos/150/150?random=2",
      startDate: "2023",
      endDate: "Present",
      description:
        "Built AI-powered and data-driven projects for hackathons, including web apps using Flask, TensorFlow.js, and React, focusing on problem-solving and user experience.",
    },
  ]);

  const [educations] = useState([
    {
      companyName: "Charotar University of Science and Technology",
      position: "B.Tech in Artificial Intelligence and Machine Learning",
      logo: "https://picsum.photos/150/150?random=3",
      startDate: "2023",
      endDate: "2027 (Expected)",
      description:
        "Pursuing a strong foundation in AI, ML, and software engineering. Actively engaged in hackathons, research, and building portfolio projects to bridge the gap between academic knowledge and industry applications.",
    },
    {
      companyName: "Higher Secondary Education",
      position: "Science (PCM + Computer Science)",
      logo: "https://picsum.photos/150/150?random=4",
      startDate: "2021",
      endDate: "2023",
      description:
        "Focused on Physics, Chemistry, Mathematics, and Computer Science, building problem-solving skills and logical thinking essential for programming and AI.",
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
      logo: "https://picsum.photos/150/150?random=5",
      date: "12-July-2024",
      title: "Hack Western",
      place: "London, Ontario",
      info: "Built an AR-based bedtime storytelling app for kids, integrating interactive animations and voice features for immersive learning.",
      githubUrl: "https://github.com/username/hackwestern-project",
      siteUrl: "https://hackwestern-demo.com",
    },
    {
      id: 2,
      logo: "https://picsum.photos/150/150?random=6",
      date: "15-March-2024",
      title: "Tech Conference Speaker",
      place: "San Francisco, CA",
      info: "Delivered a talk on the future of AI-powered frontend development, sharing insights on integrating ML models with web applications.",
      siteUrl: "https://techconf2024.com",
    },
    {
      id: 3,
      logo: "https://picsum.photos/150/150?random=7",
      date: "08-November-2023",
      title: "Open Source Contribution",
      place: "Remote",
      info: "Contributed reusable UI components and performance optimizations to a React library with 10k+ GitHub stars.",
      githubUrl: "https://github.com/username/react-components",
    },
  ]);

  return (
    <>
      <GradualBlurEffect />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100000] bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:contact@example.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <div className="w-px h-6 bg-foreground/20 mx-1"></div>
          <ModeToggle />
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
                  <DialogTrigger onClick={() => setIsChevronAnimating(false)}>
                    <div className="flex flex-col items-center gap-2">
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
