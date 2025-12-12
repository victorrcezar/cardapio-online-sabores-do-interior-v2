import React from 'react';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse ${className}`}></div>
);

export const MenuCardSkeleton = () => (
  <div className="flex items-baseline justify-between py-6 border-b border-sepia-200">
    <div className="flex-1 pr-12 space-y-3">
      <Shimmer className="h-6 w-48 bg-sepia-200 rounded" />
      <Shimmer className="h-4 w-64 bg-sepia-200/50 rounded" />
    </div>
    <div className="flex-shrink-0">
       <Shimmer className="h-6 w-16 bg-sepia-200 rounded" />
    </div>
  </div>
);

export const ChapaCardSkeleton = () => (
   <MenuCardSkeleton />
);

export const SpecialCardSkeleton: React.FC<{ reversed?: boolean }> = ({ reversed = false }) => (
  <div className={`flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''} bg-white rounded-none lg:rounded-2xl overflow-hidden shadow-xl mb-16 max-w-6xl mx-auto border border-gray-100`}>
    <div className="lg:w-7/12 h-72 lg:h-[450px]">
      <Shimmer className="w-full h-full bg-sepia-200" />
    </div>
    <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center bg-sepia-100 space-y-6">
      <Shimmer className="h-3 w-24 bg-gold-500/30 rounded" />
      <Shimmer className="h-8 w-3/4 bg-gray-300 rounded" />
      <div className="space-y-3">
        <Shimmer className="h-4 w-full bg-gray-200 rounded" />
        <Shimmer className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="space-y-2">
            <Shimmer className="h-2 w-10 bg-gray-300 rounded" />
            <Shimmer className="h-8 w-24 bg-gold-500/20 rounded" />
        </div>
        <Shimmer className="h-10 w-32 bg-gray-800 rounded opacity-20" />
      </div>
    </div>
  </div>
);

export const ComplementCardSkeleton = () => (
   <MenuCardSkeleton />
);

export const DrinkCardSkeleton = () => (
  <div className="flex items-start gap-4 p-4 border border-white/5 rounded-xl">
    <Shimmer className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-white/10 flex-shrink-0" />
    <div className="flex-1 space-y-3">
        <div className="flex justify-between">
            <Shimmer className="h-6 w-32 bg-white/10 rounded" />
            <Shimmer className="h-6 w-16 bg-white/10 rounded" />
        </div>
        <Shimmer className="h-4 w-full bg-white/5 rounded" />
        <div className="flex justify-end mt-2">
            <Shimmer className="h-6 w-20 bg-white/10 rounded" />
        </div>
    </div>
  </div>
);

export const DessertCardSkeleton = () => (
  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
    <Shimmer className="w-full h-full bg-gray-300" />
  </div>
);