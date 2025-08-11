import React from "react";
import { Button } from "./button";
import { Github, ExternalLink } from "lucide-react";

const History = ({ logo, date, title, place, info, githubUrl, siteUrl }) => {
  return (
    <>
      <div className="relative flex flex-row gap-4 ml-14 p-2 pl-5 pt-4 border-l-2">
        <div className="absolute -left-6 top-2 flex items-center w-12  h-12 ">
          {logo ? (
            <img
              src={logo}
              alt={title}
              className="w-full h-full  rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs ">Logo</span>
            </div>
          )}
        </div>
        <div className="flex-grow ml-5">
          <div>
            <h3 className="text-sm text-stone-400 leading-3">{date}</h3>
            <h3 className="font-semibold text-[15px] leading-7">{title}</h3>
          </div>
          {place && <p className="text-sm leading-3">{place}</p>}
          {info && (
            <p className="text-stone-400 text-sm leading-tight pt-2 pb-3">{info}</p>
          )}
          
          {(githubUrl || siteUrl) && (
            <div className="flex gap-2 pt-2">
              {githubUrl && (
                <Button asChild size="sm" variant="outline">
                  <a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    GitHub
                  </a>
                </Button>
              )}
              {siteUrl && (
                <Button asChild size="sm" variant="outline">
                  <a 
                    href={siteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Site
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
          
    </>
  );
};

export default History;
