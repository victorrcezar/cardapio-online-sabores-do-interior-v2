import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Check } from 'lucide-react';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onConfirm(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-coffee-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-sepia-100 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gold-500/30"
          >
            {/* Header */}
            <div className="bg-coffee-800 p-6 text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gold-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="font-playfair text-2xl font-bold text-gold-500">
                Antes de finalizarmos...
              </h3>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col gap-6">
              <div className="text-center">
                <p className="text-coffee-800 font-montserrat text-sm leading-relaxed mb-1">
                  Por favor, informe seu <strong>nome</strong> para que possamos identificar o pedido na entrega.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee-700">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite seu nome completo"
                  autoFocus
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-white text-coffee-900 placeholder-gray-400 focus:outline-none transition-all font-montserrat ${
                    error 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-sepia-200 focus:border-gold-500'
                  }`}
                />
                {error && (
                  <motion.span 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 text-xs text-red-500 font-semibold pl-2"
                  >
                    * Informe seu nome para continuar.
                  </motion.span>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-2 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-coffee-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>Confirmar Pedido</span>
                <Check size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};