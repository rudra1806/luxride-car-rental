import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    }
  }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const [location] = useLocation();
  
  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Using auto for better performance
    });
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
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;