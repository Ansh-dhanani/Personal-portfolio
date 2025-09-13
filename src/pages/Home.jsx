import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { getExperiences, getEducation, getSkills, getProjects, getHistory } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExperienceUI } from "@/components/ui/ExperienceUI";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { History } from "@/components/ui/History";
import { Globe, Github, Twitter, Linkedin, Mail, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import { LeetCodeIcon } from "@/components/ui/LeetCodeIcon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isChevronAnimating, setIsChevronAnimating] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [experiencesData, educationData, skillsData, projectsData, historyData] = await Promise.all([
          getExperiences(),
          getEducation(),
          getSkills(),
          getProjects(),
          getHistory()
        ]);

        setExperiences(experiencesData || []);
        setEducations(educationData || []);
        setSkills(skillsData || []);
        setProjectsData(projectsData || []);
        setHistoryData(historyData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

    const handleContactSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData(e.target);
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        setAlertType("error");
        setAlertMessage("Contact form is not configured. Please contact me directly at ansh.dhanani@gmail.com");
        setDialogOpen(false);
        setShowAlert(true);
        setIsSubmitting(false);
        return;
      }

      formData.append("access_key", accessKey);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        let result;
        try {
          result = await response.json();
        } catch (parseError) {
          console.error('Failed to parse response JSON:', parseError);
          result = { message: 'Invalid response from server' };
        }

        console.log('Response status:', response.status);
        console.log('Response result:', result);

        if (response.ok && result.success) {
          setAlertType("success");
          setAlertMessage("Message sent successfully!");
          setDialogOpen(false);
          setShowAlert(true);
          e.target.reset();
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          let errorMessage = result.message || "Failed to send message. Please try again.";
          if (response.status === 400) {
            errorMessage = "Invalid form data. Please check your inputs.";
          } else if (response.status === 401) {
            errorMessage = "Invalid access key. Please contact the administrator.";
          } else if (response.status === 429) {
            errorMessage = "Too many requests. Please try again later.";
          } else if (response.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          }
          setAlertType("error");
          setAlertMessage(errorMessage);
          setDialogOpen(false);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
      } catch (error) {
        console.error('Contact form error:', error);
        setAlertType("error");
        setAlertMessage("Network error. Please check your connection and try again, or contact me directly at ansh.dhanani@gmail.com");
        setDialogOpen(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } finally {
        setIsSubmitting(false);
      }
    };

  // Initialize smooth scrolling and animations
  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        // Only create Lenis instance if window width is >= 768
        if (window.innerWidth >= 768) {
          const lenis = new Lenis();

          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);

          return () => lenis.destroy();
        }
      } catch (error) {
        console.log("Lenis not available");
      }
    };

    // Initialize smooth scrolling
    initLenis();

    // Set up initial animations
    setTimeout(() => setShowContent(true), 500);
  }, []);

  // Show loading spinner while data is loading
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>;
  }

  // Show error message if any
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Social Icons - Bottom Center */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 z-50">
        <div className="bg-background/20 backdrop-blur-md border dark:border-white/30 rounded-full px-3 py-2  flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/Ansh-dhanani" target="_blank" rel="noopener noreferrer">
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
                <a href="https://linkedin.com/in/ansh-dhanani" target="_blank" rel="noopener noreferrer">
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
                <a href="mailto:ansh.dhanani@gmail.com">
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
            <div className="relative group">
              <ModeToggle />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                  Theme
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background flex flex-col items-center justify-center p-5 pt-10 md:pt-20 relative">
        {window.innerWidth >= 768 && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)",
              backdropFilter: "blur(10px)"
            }}
            animate={showContent ? {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) -100%, rgba(0,0,0,0) 0%)",
              backdropFilter: "blur(0px)"
            } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
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
                src="/Ansh.png"
                className="rounded-full aspect-square w-full object-cover"
                alt="Ansh's profile"
              />
            </div>
          </div>

          <div className="About">
            <h1 className="font-bold text-[1.2rem]">About</h1>
            <p className="text-stone-600 dark:text-stone-400 text-[1rem]">
              I'm currently pursuing my B.Tech in Artificial Intelligence and
              Machine Learning at CHARUSAT University. I specialize in
              frontend development, UI/UX design, and integrating AI into web
              applications. I've participated in multiple hackathons, built
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
                : experiences.map((exp) => (
                    <ExperienceUI
                      key={exp._id}
                      companyName={exp.companyName}
                      position={exp.position}
                      logo={exp.logo}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      description={exp.description}
                    />
                  ))
            }
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
                : educations.map((edu) => (
                    <ExperienceUI
                      key={edu._id}
                      companyName={edu.companyName}
                      position={edu.position}
                      logo={edu.logo}
                      startDate={edu.startDate}
                      endDate={edu.endDate}
                      description={edu.description}
                    />
                  ))}
            </div>
          </div>

          <div className="Skills pt-10">
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
                : skills.map((data) => (
                    <Badge
                      key={data._id}
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
                some of the works I've built recently.
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
                    <div key={project._id} onClick={() => { if (window.innerWidth >= 768) { setSelectedProject(project); setProjectDialogOpen(true); } }} className="md:cursor-pointer">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background dark:text-foreground dark:border-gray-600"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background dark:text-foreground dark:border-gray-600"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background dark:text-foreground dark:border-gray-600"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-background dark:text-foreground dark:border-gray-600"
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
                Twitter DM or GitHub, and I'll respond as soon as I can.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96">
          <Alert
            variant={alertType === "success" ? "default" : "destructive"}
            className={alertType === "success" ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 dark:border-green-500" : ""}
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

      {/* Project Dialog */}
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
    </div>
  );
};

export default Home;
