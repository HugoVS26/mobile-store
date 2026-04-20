import { get } from './client';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

describe('Given the get() API client', () => {
  describe('When making a request', () => {
    it('Should attach the x-api-key header', async () => {
      const mockFetch = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

      await get('/products');

      const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect((init.headers as Record<string, string>)['x-api-key']).toBe(API_KEY);

      mockFetch.mockRestore();
    });

    it('Should build the correct URL with query params', async () => {
      const mockFetch = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

      await get('/products', { search: 'samsung' });

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`${BASE_URL}/products?search=samsung`);

      mockFetch.mockRestore();
    });

    it('Should skip empty param values', async () => {
      const mockFetch = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

      await get('/products', { search: '' });

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`${BASE_URL}/products`);

      mockFetch.mockRestore();
    });
  });

  describe('When the server returns an error', () => {
    it('Should throw with the HTTP status code', async () => {
      await expect(get('/products/unknown')).rejects.toThrow('HTTP 404');
    });
  });
});
