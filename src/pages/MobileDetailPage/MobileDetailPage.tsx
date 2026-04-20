import type { JSX } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMobileDetail } from '@/hooks/useMobileDetail';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { BackLink } from '@/components/ui/BackLink/BackLink';
import { MobileDetail } from '@/components/mobile/MobileDetail/MobileDetail';
import './MobileDetailPage.css';

function MobileDetailPage(): JSX.Element {
  const { id = '' } = useParams<{ id: string }>();
  const { state } = useLocation();
  const initialImageUrl: string | undefined = (state as { imageUrl?: string } | null)?.imageUrl;
  const { mobile, loading, error } = useMobileDetail(id);

  return (
    <>
      <Navbar />
      <div className="mobile-detail-page__back">
        <BackLink />
      </div>
      <main className="mobile-detail-page">
        {loading && <span className="mobile-detail-page__status">Loading...</span>}
        {error && <span className="mobile-detail-page__status">{error}</span>}
        {mobile && <MobileDetail mobile={mobile} initialImageUrl={initialImageUrl} />}
      </main>
    </>
  );
}

export default MobileDetailPage;
