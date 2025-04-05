import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for ultra-smooth motion
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.33, 1, 0.68, 1],
      when: "afterChildren",
    }
  }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const [location] = useLocation();
  
  // Scroll to top when location changes - using instant scroll to avoid conflicts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="w-full will-change-transform will-change-opacity"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;