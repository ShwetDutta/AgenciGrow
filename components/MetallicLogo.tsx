import React from 'react';

interface MetallicLogoProps {
  size: 'sm' | 'footer';
  className?: string;
  style?: React.CSSProperties;
}

export const MetallicLogo: React.FC<MetallicLogoProps> = ({ size, className = '', style }) => {
  const isFooter = size === 'footer';

  // Base styles and dimensions scaled via em units so they scale perfectly
  const containerStyle: React.CSSProperties = isFooter
    ? {
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(60px, 16vw, 340px)',
        opacity: 0.30,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }
    : {
        fontSize: 'inherit',
        ...style,
      };

  return (
    <>
      {/* Self-contained style block for the unified metallic liquid chrome effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes metallic-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .metallic-liquid-text {
          background: linear-gradient(
            90deg,
            #5F6166 0%,
            #8E9196 15%,
            #C5C8CD 30%,
            #FFFFFF 50%,
            #C5C8CD 70%,
            #8E9196 85%,
            #5F6166 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
          animation: metallic-shimmer 8s linear infinite;
        }
      `}} />

      <div 
        className={`flex items-center select-none font-body ${isFooter ? 'gap-[0.03em]' : 'gap-2 z-20'} ${className}`}
        style={containerStyle}
      >
        <span className={`font-bold tracking-tight metallic-liquid-text select-none ${isFooter ? 'leading-none' : 'text-lg md:text-xl'}`}>
          AgenciGrow
        </span>
        
        <div className={`flex items-center ${isFooter ? '-mt-[0.05em]' : '-mt-0.5'}`}>
          <svg 
            width={isFooter ? '0.9em' : '22'} 
            height={isFooter ? '0.9em' : '22'} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={isFooter ? '' : 'transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}
          >
            <defs>
              {/* Animated linear gradient matching the text shimmer speed and palette perfectly */}
              <linearGradient id={`metallicLogoArrowGrad-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5F6166">
                  <animate attributeName="stop-color" values="#5F6166;#C5C8CD;#FFFFFF;#C5C8CD;#5F6166" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#C5C8CD">
                  <animate attributeName="stop-color" values="#C5C8CD;#FFFFFF;#C5C8CD;#5F6166;#C5C8CD" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#FFFFFF">
                  <animate attributeName="stop-color" values="#FFFFFF;#C5C8CD;#5F6166;#C5C8CD;#FFFFFF" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            
            {/* Small arrow (bottom left) */}
            <path 
              d="M4 18 L12 10 M12 10 H8 M12 10 V14" 
              stroke={`url(#metallicLogoArrowGrad-${size})`} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.8"
            />
            <polygon points="12,10 8,10 12,14" fill={`url(#metallicLogoArrowGrad-${size})`} opacity="0.8" />
            
            {/* Large arrow (top right) */}
            <path 
              d="M10 12 L20 2 M20 2 H14 M20 2 V8" 
              stroke={`url(#metallicLogoArrowGrad-${size})`} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <polygon points="20,2 14,2 20,8" fill={`url(#metallicLogoArrowGrad-${size})`} />
          </svg>
        </div>
      </div>
    </>
  );
};
