import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, GlassWater, CakeSlice } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('section-snacks');

  // Reordered to match page layout: Snacks -> Desserts -> Drinks
  const navItems = [
    { id: 'section-snacks', label: 'Lanches', icon: Coffee },
    { id: 'section-desserts', label: 'Doces', icon: CakeSlice },
    { id: 'section-drinks', label: 'Bebidas', icon: GlassWater },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Simple logic to highlight icon based on scroll position
      const scrollPosition = window.scrollY + 300; // Offset

      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-coffee-900/95 backdrop-blur-md border-t border-gold-500/30 pb-6 md:pb-4 pt-3 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center max-w-xs mx-auto h-12">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-300 ${
                isActive ? 'text-gold-500' : 'text-sepia-200/40 hover:text-sepia-200/70'
              }`}
            >
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
              </motion.div>
              <span className={`text-[10px] font-montserrat uppercase tracking-wider mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-2 w-1 h-1 bg-gold-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};