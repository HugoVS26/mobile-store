import { useReducer, useEffect } from 'react';
import { getMobileById } from '@/api/endpoints';
import type { MobileDetail } from '@/api/types';

interface UseMobileDetailState {
  mobile: MobileDetail | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'start' }
  | { type: 'success'; payload: MobileDetail }
  | { type: 'error'; payload: string };

function reducer(_state: UseMobileDetailState, action: Action): UseMobileDetailState {
  switch (action.type) {
    case 'start':
      return { mobile: null, loading: true, error: null };
    case 'success':
      return { mobile: action.payload, loading: false, error: null };
    case 'error':
      return { mobile: null, loading: false, error: action.payload };
  }
}

export function useMobileDetail(id: string): UseMobileDetailState {
  const [state, dispatch] = useReducer(reducer, { mobile: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'start' });

    getMobileById(id)
      .then((data) => {
        if (!cancelled) {
          dispatch({ type: 'success', payload: data });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          dispatch({
            type: 'error',
            payload: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      });

    return (): void => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
