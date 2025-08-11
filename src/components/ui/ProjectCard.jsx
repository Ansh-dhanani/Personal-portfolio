import { Github, Globe } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import React from "react";

const ProjectCard = ({ project }) => {
  const { video, title, date, description, badges, liveUrl, githubUrl } = project || {};
  return (
    <div className="rounded-2xl overflow-hidden w-full h-full flex flex-col border-2 min-w-0">
      <div className="video">
        <video 
          src={video}  
          autoPlay={true} 
          muted 
          loop 
          className="w-full h-auto object-cover"
        ></video>
      </div>
      <div className="p-[7px] flex flex-col flex-grow">
        <div className="font-bold text-lg">{title || "Title"}</div>
        <div className="font-light text-sm text-stone-500 dark:text-stone-400">{date || "start-end"}</div>
        <div className="tracking-tighter leading-5 text-stone-600 dark:text-stone-400 flex-grow py-2">
          {description}
        </div>
        <div className="mt-auto">
          <div className="flex flex-row flex-wrap gap-[4px]">
            {(badges).map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{badge}</Badge>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-[4px] pt-2">
            {liveUrl && (
              <Button asChild size="sm" className="text-xs">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-3 h-3 mr-1" />
                  Website
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button asChild size="sm" className="text-xs">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3 mr-1" />
                  GitHub
                </a>
              </Button>
            )}
           
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProjectCard;
