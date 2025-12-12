import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light = false }) => {
  return (
    <div className="mb-14 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={`block text-xs md:text-sm uppercase tracking-[0.3em] font-montserrat font-semibold mb-2 ${light ? 'text-gold-500' : 'text-coffee-800'}`}>
          Sabores do Interior
        </span>
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 ${light ? 'text-sepia-100' : 'text-coffee-800'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`font-cormorant text-xl md:text-2xl italic ${light ? 'text-gray-300' : 'text-coffee-700/80'} max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        )}
        <div className="flex justify-center mt-6 gap-2">
          <span className="w-3 h-3 rounded-full border border-gold-500 bg-transparent"></span>
          <span className="w-16 h-1 bg-gold-500 rounded-full mt-1"></span>
          <span className="w-3 h-3 rounded-full border border-gold-500 bg-transparent"></span>
        </div>
      </motion.div>
    </div>
  );
};