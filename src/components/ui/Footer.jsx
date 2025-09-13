import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t py-4">
      <div className="container flex justify-center items-center gap-4">
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
          <Button variant="ghost" size="sm" asChild onClick={() => window.location.href = 'mailto:dhananiansh01@gmail.com'}>
            <a>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
              Email
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};
