import React from 'react';
import { MenuItem } from '../types';
import { motion } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';
import { Plus } from 'lucide-react';

interface DrinkCardProps {
  item: MenuItem;
  index: number;
  onAdd?: (item: MenuItem) => void;
}

export const DrinkCard: React.FC<DrinkCardProps> = ({ item, index, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:border-gold-500/30 hover:bg-white/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden relative shadow-lg">
        <OptimizedImage 
          src={item.image || ''} 
          alt={item.title}
          width={400} // Solicita imagem pequena
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-playfair font-bold text-gold-500 text-lg md:text-xl leading-tight pr-2 group-hover:text-gold-400 transition-colors">
              {item.title}
            </h4>
          </div>
          
          {item.description && (
            <p className="text-gray-400 font-cormorant italic text-sm md:text-base mt-1 leading-snug line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-end mt-2">
           <span className="font-montserrat font-bold text-white text-lg whitespace-nowrap">
             {typeof item.price === 'number' 
                ? `R$ ${item.price.toFixed(2).replace('.', ',')}` 
                : item.price}
          </span>
          
          {onAdd && (
            <button 
              onClick={() => onAdd(item)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 text-white flex items-center justify-center transition-all duration-300"
              aria-label="Adicionar ao carrinho"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};