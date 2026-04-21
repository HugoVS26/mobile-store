import type { Mobile, MobileDetail } from '@/api/types';

export const mockedMobiles: Mobile[] = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl:
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
  },
  {
    id: 'SMG-A25',
    brand: 'Samsung',
    name: 'Galaxy A25 5G',
    basePrice: 239,
    imageUrl: 'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp',
  },
  {
    id: 'GPX-8A',
    brand: 'Google',
    name: 'Pixel 8a',
    basePrice: 459,
    imageUrl: 'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
  },
  {
    id: 'APL-I15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    basePrice: 1319,
    imageUrl:
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-negro.webp',
  },
];

export const mockedMobileDetail: MobileDetail = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  description:
    'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.',
  rating: 4.6,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: '3120 x 1440 pixels',
    processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core',
    mainCamera:
      '200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS',
    selfieCamera: '12 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz',
  },
  colorOptions: [
    {
      name: 'Titanium Violet',
      hexCode: '#8E6F96',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
    },
    {
      name: 'Titanium Black',
      hexCode: '#000000',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-black.webp',
    },
    {
      name: 'Titanium Gray',
      hexCode: '#808080',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-gray.webp',
    },
    {
      name: 'Titanium Yellow',
      hexCode: '#FFFF00',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-yellow.webp',
    },
  ],
  storageOptions: [
    {
      capacity: '256 GB',
      price: 1229,
    },
    {
      capacity: '512 GB',
      price: 1329,
    },
    {
      capacity: '1 TB',
      price: 1529,
    },
  ],
  similarProducts: [mockedMobiles[1], mockedMobiles[2]],
};
