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
            d="M21.5 11L19 6.5H5L2.5 11L4 16.5H20L21.5 11Z" 
            fill={color} 
          />
          <path 
            d="M19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z" 
            fill="#111827" 
          />
          <path 
            d="M8 17.5C8 18.3284 7.32843 19 6.5 19C5.67157 19 5 18.3284 5 17.5C5 16.6716 5.67157 16 6.5 16C7.32843 16 8 16.6716 8 17.5Z" 
            fill="#111827" 
          />
          <path 
            d="M22 11H2M19 7H5L2.5 11L4 17H20L21.5 11L19 7Z" 
            stroke="#111827" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        <span 
          className="font-bold tracking-tight" 
          style={{ 
            fontSize: `${text}px`,
            color: textColor 
          }}
        >
          <span>Luxe</span>
          <span style={{ color }}>Wheel</span>
        </span>
      </a>
    </Link>
  );
};

export default Logo;