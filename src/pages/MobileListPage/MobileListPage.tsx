import { useEffect, useReducer, useState } from 'react';
import type { JSX } from 'react';
import { getMobiles } from '@/api/endpoints';
import type { Mobile } from '@/api/types';
import MobileList from '@/components/mobile/MobileList/MobileList';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import './MobileListPage.css';

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; mobiles: Mobile[] };

type FetchAction = { type: 'fetch' } | { type: 'success'; mobiles: Mobile[] } | { type: 'error' };

function fetchReducer(_: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'fetch':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', mobiles: action.mobiles };
    case 'error':
      return { status: 'error', message: 'Failed to load products. Please try again.' };
  }
}

function MobileListPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [state, dispatch] = useReducer(fetchReducer, { status: 'loading' });

  useEffect(() => {
    dispatch({ type: 'fetch' });
    getMobiles(query || undefined)
      .then((data) => {
        const unique = data
          .filter(
            (currentMobile, i, arr) =>
              arr.findIndex((mobile) => mobile.id === currentMobile.id) === i,
          )
          .slice(0, 20);
        dispatch({ type: 'success', mobiles: unique });
      })
      .catch(() => dispatch({ type: 'error' }));
  }, [query]);

  if (state.status === 'error') {
    return (
      <>
        <Navbar />
        <span className="mobile-list-page__status">{state.message}</span>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mobile-list-page">
        <div className="mobile-list-page__search-wrapper">
          <SearchBar value={query} onChange={setQuery} />
          {state.status === 'success' && (
            <span className="mobile-list-page__count">
              {state.mobiles.length} {state.mobiles.length === 1 ? 'RESULT' : 'RESULTS'}
            </span>
          )}
        </div>
        {state.status === 'loading' ? (
          <span className="mobile-list-page__status">Loading...</span>
        ) : (
          <>
            <MobileList mobiles={state.mobiles} />
          </>
        )}
      </main>
    </>
  );
}

export default MobileListPage;
