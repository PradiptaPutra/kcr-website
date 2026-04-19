import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    const hideDelay = mediaQuery.matches ? 500 : 2200;
    const removeDelay = mediaQuery.matches ? 900 : 3000;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, removeDelay);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
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
              y: prefersReducedMotion ? 0 : -100,
              transition: { duration: prefersReducedMotion ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[99999] bg-[#1a1c19] flex items-center justify-center overflow-hidden pointer-events-auto"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.25em] text-white/50 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Skip
            </button>
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 1, ease: [0.22, 1, 0.36, 1] }}
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
