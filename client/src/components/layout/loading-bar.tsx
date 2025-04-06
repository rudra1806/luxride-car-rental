import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const LoadingBar = () => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Show the loading indicator
    setIsLoading(true);
    
    // Hide it after a short delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Shorter duration for faster feedback
    
    return () => {
      clearTimeout(timer);
    };
  }, [location]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      {isLoading && (
        <motion.div
          className="h-full bg-[#EAB308] origin-left"
          initial={{ width: "0%" }}
          animate={{ 
            width: ["0%", "40%", "100%"],
          }}
          transition={{ 
            times: [0, 0.4, 1],
            duration: 0.3,
            ease: "easeInOut"
          }}
          style={{ boxShadow: "0 0 6px rgba(234, 179, 8, 0.4)" }}
        />
      )}
    </div>
  );
};

export default LoadingBar;