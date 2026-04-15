import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { get } from './client';

const TEST_API_BASE_URL = 'https://api.example.com';
const TEST_API_KEY = 'test-api-key';

const MOBILES_URL = `${TEST_API_BASE_URL}/mobiles`;
const MOBILE_BY_ID_URL = `${TEST_API_BASE_URL}/mobiles/:id`;

vi.stubEnv('VITE_API_BASE_URL', TEST_API_BASE_URL);
vi.stubEnv('VITE_API_KEY', TEST_API_KEY);

describe('Given the get() API client', () => {
  describe('When making a request', () => {
    it('Should attach the x-api-key header', async () => {
      let capturedKey: string | null = null;

      server.use(
        http.get(MOBILES_URL, ({ request }) => {
          capturedKey = request.headers.get('x-api-key');
          return HttpResponse.json([]);
        }),
      );

      await get('/mobiles');

      expect(capturedKey).toBe(TEST_API_KEY);
    });

    it('Should build the correct URL with query params', async () => {
      const SEARCH_QUERY = 'samsung';
      const EXPECTED_URL = `${MOBILES_URL}?search=${SEARCH_QUERY}`;
      let capturedUrl = '';

      server.use(
        http.get(MOBILES_URL, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json([]);
        }),
      );

      await get('/mobiles', { search: SEARCH_QUERY });

      expect(capturedUrl).toBe(EXPECTED_URL);
    });

    it('Should skip empty param values', async () => {
      let capturedUrl = '';

      server.use(
        http.get(MOBILES_URL, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json([]);
        }),
      );

      await get('/mobiles', { search: '' });

      expect(capturedUrl).toBe(MOBILES_URL);
    });
  });

  describe('When the server returns an error', () => {
    it('Should throw with the HTTP status code', async () => {
      server.use(
        http.get(MOBILE_BY_ID_URL, () => {
          return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
        }),
      );

      await expect(get('/mobiles/unknown')).rejects.toThrow('HTTP 404');
    });
  });
});
