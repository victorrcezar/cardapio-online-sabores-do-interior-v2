import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { Star, ShoppingBag } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface SpecialCardProps {
  item: MenuItem;
  reversed?: boolean;
  onAdd?: (item: MenuItem) => void;
}

export const SpecialCard: React.FC<SpecialCardProps> = ({ item, reversed = false, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''} bg-white rounded-none lg:rounded-2xl overflow-hidden shadow-xl mb-16 max-w-6xl mx-auto border border-sepia-200/50 group hover:border-gold-500/30 transition-colors duration-500`}
    >
      <div className="lg:w-7/12 relative h-72 lg:h-[450px] overflow-hidden">
        <OptimizedImage 
          src={item.image || ''} 
          alt={item.title}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-coffee-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
        {item.featured && (
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-coffee-900 px-4 py-2 rounded-sm border-l-4 border-gold-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg z-20">
            <Star size={12} fill="#BFA15F" className="text-gold-500" /> Destaque
          </div>
        )}
      </div>
      
      <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center bg-sepia-100/50 relative">
        <span className="font-montserrat text-gold-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
          Sugestão do chef
        </span>
        
        <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-coffee-800 mb-6 leading-tight">
          {item.title}
        </h3>
        
        <div className="w-12 h-0.5 bg-gold-500/50 mb-6"></div>
        
        <p className="text-coffee-700/70 font-cormorant text-xl italic mb-8 leading-relaxed">
          {item.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-coffee-800/5 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-montserrat font-bold text-coffee-400 uppercase tracking-wider mb-1">Valor</span>
            <span className="text-3xl font-playfair font-bold text-gold-600">
               {typeof item.price === 'number' 
                ? `R$ ${item.price.toFixed(2).replace('.', ',')}` 
                : item.price}
            </span>
          </div>

          {onAdd && (
            <button 
              onClick={() => onAdd(item)}
              className="bg-coffee-800 hover:bg-gold-600 text-gold-500 hover:text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 font-montserrat font-bold text-xs uppercase tracking-wider"
            >
              <span>Pedir</span>
              <ShoppingBag size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};