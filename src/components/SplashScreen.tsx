import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 3000); // Fully remove after animation

    return () => {
      clearTimeout(timer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#1a1c19] flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-brand font-serif text-6xl md:text-8xl font-bold tracking-tighter">KCR</span>
              <div className="h-px w-12 bg-brand/40" />
              <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] mt-2">Karya Cipta Raharja</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
