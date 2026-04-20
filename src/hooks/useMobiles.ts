import { useReducer, useEffect } from 'react';
import { getMobiles } from '@/api/endpoints';
import type { Mobile } from '@/api/types';
import { useDebounce } from './useDebounce';

interface UseMobilesState {
  mobiles: Mobile[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'start' }
  | { type: 'success'; payload: Mobile[] }
  | { type: 'error'; payload: string };

function reducer(_state: UseMobilesState, action: Action): UseMobilesState {
  switch (action.type) {
    case 'start':
      return { mobiles: [], loading: true, error: null };
    case 'success':
      return { mobiles: action.payload, loading: false, error: null };
    case 'error':
      return { mobiles: [], loading: false, error: action.payload };
  }
}

export function useMobiles(search = ''): UseMobilesState {
  const debouncedSearch = useDebounce(search);
  const [state, dispatch] = useReducer(reducer, { mobiles: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'start' });

    getMobiles(debouncedSearch)
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
  }, [debouncedSearch]);

  return state;
}
