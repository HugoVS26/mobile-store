import { get } from './client';
import type { Mobile, MobileDetail } from './types';

export function getMobiles(search?: string): Promise<Mobile[]> {
  const params = search ? { search } : undefined;
  return get<Mobile[]>('/mobiles', params);
}

export function getMobileById(id: string): Promise<MobileDetail> {
  return get<MobileDetail>(`/mobiles/${id}`);
}
