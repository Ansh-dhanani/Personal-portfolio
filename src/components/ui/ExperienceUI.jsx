import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "./skeleton";
const ExperienceUI = ({
  companyName,
  position,
  logo,
  startDate,
  endDate,
  description,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isactive, setIsActive] = useState(false);

  return (
    <div
      className=" cursor-pointer transition-all duration-300 ease-in-out transform ]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsActive(!isactive);
        setIsHovered(false);
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <LogoWithSkeleton logo={logo} companyName={companyName} />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row  sm:justify-between">
            <div>
          <h2 className="text-[17px] font-medium flex text-gray-900 dark:text-white transition-colors duration-300">
                {companyName}
                <span>
                  <ChevronRight
                    className={`size-4 mt-[6px] ml-1 transition-transform duration-300 ${
                      isactive ? "rotate-90" : isHovered ? "opacity-100" : "rotate-0 opacity-0"
                    }`}
                  />
                </span>
              </h2>
              <h3 className="text-[13px] leading-4 font-medium transition-colors duration-300">
                {position}
              </h3>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
              {startDate} - {endDate}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isactive ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogoWithSkeleton = ({ logo, companyName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {isLoading && <Skeleton className="w-12 h-12 rounded-full" />}
      <img
        src={logo}
        alt={`${companyName} logo`}
        className={`w-12 h-12 rounded-full object-cover transition-transform duration-300 hover:scale-110 ${
          isLoading ? "hidden" : "block"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setHasError(true);
          e.target.src = "https://via.placeholder.com/48x48?text=Logo";
        }}
      />
    </>
  );
};

export default ExperienceUI;
