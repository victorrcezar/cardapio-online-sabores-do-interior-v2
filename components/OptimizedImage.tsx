import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number; // Largura desejada para otimização
}

// Função utilitária para reescrever URLs e forçar compressão
const getOptimizedUrl = (url: string, width: number, quality: number = 60): string => {
  if (!url) return '';

  // Otimização para Wix Images
  if (url.includes('static.wixstatic.com')) {
    // Se já tiver query params ou otimização, tenta limpar ou adicionar
    // A estratégia padrão do Wix é adicionar /v1/fit/w_X,h_Y,q_Z/file.webp no final
    // Mas precisamos ter cuidado para não duplicar se a URL já estiver otimizada manualmente
    if (url.includes('/v1/')) return url;
    
    // Wix Static URL pattern: https://static.wixstatic.com/media/{id}~mv2.jpg
    // Append transformation
    return `${url}/v1/fit/w_${width},h_${width},q_${quality}/file.webp`;
  }

  // Otimização para Unsplash
  if (url.includes('images.unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    // Remove params existentes que conflitam se necessário, mas adicionar no fim costuma sobrescrever
    return `${url}${separator}w=${width}&q=${quality}&fm=webp&auto=format`;
  }

  return url;
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  width = 600, // Default width para cards
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize a URL otimizada para evitar recálculos
  const optimizedSrc = useMemo(() => {
    return getOptimizedUrl(src, priority ? 1200 : width); 
  }, [src, width, priority]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '300px', // Aumentado para 300px: começa a carregar BEM antes de chegar na tela
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-sepia-200 ${className}`}>
      {/* Placeholder / Skeleton Loading */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-sepia-200 animate-pulse z-10" 
          />
        )}
      </AnimatePresence>
      
      {isInView && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full h-full object-cover ${props.className || ''}`}
          {...props}
        />
      )}
    </div>
  );
};