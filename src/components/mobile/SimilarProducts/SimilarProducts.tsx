import { useRef, useEffect, type JSX } from 'react';
import type { Mobile } from '@/api/types';
import MobileCard from '@/components/mobile/MobileCard/MobileCard';
import './SimilarProducts.css';

interface SimilarProductsProps {
  products: Mobile[];
}

export function SimilarProducts({ products }: SimilarProductsProps): JSX.Element {
  const listRef = useRef<HTMLUListElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const scrollbar = scrollbarRef.current;
    const spacer = spacerRef.current;
    if (!list || !scrollbar || !spacer) {
      return;
    }

    spacer.style.width = `${list.scrollWidth}px`;

    const onScroll = (): void => {
      list.style.transform = `translateX(-${scrollbar.scrollLeft}px)`;
    };

    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (event: MouseEvent): void => {
      event.preventDefault();
      isDragging = true;
      hasDragged = false;
      startX = event.pageX;
      scrollStart = scrollbar.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent): void => {
      if (!isDragging) {
        return;
      }
      hasDragged = true;
      scrollbar.scrollLeft = scrollStart - (e.pageX - startX);
    };

    const onMouseUp = (): void => {
      isDragging = false;
    };

    const onClick = (event: MouseEvent): void => {
      if (hasDragged) {
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent): void => {
      isDragging = true;
      hasDragged = false;
      startX = event.touches[0].pageX;
      scrollStart = scrollbar.scrollLeft;
    };

    const onTouchMove = (event: TouchEvent): void => {
      if (!isDragging) {
        return;
      }
      hasDragged = true;
      scrollbar.scrollLeft = scrollStart - (event.touches[0].pageX - startX);
    };

    const onTouchEnd = (): void => {
      isDragging = false;
    };

    scrollbar.addEventListener('scroll', onScroll);
    list.addEventListener('mousedown', onMouseDown);
    list.addEventListener('click', onClick, true);
    list.addEventListener('touchstart', onTouchStart, { passive: true });
    list.addEventListener('touchmove', onTouchMove, { passive: true });
    list.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return (): void => {
      scrollbar.removeEventListener('scroll', onScroll);
      list.removeEventListener('mousedown', onMouseDown);
      list.removeEventListener('click', onClick, true);
      list.removeEventListener('touchstart', onTouchStart);
      list.removeEventListener('touchmove', onTouchMove);
      list.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [products]);

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">SIMILAR ITEMS</h2>
      <ul ref={listRef} className="similar-products__list">
        {products
          .filter((p, i, arr) => arr.findIndex((other) => other.id === p.id) === i)
          .map((product) => (
            <li key={product.id} className="similar-products__item">
              <MobileCard mobile={product} />
            </li>
          ))}
      </ul>
      <div ref={scrollbarRef} className="similar-products__scrollbar">
        <div ref={spacerRef} className="similar-products__spacer" />
      </div>
    </section>
  );
}
