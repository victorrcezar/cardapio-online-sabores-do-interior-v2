export interface MenuItem {
  id: string;
  title: string;
  description?: string;
  price: number | string;
  image?: string;
  featured?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum SectionType {
  GRID = 'GRID',
  LIST = 'LIST',
  CAROUSEL = 'CAROUSEL',
  SPECIAL = 'SPECIAL'
}

export type MenuPeriod = 'morning' | 'night';
