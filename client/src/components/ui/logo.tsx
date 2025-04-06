import React from 'react';
import { Link } from 'wouter';
import logoImage from '../../assets/luxride-logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md'
}) => {
  // Get logo size based on the size prop
  const getLogoHeight = () => {
    switch(size) {
      case 'sm': return 24;
      case 'lg': return 40;
      case 'md':
      default: return 32;
    }
  };

  const logoHeight = getLogoHeight();

  return (
    <Link href="/">
      <a className="flex items-center cursor-pointer">
        <img 
          src={logoImage} 
          alt="LuxRide Logo" 
          height={logoHeight} 
          style={{ height: `${logoHeight}px` }}
          className="object-contain"
        />
      </a>
    </Link>
  );
};

export default Logo;