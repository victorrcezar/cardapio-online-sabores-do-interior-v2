import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

interface ParallaxSectionProps {
  id?: string;
  backgroundImage: string;
  children: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  id, 
  backgroundImage, 
  children, 
  overlayColor = 'bg-coffee-900',
  overlayOpacity = 0.85 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Moves the background slightly slower/faster than scroll to create depth
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id={id} ref={ref} className="relative py-24 overflow-hidden">
      <motion.div 
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%]"
      >
         <OptimizedImage 
           src={backgroundImage} 
           alt="Section Background"
           className="w-full h-full"
         />
      </motion.div>
      
      {/* Overlay for text readability */}
      <div className={`absolute inset-0 ${overlayColor} z-0 pointer-events-none`} style={{ opacity: overlayOpacity }}></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
};