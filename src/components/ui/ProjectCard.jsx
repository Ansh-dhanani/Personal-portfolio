import { Github, Globe, Play } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import React, { useState } from "react";

export const ProjectCard = ({ project }) => {
  const { video, title, date, description, badges, liveUrl, githubUrl } = project || {};
  return (
    <div className="rounded-2xl overflow-hidden w-full h-full flex flex-col border-2 min-w-0">
      <VideoWithPlaceholder video={video} title={title} />
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
              <Button asChild size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-3 h-3 mr-1" />
                  Website
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button asChild size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
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

const VideoWithPlaceholder = ({ video, title }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !video) {
    return (
      <div className="w-full h-[180px] bg-muted/50 flex flex-col items-center justify-center border-b">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Play className="w-8 h-8 text-primary ml-1" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">No Video Preview</p>
      </div>
    );
  }

  return (
    <div className="video relative">
      <video 
        src={video}  
        autoPlay={true} 
        muted 
        loop 
        className="w-full h-auto object-cover"
        onError={() => setHasError(true)}
        onLoadedData={() => setIsLoading(false)}
        ref={(video) => {
          if (video) video.playbackRate = 1.5;
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 animate-pulse">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
