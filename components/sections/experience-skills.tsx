"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Container } from "../container";
import { MagicCard, MotionUp, Timeline } from "../animations";
import { Heading } from "../";
import { WorkExperience, Skill, Certificate } from "@/lib/types";

interface ViewCertificateButtonProps {
  url: string | undefined;
}
// Previous helper functions remain the same
function sortByStartDate(arr: WorkExperience[]): WorkExperience[] {
  return [...arr].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

const ViewCertificateButton: React.FC<ViewCertificateButtonProps> = ({
  url,
}) => {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius)] hover:bg-primary/90 transition-colors duration-200 text-sm font-medium group"
    >
      View Certificate
      <svg
        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
};

interface CertificateCarouselProps {
  certificates: Certificate[];
}

const CertificateCarousel: React.FC<CertificateCarouselProps> = ({
  certificates,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = useCallback(
    (index: number) => {
      const normalizedIndex =
        ((index % certificates.length) + certificates.length) %
        certificates.length;
      setCurrentIndex(normalizedIndex);
    },
    [certificates.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && certificates.length > 1) {
      intervalId = setInterval(nextSlide, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide, certificates.length]);

  if (!certificates.length) {
    return null;
  }

  if (certificates.length === 1) {
    return (
      <div className="w-full relative">
        <div className="overflow-hidden relative h-[500px] rounded-t-lg">
          <Image
            src={certificates[0].image}
            alt={certificates[0].title}
            width={1280}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-b-lg relative">
          <h3 className="text-center text-white text-xl font-semibold mb-2">
            {certificates[0].title}
          </h3>
          <div className="flex justify-end mt-2">
            <ViewCertificateButton url={certificates[0].url} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden relative h-[500px] rounded-t-lg">
        {certificates.map((certificate, index) => (
          <div
            key={certificate.title}
            className="absolute w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              visibility:
                Math.abs(index - currentIndex) > 1 ? "hidden" : "visible",
            }}
          >
            <Image
              src={certificate.image}
              alt={certificate.title}
              width={1280}
              height={800}
              className="w-full h-full object-cover"
              priority={index === currentIndex}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Certificate Title and View Button */}
      <div className="bg-gray-800 p-4 rounded-b-lg">
        <h3 className="text-center text-white text-xl font-semibold mb-2">
          {certificates[currentIndex].title}
        </h3>
        <div className="flex justify-end mt-2">
          <ViewCertificateButton url={certificates[currentIndex].url} />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 mt-4">
        {certificates.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Rest of the ExperienceSkills component remains the same...
interface Props {
  experiences: WorkExperience[];
  skills: Skill[];
  certificates: Certificate[];
}

export function ExperienceSkills({ experiences, skills, certificates }: Props) {
  const sortedExperiences = sortByStartDate(experiences);

  return (
    <section className="w-full py-10 md:py-20" id="about">
      <Container>
        <MotionUp delay={0.1}>
          <Heading text="Career History" />
          <Timeline data={sortedExperiences} />
        </MotionUp>

        <MotionUp className="mt-10 p-0 py-10 rounded-lg" delay={0.1}>
          <Heading text="Expertise" />
          <Marquee
            speed={90}
            pauseOnHover
            className="mt-5 overflow-hidden py-5"
          >
            {skills.map((skill) => (
              <MagicCard
                className="hover:scale-105 transition-all duration-500 w-40 h-40 ms-10 flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor="#262626"
                key={skill.name}
              >
                <div className="flex flex-col items-center w-full gap-2">
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={80}
                    height={80}
                    className="h-16 w-16 rounded-full object-cover border border-white bg-white"
                  />
                  <h6 className="text-start text-lg font-bold text-blue-100">
                    {skill.url ? (
                      <Link
                        target="_blank"
                        href={skill.url}
                        className="hover:underline"
                      >
                        {skill.name}
                      </Link>
                    ) : (
                      skill.name
                    )}
                  </h6>
                </div>
              </MagicCard>
            ))}
          </Marquee>
        </MotionUp>

        <MotionUp className="mt-10 p-0 py-10 rounded-lg" delay={0.1}>
          <Heading text="Certifications" />
          <div className="max-w-4xl mx-auto mt-10 mb-12 relative">
            <CertificateCarousel certificates={certificates} />
          </div>
        </MotionUp>
      </Container>
    </section>
  );
}

export default ExperienceSkills;
