import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('Given useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('When called with an initial value', () => {
    it('Should return the initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('hello'));

      expect(result.current).toBe('hello');
    });
  });

  describe('When the value changes', () => {
    it('Should not update before the delay elapses', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'hello' },
      });

      rerender({ value: 'world' });

      act(() => {
        vi.advanceTimersByTime(299);
      });

      expect(result.current).toBe('hello');
    });

    it('Should update after the delay elapses', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'hello' },
      });

      rerender({ value: 'world' });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('world');
    });

    it('Should reset the timer on rapid changes', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'a' },
      });

      rerender({ value: 'b' });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'c' });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'd' });
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('d');
    });
  });
});
