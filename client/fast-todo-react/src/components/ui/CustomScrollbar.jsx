import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const CustomScrollbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercentage = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(currentScrollPercentage);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollbarClick = (e) => {
    const clickPosition = e.nativeEvent.offsetY;
    const scrollbarHeight = e.currentTarget.clientHeight;
    const scrollPercentage = (clickPosition / scrollbarHeight) * 100;
    const scrollTarget = (document.documentElement.scrollHeight - window.innerHeight) * (scrollPercentage / 100);
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <motion.div
        className="fixed right-2 top-0 h-full w-3 rounded-full bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
        onClick={handleScrollbarClick}
      >
        <motion.div
          className="absolute w-full rounded-full bg-white shadow-lg cursor-pointer"
          style={{ height: `${scrollPercentage}%` }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-75 animate-pulse" />
        </motion.div>
      </motion.div>

      <motion.button
        className="fixed bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="text-xl" />
      </motion.button>
    </div>
  );
};

export default CustomScrollbar;
