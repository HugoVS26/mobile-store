import { renderHook, waitFor } from '@testing-library/react';
import { mockedMobiles } from '@/test/mocks/mobiles';
import * as endpoints from '@/api/endpoints';
import { useMobiles } from './useMobiles';

describe('Given useMobiles hook', () => {
  describe('When called without a search term', () => {
    it('Should start in a loading state', () => {
      const { result } = renderHook(() => useMobiles());

      expect(result.current.loading).toBe(true);
      expect(result.current.mobiles).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('Should return all mobiles after loading', async () => {
      const { result } = renderHook(() => useMobiles());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.mobiles).toEqual(mockedMobiles);
      expect(result.current.error).toBeNull();
    });
  });

  describe('When called with a search term', () => {
    it('Should return filtered mobiles matching the search', async () => {
      const { result } = renderHook(() => useMobiles('samsung'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.mobiles.every((m) => m.brand === 'Samsung')).toBe(true);
    });
  });

  describe('When the API returns an error', () => {
    it('Should set the error state', async () => {
      const spy = vi
        .spyOn(endpoints, 'getMobiles')
        .mockRejectedValue(new Error('HTTP 500: Internal Server Error'));

      const { result } = renderHook(() => useMobiles());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toMatch(/HTTP 500/);
      expect(result.current.mobiles).toEqual([]);

      spy.mockRestore();
    });
  });
});
