import { MenuItem } from './types';

// Helper to generate food images
const getImg = (id: number, width = 600, height = 400, keywords = 'food') => `https://picsum.photos/seed/${id}/${width}/${height}`;

export const BRAND = {
  logoWhite: 'https://static.wixstatic.com/media/1f17f3_6faa2413073c48fdb79b6499a59c3ca1~mv2.png',
  logoBrown: 'https://static.wixstatic.com/media/1f17f3_6d4456f1fe314738a326eba7aa76e21c~mv2.png'
};

export const WHATSAPP_NUMBER = '5573999092463';

interface MenuStructure {
  snacks: MenuItem[];
  chapa: MenuItem[];
  specials: MenuItem[];
  drinks: MenuItem[];
  desserts: MenuItem[];
}

// Definição dos itens da MANHÃ (Conteúdo Atual)
const MORNING_ITEMS: MenuStructure = {
  snacks: [
    { id: 'm1', title: 'Esfirras abertas e fechadas La-Texas', price: 12.00, description: 'Sabor autêntico e massa leve.', image: 'https://static.wixstatic.com/media/1f17f3_0ca5c68e4ddb4b05af2c7d3fff2b9280~mv2.jpeg' },
    { id: 'm2', title: 'Coxinha de frango da Geovanya', price: 10.00, description: 'Recheio generoso com catupiry original.', image: 'https://static.wixstatic.com/media/1f17f3_8b518d78dfc64907bb80f543830a52d2~mv2.png' },
    { id: 'm3', title: 'Misto egg', price: 12.00, description: 'Pão, presunto, queijo e ovo na chapa.', image: 'https://static.wixstatic.com/media/1f17f3_d68b3474b1f141ce815af8da8be6fab2~mv2.png' },
    { id: 'm4', title: 'Misto tradicional', price: 10.00, description: 'Clássico pão com presunto e queijo.', image: 'https://static.wixstatic.com/media/1f17f3_49ef0e3906234c628f58bd1b9e3e6139~mv2.png' },
    { id: 'm5', title: 'Salgados diversos', price: 5.00, description: 'Variedade de sabores fritos na hora.', image: 'https://static.wixstatic.com/media/1f17f3_80cdf739268d402598e385175974919c~mv2.png' },
    { id: 'm6', title: 'Pão de queijo', price: 5.00, description: 'Mineiro tradicional, crocante e macio.', image: 'https://static.wixstatic.com/media/1f17f3_9dc7b053c6534f63af119213af47c83f~mv2.png' },
    { id: 'm7', title: 'Chimango', price: 5.00, description: 'Biscoito de goma tradicional do interior.', image: 'https://static.wixstatic.com/media/1f17f3_da67ecb5251e440c8fcf346a8b916fbc~mv2.png' },
    { id: 'cp1', title: 'Empadas tradicionais', price: 12.00, image: 'https://static.wixstatic.com/media/1f17f3_8ed485a5d4bd4ad39b087a0f73251f1c~mv2.png' },
    { id: 'cp1_cam', title: 'Empada de Camarão', price: 14.00, image: 'https://static.wixstatic.com/media/1f17f3_a81e6e0e01ad458c9a8983e6148f0107~mv2.webp' },
    { id: 'cp2', title: 'Mini-pizza', price: 12.00, image: 'https://static.wixstatic.com/media/1f17f3_37c33370af994781a907e77391bfc3ba~mv2.png' },
    { id: 'cp3', title: 'Pastel assado', price: 6.00, image: 'https://static.wixstatic.com/media/1f17f3_53b72d3dd0ca4c51a6019eecbe178656~mv2.png' },
    { id: 'cp4', title: 'Torta de pão', price: 18.00, image: 'https://static.wixstatic.com/media/1f17f3_599f4735648c40ae80fceacf4ad765eb~mv2.png' },
    { id: 'cp5', title: 'Sanduíche natural', price: 12.00, image: 'https://static.wixstatic.com/media/1f17f3_1084e3baf12543439117b79749c30d04~mv2.jpg' },
  ],
  chapa: [
    { id: 'c1', title: 'Pão na chapa com ovo e queijo', price: 7.00, image: 'https://static.wixstatic.com/media/1f17f3_2b097854aa8848f399afef1cfd12cd07~mv2.png' },
    { id: 'c2', title: 'Pão na chapa com ovo', price: 5.00, image: 'https://static.wixstatic.com/media/1f17f3_d6c53a0951054a53b67670ebede4c62b~mv2.png' },
    { id: 'c3', title: 'Pão na chapa amanteigado', price: 3.00, image: 'https://static.wixstatic.com/media/1f17f3_a55a75aa9ba74b3a8757828733e9f5ba~mv2.png' },
    { id: 'c4', title: 'Pão na chapa com queijo', price: 5.00, image: 'https://static.wixstatic.com/media/1f17f3_f76bb9abd4214afb8441ada80f4d8f89~mv2.png' },
    { id: 'c5', title: 'Pão com queijo, bacon e carne seca', price: 15.00, description: 'Especialidade da casa.', featured: true, image: 'https://static.wixstatic.com/media/1f17f3_2db457ebd48241ef818e34422f3575bb~mv2.png' },
  ],
  specials: [
    { id: 's1', title: 'Fatia de quiche', price: 20.00, description: 'Massa brisée leve com recheios variados e cremosos.', image: 'https://static.wixstatic.com/media/1f17f3_63b33c35e6494add825751afa98a7a9c~mv2.png' },
    { id: 's2', title: 'Quiche individual', price: 18.00, description: 'Versão individual perfeita para um almoço leve.', image: 'https://static.wixstatic.com/media/1f17f3_fe767a68529f4dc0920e215d98b539e3~mv2.png' },
    { id: 's3', title: 'Cuscuz tradicional', price: 20.00, description: 'Carne seca, queijo e banana', image: 'https://static.wixstatic.com/media/1f17f3_efd4f42cc2bd4577af112b9d0ee5942c~mv2.jpg' },
    { id: 's4', title: 'Cuscuz up', price: 23.00, description: 'Bacon, carne seca, queijo, banana e requeijão cremoso', featured: true, image: 'https://static.wixstatic.com/media/1f17f3_05ead5b7b59644bfad076568e57dca6b~mv2.png' },
  ],
  drinks: [
    { id: 'd10', title: 'Café tradicional', price: 'Sob consulta', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=600&q=80' },
    { id: 'd11', title: 'Café expresso', price: 'Sob consulta', image: 'https://static.wixstatic.com/media/1f17f3_95cbe27514594c26a1b0f54e1b3bf30d~mv2.png' },
    { id: 'd12', title: 'Café duplo', price: 'Sob consulta', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
    { id: 'd13', title: 'Café com leite', price: 'Sob consulta', image: 'https://static.wixstatic.com/media/1f17f3_b8c255e46dfe40d3b3e3999cb471b2bf~mv2.png' },
    { id: 'd14', title: 'Cappuccino', price: 'Sob consulta', image: 'https://static.wixstatic.com/media/1f17f3_dce669935f8b4a5682d86dfa00b7a005~mv2.png' },
    { id: 'd1', title: 'Sucos de polpa', price: 8.00, description: 'Maracujá, manga, acerola, abacaxi, goiaba, cupuaçu, graviola.', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80&fm=webp' },
    { id: 'd2', title: 'Vitamina', price: 10.00, description: 'Cremosa e nutritiva.', image: 'https://static.wixstatic.com/media/1f17f3_c199c5360c0e4c2bb6f740a857c04c4a~mv2.png' },
    { id: 'd3', title: 'Suco de laranja (300ml)', price: 12.00, description: 'Natural da fruta.', image: 'https://static.wixstatic.com/media/1f17f3_6053fd7f869f45e1a02fd400851bb31c~mv2.png' },
    { id: 'd4', title: 'Suco de laranja (500ml)', price: 18.00, description: 'Jarra para compartilhar.', image: 'https://static.wixstatic.com/media/1f17f3_6053fd7f869f45e1a02fd400851bb31c~mv2.png' },
    { id: 'd5', title: 'Refrigerante lata', price: 6.00, description: 'Coca-Cola, Guaraná, Schweppes.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80&fm=webp' },
    { id: 'd9', title: 'H2O', price: 8.00, image: 'https://static.wixstatic.com/media/1f17f3_650d5cd08fa34d5c80e96d9deb106f54~mv2.jpg' },
    { id: 'd6', title: 'Coca-Cola 600ml', price: 8.00, image: 'https://static.wixstatic.com/media/1f17f3_bddf034920944e0692ffbc7610b3bb9a~mv2.png' },
    { id: 'd7', title: 'Refrigerante 1L', price: 10.00, description: 'Coca-Cola ou Guaraná.', image: 'https://static.wixstatic.com/media/1f17f3_bddf034920944e0692ffbc7610b3bb9a~mv2.png' },
    { id: 'd8', title: 'Energético (Monster / Red Bull)', price: 15.00, image: 'https://static.wixstatic.com/media/1f17f3_f0c8d91aa52e4b2d85aed0c703ce455b~mv2.png' },
  ],
  desserts: [
    { id: 'ds4', title: 'Fatia de Brownie', price: 20.00, description: 'Chocolate nobre meio amargo com textura molhadinha.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80&fm=webp' },
    { id: 'ds1', title: 'Fatia de pudim', price: 10.00, description: 'Textura lisinha e sabor inigualável.', image: 'https://static.wixstatic.com/media/1f17f3_6d8fbf483983455599645354698a6437~mv2.png' },
    { id: 'ds2', title: 'Cheesecake', price: 20.00, description: 'Consulte a disponibilidade de sabores.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80&fm=webp' },
    { id: 'ds3', title: 'Fatia de torta', price: 20.00, description: 'Consulte a disponibilidade de sabores.', image: 'https://static.wixstatic.com/media/1f17f3_460effa3f6864413a1a4f577fa20217a~mv2.jpg' },
    { id: 'cp6', title: 'Salada de frutas 300ml', price: 10.00, image: 'https://static.wixstatic.com/media/1f17f3_5401ac7e92c44ec5a52d39d8b2a1ca2c~mv2.png', description: 'Mix de frutas frescas da estação.' },
    { id: 'cp7', title: 'Salada de frutas 400ml', price: 13.00, image: 'https://static.wixstatic.com/media/1f17f3_5401ac7e92c44ec5a52d39d8b2a1ca2c~mv2.png', description: 'Porção generosa de frutas selecionadas.' },
  ]
};

// Definição dos itens da NOITE
const NIGHT_ITEMS: MenuStructure = {
  // Reproduz os Lanches/Salgados da manhã
  snacks: MORNING_ITEMS.snacks,

  // Remove "Diretos da chapa"
  chapa: [],

  // Destaques Artesanais
  specials: [
    { 
      id: 'n_s1', 
      title: 'Cremato de Camarão (2 Pessoas)', 
      price: 110.00, 
      description: 'Cumbuca de barro com 500ml de camarão refogado ao molho. Acompanha porção de arroz e farofa de manteiga e tomate.', 
      image: 'https://static.wixstatic.com/media/1f17f3_1a520a529c2845bc8eaf9f423fa3851f~mv2.png',
      featured: true 
    },
    { 
      id: 'n_s2', 
      title: 'Cremato de Camarão (4 Pessoas)', 
      price: 220.00, 
      description: 'Cumbuca de barro com 1000ml de camarão refogado ao molho. Acompanha porção de arroz e farofa de manteiga e tomate.', 
      image: 'https://static.wixstatic.com/media/1f17f3_1a520a529c2845bc8eaf9f423fa3851f~mv2.png',
      featured: true 
    },
    { 
      id: 'n_f2', 
      title: 'Fettuccine de Camarão', 
      price: 37.00, 
      image: 'https://static.wixstatic.com/media/1f17f3_8557b030e5ad4cdea5b0389c35326ec2~mv2.jpg',
      featured: true 
    },
    { 
      id: 'n_f1', 
      title: 'Fettuccine de carne moída', 
      price: 32.00, 
      image: 'https://static.wixstatic.com/media/1f17f3_cd2382ede914465d9d72dce06630fe77~mv2.jpeg',
      featured: true 
    },
    // Adiciona as Quiches (Fatia e Individual) da manhã
    ...MORNING_ITEMS.specials.filter(item => ['s1', 's2'].includes(item.id))
  ],

  // Filtra as bebidas: Mantém sucos e refris, remove cafés e cappuccinos
  drinks: MORNING_ITEMS.drinks.filter(item => 
    !['d10', 'd11', 'd12', 'd13', 'd14'].includes(item.id)
  ),

  // Reproduz as Sobremesas da manhã
  desserts: MORNING_ITEMS.desserts
};

// Objeto Principal de Dados
export const MENU_DATA: { [key in 'morning' | 'night']: MenuStructure } = {
  morning: MORNING_ITEMS,
  night: NIGHT_ITEMS
};

// Configuração de Textos para cada Período
export const PERIOD_CONFIG = {
  morning: {
    heroTitle: 'Cardápio da Manhã e Tarde',
    heroSubtitle: 'Uma experiência rústica e gourmet'
  },
  night: {
    heroTitle: 'Cardápio da Noite',
    heroSubtitle: 'Sabores especiais para seu jantar'
  }
};

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: 'https://www.instagram.com/saboresdointerior_mn/',
  facebook: '#'
};
