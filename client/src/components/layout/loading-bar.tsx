import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const LoadingBar = () => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Match this duration with page transition duration
    
    return () => clearTimeout(timeout);
  }, [location]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      {isLoading && (
        <motion.div
          className="h-full bg-[#EAB308]"
          initial={{ width: "0%" }}
          animate={{ 
            width: "100%",
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        />
      )}
    </div>
  );
};

export default LoadingBar;