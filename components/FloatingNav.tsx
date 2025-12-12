import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface FloatingNavProps {
  onAction: () => void;
  count?: number;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onAction, count = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // O botão aparece se houver itens no carrinho OU se a pessoa rolou a página
  const isVisible = count > 0 || isScrolled;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8, 
          y: isVisible ? 0 : 50,
          pointerEvents: isVisible ? 'auto' : 'none' 
        }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-24 right-6 z-40 md:bottom-8" // Ajustado para não ficar em cima do menu inferior no mobile
      >
        <motion.button 
          onClick={onAction}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gold-500 text-coffee-900 p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] border-2 border-white/10 hover:bg-white hover:text-coffee-900 transition-all duration-300 group flex items-center justify-center"
        >
          <ShoppingBag size={28} strokeWidth={2.5} />
          
          {/* Badge contador de itens */}
          {count > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={count} // Anima toda vez que o número muda
              className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-coffee-800 shadow-sm"
            >
              {count}
            </motion.div>
          )}

          <span className="absolute right-full mr-4 bg-coffee-900 text-gold-500 text-xs font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
            Ver Sacola
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};