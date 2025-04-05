import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`w-full transition-opacity duration-300 ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default PageTransition;