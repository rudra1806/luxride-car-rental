import React from 'react';
import { Link } from 'wouter';

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

  const { icon, text } = getSize();

  return (
    <Link href="/">
      <a className="flex items-center gap-2 cursor-pointer">
        <svg 
          width={icon} 
          height={icon} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M16.5 6H12.5L9.5 12H5.5L4 14.5H9L12 8.5H16L17.5 6Z" 
            fill={color}
          />
          <path 
            d="M8 6H2.5L6 18H11.5L8 6Z" 
            fill={color} 
            fillOpacity="0.6"
          />
          <path 
            d="M16 6H21.5L18 18H12.5L16 6Z" 
            fill={color} 
            fillOpacity="0.8"
          />
        </svg>
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