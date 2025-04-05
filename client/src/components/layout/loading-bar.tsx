import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'wouter';

const LoadingBar = () => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    // Create a smooth animation sequence
    const startLoading = async () => {
      setIsLoading(true);
      
      // First move quickly to 30%
      await controls.start({
        width: "30%",
        transition: { duration: 0.15, ease: "easeOut" }
      });
      
      // Then slow down to 65%
      await controls.start({
        width: "65%",
        transition: { duration: 0.3, ease: "easeInOut" }
      });
      
      // Then very slowly to 85%
      await controls.start({
        width: "85%",
        transition: { duration: 0.4, ease: "linear" }
      });
      
      // Wait for page to actually load
      // Then finish the bar
      setTimeout(() => {
        controls.start({
          width: "100%",
          transition: { duration: 0.1, ease: "easeIn" }
        }).then(() => {
          // Fade out after completion
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        });
      }, 100);
    };
    
    startLoading();
    
    return () => {
      controls.stop();
    };
  }, [location, controls]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      {isLoading && (
        <motion.div
          className="h-full bg-[#EAB308] origin-left"
          initial={{ width: "0%" }}
          animate={controls}
          style={{ boxShadow: "0 0 10px rgba(234, 179, 8, 0.5)" }}
        />
      )}
    </div>
  );
};

export default LoadingBar;