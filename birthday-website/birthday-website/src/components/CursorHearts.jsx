import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorHearts = () => {
  const [hearts, setHearts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleClick = (x, y) => {
      const newHeart = {
        id: Date.now() + Math.random(),
        x,
        y
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, 1000);
    };

    const handleMouseClick = (e) => handleClick(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        handleClick(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseClick);

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseClick);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* Cursor Follower */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200
        }}
      >
        <div className="w-5 h-5 bg-rose-400 rounded-full opacity-50" />
      </motion.div>

      {/* Click/Tap Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-40 text-2xl"
            initial={{
              x: heart.x - 12,
              y: heart.y - 12,
              scale: 0,
              opacity: 1
            }}
            animate={{
              y: heart.y - 100,
              scale: [0, 1.2, 0.8],
              opacity: [1, 1, 0]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorHearts;
