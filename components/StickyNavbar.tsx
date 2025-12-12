import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface StickyNavbarProps {
  onBack: () => void;
}

export const StickyNavbar: React.FC<StickyNavbarProps> = ({ onBack }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        backgroundColor: isScrolled ? 'rgba(253, 251, 247, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none',
        paddingTop: isScrolled ? '1rem' : '1.5rem',
        paddingBottom: isScrolled ? '1rem' : '1.5rem',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 lg:px-12 border-b border-transparent data-[scrolled=true]:border-sepia-200"
      data-scrolled={isScrolled}
    >
      <div className="flex items-center gap-6">
        <button 
            onClick={onBack}
            className={`p-2 rounded-full transition-all duration-300 group flex items-center gap-2 ${
                isScrolled 
                ? 'bg-coffee-800/5 text-coffee-800 hover:bg-gold-500 hover:text-white' 
                : 'bg-black/20 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm'
            }`}
            title="Voltar ao início"
        >
            <ArrowLeft size={20} />
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider hidden md:block pr-1">
                Início
            </span>
        </button>

        <div className="flex items-center gap-3">
            {/* Logo transitions from white (on Hero) to brown (on content) */}
            <div className="relative h-10 w-10 overflow-hidden">
                <motion.img 
                src={BRAND.logoWhite} 
                alt="Logo" 
                className="absolute inset-0 w-full h-full object-contain"
                animate={{ opacity: isScrolled ? 0 : 1 }}
                />
                <motion.img 
                src={BRAND.logoBrown} 
                alt="Logo" 
                className="absolute inset-0 w-full h-full object-contain"
                animate={{ opacity: isScrolled ? 1 : 0 }}
                />
            </div>
            <motion.span 
                animate={{ 
                    opacity: isScrolled ? 1 : 0,
                    x: isScrolled ? 0 : -10
                }}
                className="font-playfair font-bold text-coffee-800 text-lg hidden md:block"
            >
                Sabores do Interior
            </motion.span>
        </div>
      </div>

      {/* Cart button removed for view-only menu */}
    </motion.div>
  );
};