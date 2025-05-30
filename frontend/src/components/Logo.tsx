
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ 
  textColor = 'text-navy', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16',
  };
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} aspect-square relative`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer circle */}
          <circle cx="100" cy="100" r="90" fill="#1FBAB4" />
          
          {/* Inner circle (white background) */}
          <circle cx="100" cy="100" r="80" fill="#FFFFFF" />
          
          {/* Left person (orange) */}
          <circle cx="70" cy="70" r="20" fill="#F28B30" />  {/* Head */}
          <path d="M40 140 A50 50 0 0 1 100 140 L100 100 L40 100 Z" fill="#F28B30" />  {/* Body */}
          
          {/* Right person (navy) */}
          <circle cx="130" cy="70" r="20" fill="#263545" />  {/* Head */}
          <path d="M100 140 A50 50 0 0 0 160 140 L160 100 L100 100 Z" fill="#263545" />  {/* Body */}
        </svg>
      </div>
      <h1 className={`font-poppins font-bold ${textColor} text-xl md:text-2xl`}>
        CircleMate
      </h1>
    </Link>
  );
};

export default Logo;
