import React, { useEffect } from 'react';
import gsap from 'gsap';

const HeartFloat = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      document.body.appendChild(heart);

      const size = Math.random() * 20 + 10; // 10px to 30px
      const left = Math.random() * 100; // % of screen
      const duration = Math.random() * 3 + 3; // 3s to 6s

      gsap.set(heart, {
        left: `${left}vw`,
        fontSize: `${size}px`,
        opacity: Math.random() * 1.5 + 1.5,
        bottom: '-30px',
        position: 'fixed',
        color: '#ec4899', // Tailwind pink-500
        pointerEvents: 'none',
      });

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        rotation: Math.random() * 560,
        duration,
        ease: 'power1.out',
        onComplete: () => {
          heart.remove();
        },
      });
    };

    const interval = setInterval(createHeart, 100);

    return () => clearInterval(interval);
  }, []);

  return null; // Nothing visible, it's all DOM manipulation
};

export default HeartFloat;
