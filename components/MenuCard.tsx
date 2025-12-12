import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { OptimizedImage } from './OptimizedImage';
import { Plus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onAdd?: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, index = 0, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex items-start gap-4 py-6 border-b border-coffee-800/10 hover:border-gold-500/50 transition-colors duration-300"
    >
      {/* Image Section - Only renders if image exists */}
      {item.image && (
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative shadow-md">
           <OptimizedImage 
             src={item.image} 
             alt={item.title}
             width={400} // Solicita imagem pequena (thumbnail)
             className="w-full h-full"
           />
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-20 pointer-events-none"></div>
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full min-h-[6rem]">
        <div>
          <div className="flex justify-between items-start gap-2">
              <h3 className="text-lg md:text-xl font-playfair font-bold text-coffee-800 group-hover:text-gold-600 transition-colors duration-300 leading-tight pr-8">
                  {item.title}
              </h3>
          </div>
          
          {item.description && (
            <p className="text-coffee-700/60 font-cormorant text-lg italic mt-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-end mt-3">
          <span className="font-montserrat font-semibold text-coffee-900 text-lg whitespace-nowrap">
             {typeof item.price === 'number' 
                ? `R$ ${item.price.toFixed(2).replace('.', ',')}` 
                : item.price}
          </span>

          {onAdd && (
            <button 
              onClick={() => onAdd(item)}
              className="w-8 h-8 rounded-full bg-coffee-100 hover:bg-gold-500 text-coffee-800 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-coffee-200"
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