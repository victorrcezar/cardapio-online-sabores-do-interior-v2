import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BRAND } from '../constants';
import { OptimizedImage } from './OptimizedImage';

interface HeroProps {
  title: string;
  subtitle: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToMenu = () => {
    // Procura a primeira seção visível para rolar
    const section = document.querySelector('section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-coffee-900">
      
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <OptimizedImage 
          src="https://static.wixstatic.com/media/1f17f3_c92de6441e58429eadaf5623d7a1aac4~mv2.jpeg" 
          alt="Sabores do Interior Ambiance" 
          className="w-full h-full"
          priority={true} // High priority loading
          width={1200} // Limita a largura para telas grandes, evitando carregar 4k
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img src={BRAND.logoWhite} alt="Sabores do Interior" className="w-64 md:w-80 mx-auto drop-shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-gold-500 font-cormorant text-xl md:text-2xl italic tracking-wider mb-10">
            {subtitle}
          </p>
          
          <button 
            onClick={scrollToMenu}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-gold-500/30 hover:border-gold-500 transition-colors duration-300"
          >
             <div className="absolute inset-0 w-0 bg-gold-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-90"></div>
             <span className="relative text-white group-hover:text-coffee-900 font-montserrat font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-colors duration-300 text-sm">
               Ver cardápio completo
             </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 cursor-pointer hover:text-gold-500 transition-colors"
        onClick={scrollToMenu}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </div>
  );
};
