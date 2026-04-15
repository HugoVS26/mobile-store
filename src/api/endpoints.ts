import { get } from './client';
import type { Product, ProductDetail } from './types';

export function getProducts(search?: string): Promise<Product[]> {
  const params = search ? { search } : undefined;
  return get<Product[]>('/products', params);
}

export function getProductById(id: string): Promise<ProductDetail> {
  return get<ProductDetail>(`/products/${id}`);
}
