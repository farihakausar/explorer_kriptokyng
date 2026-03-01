"use client";

import { useState } from "react";
import Image from "next/image";

interface CoinIconProps {
  symbol: string;
  name: string;
  size?: number;
  className?: string;
}

export function CoinIcon({ symbol, name, size = 24, className = "" }: CoinIconProps) {
  const [error, setError] = useState(false);
  
  // Use direct path to public directory
  const iconPath = `/coins/${symbol.toLowerCase()}.webp`;

  if (error) {
    // Get first 2-3 characters of the coin name or symbol
    const displayText = (name.length <= 3 ? name : name.slice(0, 3)).toUpperCase();
    const fontSize = Math.max(8, size * 0.3); // Ensure minimum font size of 8px
    
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 text-primary rounded-full overflow-hidden border border-border ${className}`} 
        style={{ width: size, height: size }}
      >
        <span 
          className="font-bold text-center leading-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          {displayText}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      quality={100}
      unoptimized={true}
      onError={(e) => {
        console.error(`Failed to load coin icon: ${iconPath}`, e.currentTarget.src);
        setError(true);
      }}
      onLoad={(e) => {
        console.log(`Successfully loaded coin icon: ${e.currentTarget.src}`);
      }}
    />
  );
}