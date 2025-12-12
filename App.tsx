import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { SectionTitle } from './components/SectionTitle';
import { MenuCard } from './components/MenuCard';
import { SpecialCard } from './components/SpecialCard';
import { DrinkCard } from './components/DrinkCard';
import { Footer } from './components/Footer';
import { StickyNavbar } from './components/StickyNavbar';
import { ParallaxSection } from './components/ParallaxSection';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { FloatingNav } from './components/FloatingNav';
import { CartSidebar } from './components/CartSidebar';
import { NameModal } from './components/NameModal';
import { Toast } from './components/Toast';
import { MENU_DATA, PERIOD_CONFIG, WHATSAPP_NUMBER } from './constants';
import { CartItem, MenuItem, MenuPeriod } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from './components/OptimizedImage';
import { Plus } from 'lucide-react';
import { 
  MenuCardSkeleton, 
  ChapaCardSkeleton, 
  SpecialCardSkeleton, 
  DrinkCardSkeleton, 
  DessertCardSkeleton 
} from './components/Skeletons';

type AppMode = 'landing' | 'view' | 'delivery';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('landing');
  const [period, setPeriod] = useState<MenuPeriod>('morning');
  const [loading, setLoading] = useState(true);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching delay when mode changes (makes it feel like loading new menu)
    if (mode !== 'landing') {
        setLoading(true);
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [mode, period]);

  // Derived Data based on Period
  const menuItems = MENU_DATA[period];
  const periodConfig = PERIOD_CONFIG[period];

  // Cart Logic
  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMessage(`${item.title} adicionado!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleFinalizeOrder = (customerName: string) => {
    // Calculate total (numeric only)
    const total = cartItems.reduce((acc, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return isNaN(price) ? acc : acc + price * item.quantity;
    }, 0);

    const hasConsultationItems = cartItems.some(item => {
        const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        return isNaN(price);
    });

    const periodLabel = period === 'morning' ? 'Manhã/Tarde' : 'Noite';

    let message = `*NOVO PEDIDO (${periodLabel}) - VIA SITE*\n\n`;
    message += `*Cliente:* ${customerName}\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    cartItems.forEach(item => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      
      if (isNaN(price)) {
         message += `• ${item.quantity}x ${item.title} - ${item.price}\n`;
      } else {
         message += `• ${item.quantity}x ${item.title} - R$ ${(price * item.quantity).toFixed(2)}\n`;
      }
    });

    message += `\n*Total estimado:* R$ ${total.toFixed(2)}`;
    if (hasConsultationItems) {
        message += ` + Itens sob consulta`;
    }
    message += `\n`;

    message += `\n--------------------------------\n`;
    message += `Aguardo confirmação!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setIsNameModalOpen(false);
    setIsCartOpen(false);
    setCartItems([]);
    setToastMessage("Pedido enviado para o WhatsApp!");
  };

  const isDelivery = mode === 'delivery';

  // Calculate total items for badge
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // --- SECTIONS DEFINITION ---

  // Snacks Section
  const renderSnacks = menuItems.snacks && menuItems.snacks.length > 0 && (
    <section id="section-snacks" className="py-24 container mx-auto px-6 lg:px-24">
        <SectionTitle 
        title={period === 'morning' ? "Lanches e clássicos" : "Entradas e Petiscos"} 
        subtitle={period === 'morning' ? "Sabores autênticos para o seu dia" : "Para começar a noite bem"} 
        />
        <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-5xl mx-auto"
        >
        {loading 
            ? Array(6).fill(0).map((_, i) => <MenuCardSkeleton key={i} />)
            : menuItems.snacks.map((item, index) => (
                <MenuCard 
                key={item.id} 
                item={item} 
                index={index} 
                onAdd={isDelivery ? addToCart : undefined}
                />
            ))
        }
        </motion.div>
    </section>
  );

  // Chapa Section
  const renderChapa = menuItems.chapa && menuItems.chapa.length > 0 && (
    <section id="section-chapa" className="py-24 bg-sepia-100 border-y border-sepia-200 relative">
        <div className="container mx-auto px-6 lg:px-24">
        <SectionTitle 
            title={period === 'morning' ? "Direto da chapa" : "Pratos Principais"} 
            subtitle={period === 'morning' ? "Crocantes, quentes e feitos na hora" : "Sabor e sofisticação"} 
            // In Night mode, if we ever have chapa, it might be main dishes
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-5xl mx-auto">
            {loading
            ? Array(4).fill(0).map((_, i) => <ChapaCardSkeleton key={i} />)
            : menuItems.chapa.map((item, index) => (
                <MenuCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    onAdd={isDelivery ? addToCart : undefined}
                />
            ))
            }
        </div>
        </div>
    </section>
  );

  // Specials Section
  const renderSpecials = menuItems.specials && menuItems.specials.length > 0 && (
    <ParallaxSection 
        id="section-specials"
        backgroundImage="https://static.wixstatic.com/media/1f17f3_a5244a224cde47f284bd1bfc60e92e83~mv2.jpeg"
        overlayOpacity={0.85}
    >
        <SectionTitle 
            title="Destaques artesanais" 
            subtitle="Receitas exclusivas feitas com carinho" 
            light={true}
        />
        <motion.div className="mt-16">
            {loading
            ? Array(2).fill(0).map((_, i) => <SpecialCardSkeleton key={i} reversed={i % 2 !== 0} />)
            : menuItems.specials.map((item, index) => (
                <SpecialCard 
                    key={item.id} 
                    item={item} 
                    reversed={index % 2 !== 0}
                    onAdd={isDelivery ? addToCart : undefined}
                />
                ))
            }
        </motion.div>
    </ParallaxSection>
  );

  // Desserts Section
  const renderDesserts = menuItems.desserts && menuItems.desserts.length > 0 && (
    <ParallaxSection
        id="section-desserts"
        backgroundImage="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=70&w=1600&fm=webp"
        overlayOpacity={0.80}
    >
        <SectionTitle 
        title="Confeitaria" 
        subtitle="Finalize com doçura e elegância" 
        light={true}
        />
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {loading
            ? Array(3).fill(0).map((_, i) => <DessertCardSkeleton key={i} />)
            : menuItems.desserts.map((item, i) => (
                <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                >
                <OptimizedImage 
                    src={item.image || ''} 
                    alt={item.title} 
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-transparent to-transparent opacity-80 z-20"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center text-center z-30">
                    <h3 className="text-3xl font-playfair font-bold text-white mb-2 drop-shadow-md">{item.title}</h3>
                    
                    <span className="font-playfair font-bold text-gold-400 text-2xl mb-4 block">
                    {typeof item.price === 'number' 
                        ? `R$ ${item.price.toFixed(2).replace('.', ',')}` 
                        : item.price}
                    </span>

                    <div className="w-8 h-0.5 bg-gold-500 mb-4 opacity-70 group-hover:w-16 transition-all duration-500"></div>
                    <p className="text-gray-200 font-montserrat text-sm mb-6 max-w-xs opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.description}
                    </p>

                    {/* Add Button for Dessert */}
                    {isDelivery && (
                    <button 
                        onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        }}
                        className="bg-gold-500 text-coffee-900 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg mt-2"
                    >
                        <Plus size={24} />
                    </button>
                    )}
                </div>
                </motion.div>
            ))
        }
        </motion.div>
    </ParallaxSection>
  );

  // Drinks Section
  const renderDrinks = menuItems.drinks && menuItems.drinks.length > 0 && (
    <section id="section-drinks" className="py-28 bg-coffee-900 text-white relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
        
        <div className="container mx-auto px-6 lg:px-12 mb-12 relative z-10">
        <SectionTitle 
            title="Bebidas" 
            subtitle="Sucos naturais e seleções refrescantes" 
            light
        />
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12"
        >
            {loading
                ? Array(6).fill(0).map((_, i) => <DrinkCardSkeleton key={i} />)
                : menuItems.drinks.map((item, index) => (
                    <DrinkCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    onAdd={isDelivery ? addToCart : undefined}
                    />
                ))
            }
        </motion.div>
        </div>
    </section>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <LandingPage 
              onSelectMode={(selectedMode, selectedPeriod) => {
                  setPeriod(selectedPeriod);
                  setMode(selectedMode);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className={`min-h-screen flex flex-col overflow-x-hidden bg-sepia-100 font-montserrat pb-32 ${mode === 'landing' ? 'hidden' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mode !== 'landing' ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <StickyNavbar onBack={() => {
            setMode('landing');
            setCartItems([]); // Optional: clear cart on exit? Maybe better to keep it.
        }} />
        
        <Hero title={periodConfig.heroTitle} subtitle={periodConfig.heroSubtitle} />
        
        <main className="flex-grow">
          
          {/* 
            REORDER LOGIC:
            Morning: Snacks -> Chapa -> Specials -> Desserts -> Drinks
            Night: Specials (Destaques) -> Snacks (Entradas) -> (Chapa is empty) -> Desserts -> Drinks
          */}

          {period === 'morning' ? (
            <>
              {renderSnacks}
              {renderChapa}
              {renderSpecials}
            </>
          ) : (
            <>
              {renderSpecials}
              {renderSnacks}
              {renderChapa}
            </>
          )}

          {renderDesserts}
          {renderDrinks}

        </main>

        <Footer />
        <BottomNav />
        
        {/* Components available only in Delivery Mode */}
        {isDelivery && (
          <>
            <FloatingNav 
              onAction={() => setIsCartOpen(true)} 
              count={totalItemsInCart}
            />
            <CartSidebar 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onFinalize={() => setIsNameModalOpen(true)}
            />
            <NameModal 
              isOpen={isNameModalOpen}
              onClose={() => setIsNameModalOpen(false)}
              onConfirm={handleFinalizeOrder}
            />
            <Toast 
              message={toastMessage} 
              onClose={() => setToastMessage(null)} 
            />
          </>
        )}
      </motion.div>
    </>
  );
};

export default App;