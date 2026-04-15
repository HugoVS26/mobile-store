export interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ProductDetail extends Product {
  description: string;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: Product[];
}
