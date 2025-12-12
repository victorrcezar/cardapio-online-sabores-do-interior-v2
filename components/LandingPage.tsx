import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, SOCIAL_LINKS } from '../constants';
import { ShoppingBag, BookOpen, ArrowRight, Instagram, Sun, Moon, X, Clock } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface LandingPageProps {
  onSelectMode: (mode: 'view' | 'delivery', period: 'morning' | 'night') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<'view' | 'delivery' | null>(null);

  const handleInitialClick = (mode: 'view' | 'delivery') => {
    setPendingMode(mode);
    setIsModalOpen(true);
  };

  const confirmSelection = (period: 'morning' | 'night') => {
    if (pendingMode) {
      // Fecha modal e navega
      setIsModalOpen(false);
      // Pequeno delay para a animação fluir
      setTimeout(() => {
        onSelectMode(pendingMode, period);
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-coffee-900 h-[100dvh] w-screen overflow-y-auto overflow-x-hidden flex flex-col">
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <OptimizedImage
          src="https://static.wixstatic.com/media/1f17f3_c92de6441e58429eadaf5623d7a1aac4~mv2.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
          priority={true}
          width={1200}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/90 via-coffee-900/80 to-coffee-900/95 pointer-events-none"></div>

      {/* Content Layer */}
      <div className="relative z-20 w-full min-h-full flex flex-col items-center justify-center p-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex-shrink-0 mt-10 md:mt-0" 
        >
          {/* Logo */}
          <img 
            src={BRAND.logoWhite} 
            alt="Sabores do Interior" 
            className="w-56 md:w-72 mx-auto drop-shadow-2xl block" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md flex flex-col gap-4"
        >
          {/* Botão Cardápio Online */}
          <button
            onClick={() => handleInitialClick('view')}
            className="group w-full p-6 rounded-2xl border border-sepia-200/30 bg-sepia-100/5 backdrop-blur-sm hover:bg-sepia-100/10 transition-all duration-300 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-5">
              <div className="p-3 rounded-xl bg-sepia-100/10 text-sepia-100 group-hover:bg-sepia-100/20 transition-colors">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-sepia-100 leading-tight">Cardápio Online</h3>
                <p className="text-sepia-200/60 font-montserrat text-[10px] uppercase tracking-widest mt-1">Apenas Visualização</p>
              </div>
            </div>
          </button>

          {/* Botão Cardápio Delivery */}
          <button
            onClick={() => handleInitialClick('delivery')}
            className="group w-full p-6 rounded-2xl bg-gold-600 hover:bg-gold-500 transition-all duration-300 flex items-center justify-between text-left shadow-lg hover:shadow-gold-500/20 hover:-translate-y-1"
          >
            <div className="flex items-center gap-5">
              <div className="p-3 rounded-xl bg-coffee-900/10 text-coffee-900 group-hover:bg-coffee-900/20 transition-colors">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-coffee-900 leading-tight">Cardápio Delivery</h3>
                <p className="text-coffee-900/70 font-montserrat text-[10px] uppercase tracking-widest mt-1">Faça seu pedido agora</p>
              </div>
            </div>
            <ArrowRight className="text-coffee-900 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>

        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 text-center"
        >
           <p className="text-sepia-100/40 font-montserrat text-[10px] uppercase tracking-[0.3em]">
             Uma experiência rústica e gourmet
           </p>

           {/* Social Icons Mini */}
           <div className="flex justify-center gap-6 mt-6 opacity-60">
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors text-white">
                <Instagram size={20} />
              </a>
           </div>
        </motion.div>
      </div>

      {/* MODAL DE SELEÇÃO DE PERÍODO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-coffee-900/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-md bg-sepia-100 rounded-2xl shadow-2xl overflow-hidden border border-gold-500/20"
            >
              <div className="p-6 bg-coffee-800 flex justify-between items-center">
                 <h3 className="text-gold-500 font-playfair font-bold text-xl">Qual cardápio deseja ver?</h3>
                 <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gold-500/70 hover:text-gold-500 transition-colors"
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="p-6 grid grid-cols-1 gap-4">
                 <button
                    onClick={() => confirmSelection('morning')}
                    className="flex items-center gap-4 p-4 rounded-xl border border-sepia-200 bg-white hover:border-gold-500 hover:bg-gold-500/5 transition-all group"
                 >
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                       <Sun size={24} />
                    </div>
                    <div className="text-left">
                       <h4 className="font-playfair font-bold text-coffee-800 text-lg">Manhã e Tarde</h4>
                       <div className="flex items-center gap-1 text-coffee-600/70 text-xs font-montserrat mt-0.5">
                          <Clock size={12} />
                          <span>07:00 às 17:59</span>
                       </div>
                    </div>
                 </button>

                 <button
                    onClick={() => confirmSelection('night')}
                    className="flex items-center gap-4 p-4 rounded-xl border border-sepia-200 bg-white hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
                 >
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                       <Moon size={24} />
                    </div>
                    <div className="text-left">
                       <h4 className="font-playfair font-bold text-coffee-800 text-lg">Noite</h4>
                       <div className="flex items-center gap-1 text-coffee-600/70 text-xs font-montserrat mt-0.5">
                          <Clock size={12} />
                          <span>A partir das 18:00</span>
                       </div>
                    </div>
                 </button>
              </div>

              <div className="p-4 bg-sepia-200/30 text-center">
                 <p className="text-[10px] text-coffee-700/60 font-montserrat uppercase tracking-wider">
                   Selecione o período para visualizar os itens disponíveis
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
