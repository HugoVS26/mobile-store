import { renderHook, waitFor } from '@testing-library/react';
import { mockedMobileDetail } from '@/test/mocks/mobiles';
import * as endpoints from '@/api/endpoints';
import { useMobileDetail } from './useMobileDetail';

describe('Given useMobileDetail', () => {
  describe('When called with a valid id', () => {
    it('Should start in a loading state', () => {
      const { result } = renderHook(() => useMobileDetail('SMG-S24U'));

      expect(result.current.loading).toBe(true);
      expect(result.current.mobile).toBeNull();
      expect(result.current.error).toBeNull();
    });

    it('Should return the mobile detail after loading', async () => {
      const { result } = renderHook(() => useMobileDetail('SMG-S24U'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.mobile).toEqual(mockedMobileDetail);
      expect(result.current.error).toBeNull();
    });
  });

  describe('When called with an unknown id', () => {
    it('Should set the error state on 404', async () => {
      const { result } = renderHook(() => useMobileDetail('UNKNOWN'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toMatch(/HTTP 404/);
      expect(result.current.mobile).toBeNull();
    });
  });

  describe('When the API returns an error', () => {
    it('Should set the error state on 500', async () => {
      const spy = vi
        .spyOn(endpoints, 'getMobileById')
        .mockRejectedValue(new Error('HTTP 500: Internal Server Error'));

      const { result } = renderHook(() => useMobileDetail('SMG-S24U'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toMatch(/HTTP 500/);

      spy.mockRestore();
    });
  });
});
