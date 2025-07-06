import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineEvents } from './timelineData';

gsap.registerPlugin(ScrollTrigger);

const LoveStoryTimeline = () => {
  const timelineRef = useRef([]);

  useEffect(() => {
    timelineRef.current.forEach((el) => {
      if (!el) return; // skip if ref is undefined
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen py-12 px-4 md:px-12 font-sans">
      <h2 className="text-4xl text-center font-bold text-gray-800 mb-2">
        Our Love Story Timeline
      </h2>
      <p className="text-center text-gray-500 mb-10">
        do not go on things written that are random , we are working on it""":)
      </p>

      <div className="relative max-w-6xl mx-auto">
        {/* vertical center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-300"></div>

        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="mb-16 relative"
              ref={(el) => (timelineRef.current[index] = el)}
            >
              <div
                className={`md:w-1/2 px-4 md:px-8 py-4 ${
                  isLeft ? 'md:pr-12 md:ml-0 md:mr-auto' : 'md:pl-12 md:ml-auto md:mr-0'
                }`}
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
                  <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                      {event.date}
                    </span>
                    <span>📍 {event.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full mt-4 rounded-lg object-cover shadow-md"
                  />
                </div>
              </div>

              {/* Center icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-500 shadow-md">
                {event.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoveStoryTimeline;
