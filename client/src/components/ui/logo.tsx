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
            d="M21.5 12c0-.17-.01-.33-.03-.5H19v-4a1 1 0 00-1-1h-5.5a1 1 0 00-1 1v.5h-1.25a1 1 0 00-.81.42l-1.92 2.58h-2.77a1 1 0 00-1 1v3.5h-1.75c-.01.17-.03.33-.03.5 0 1.25.57 2.34 1.46 3.09-.24.32-.41.71-.41 1.14a1.75 1.75 0 003.5 0c0-.12-.01-.23-.04-.34h9.96a1.7 1.7 0 00-.04.34 1.75 1.75 0 103.5 0c0-.43-.17-.82-.41-1.14.89-.75 1.46-1.84 1.46-3.09zM17.5 9h-5v-1h5v1zm0 1v2h-5v-2h5zm-8.21 2L11 9.92V12H9.29z" 
            fill={color}
          />
        </svg>
        <span 
          className="font-bold tracking-tight" 
          style={{ 
            fontSize: `${text}px`,
            color: textColor,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <span style={{color: textColor}}>Lux</span>
          <span style={{color}}>Drive</span>
        </span>
      </a>
    </Link>
  );
};

export default Logo;