import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onFinalize: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onFinalize
}) => {
  // Calculate numeric total (ignoring "Sob consulta" / NaN)
  const total = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return isNaN(price) ? acc : acc + price * item.quantity;
  }, 0);

  // Check if there are any items with non-numeric price
  const hasConsultationItems = cartItems.some(item => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return isNaN(price);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-sepia-100 z-[70] shadow-2xl flex flex-col border-l border-gold-500/30"
          >
            {/* Header */}
            <div className="bg-coffee-800 p-6 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3 text-gold-500">
                <ShoppingBag size={24} />
                <h2 className="font-playfair text-xl font-bold tracking-wide">Seu Pedido</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gold-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-coffee-800/50 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-montserrat text-sm">Seu carrinho está vazio.</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-gold-600 font-bold text-sm hover:underline"
                  >
                    Voltar ao cardápio
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-sepia-200 flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-playfair font-bold text-coffee-800 leading-tight text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-2">
                        <span className="font-montserrat font-semibold text-gold-600 text-sm">
                          {(() => {
                            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                            if (isNaN(price)) return item.price; // Display original string (e.g. "Sob consulta")
                            return `R$ ${price.toFixed(2).replace('.', ',')}`;
                          })()}
                        </span>

                        <div className="flex items-center gap-3 bg-sepia-100 rounded-lg px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-coffee-700 hover:text-coffee-900 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-coffee-900 text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-coffee-700 hover:text-coffee-900"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-sepia-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-montserrat text-coffee-700 font-medium">Total do Pedido</span>
                  <div className="text-right">
                    <span className="font-playfair text-2xl font-bold text-coffee-800 block">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                    {hasConsultationItems && (
                      <span className="text-[10px] text-coffee-600 font-montserrat uppercase tracking-wide">
                        + Itens sob consulta
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    onClose();
                    onFinalize();
                  }}
                  className="w-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-coffee-900 py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Finalizar Compra</span>
                  <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};