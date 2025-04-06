import React from 'react';
import { Link } from 'wouter';
import CarLogo from './car-logo';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  color = '#F59E0B',
  textColor = '#FFFFFF'
}) => {
  const getSize = () => {
    switch(size) {
      case 'sm': return { icon: 20, text: 16 };
      case 'lg': return { icon: 32, text: 24 };
      case 'md':
      default: return { icon: 24, text: 20 };
    }
  };

  const { text } = getSize();

  return (
    <Link href="/">
      <a className="flex items-center gap-2 cursor-pointer">
        <CarLogo size={size} color={color} />
        <span 
          className="font-bold tracking-tight" 
          style={{ 
            fontSize: `${text}px`,
            color: textColor 
          }}
        >
          <span style={{color: textColor}}>Lux</span>
          <span style={{ color }}>Ride</span>
        </span>
      </a>
    </Link>
  );
};

export default Logo;