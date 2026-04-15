export interface Mobile {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface MobileSpecs {
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

export interface MobileDetail extends Omit<Mobile, 'imageUrl'> {
  description: string;
  rating: number;
  specs: MobileSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: Mobile[];
}
