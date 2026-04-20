import { useState } from 'react';
import type { JSX } from 'react';
import type { MobileDetail as MobileDetailType, ColorOption, StorageOption } from '@/api/types';
import { ColorSelector } from '@/components/mobile/ColorSelector/ColorSelector';
import { StorageSelector } from '@/components/mobile/StorageSelector/StorageSelector';
import { SpecsTable } from '@/components/mobile/SpecsTable/SpecsTable';
import { SimilarProducts } from '@/components/mobile/SimilarProducts/SimilarProducts';
import { useCart } from '@/hooks/useCart';
import './MobileDetail.css';

interface MobileDetailProps {
  mobile: MobileDetailType;
  initialImageUrl?: string;
}

export function MobileDetail({ mobile, initialImageUrl }: MobileDetailProps): JSX.Element {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
    () => mobile.colorOptions.find((color) => color.imageUrl === initialImageUrl) ?? null,
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

  const { addItem } = useCart();
  const currentImage = selectedColor?.imageUrl ?? mobile.colorOptions[0]?.imageUrl ?? '';
  const currentPrice = selectedStorage?.price ?? mobile.basePrice;
  const canAddToCart = selectedColor !== null && selectedStorage !== null;

  function handleAddToCart(): void {
    if (!selectedColor || !selectedStorage) {
      return;
    }
    addItem({
      id: mobile.id,
      name: mobile.name,
      brand: mobile.brand,
      imageUrl: selectedColor.imageUrl,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
      price: selectedStorage.price,
    });
  }

  return (
    <main className="mobile-detail">
      <div className="mobile-detail__hero">
        <div className="mobile-detail__image-wrapper">
          <img
            src={currentImage}
            alt={`${mobile.brand} ${mobile.name}`}
            className="mobile-detail__image"
          />
        </div>

        <div className="mobile-detail__info">
          <div className="mobile-detail__header">
            <h1 className="mobile-detail__name">{mobile.name}</h1>
            <p className="mobile-detail__price">From {currentPrice} EUR</p>
          </div>

          <div className="mobile-detail__selectors">
            <StorageSelector
              options={mobile.storageOptions}
              selected={selectedStorage}
              onChange={setSelectedStorage}
            />
            <ColorSelector
              options={mobile.colorOptions}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          </div>

          <button
            className="mobile-detail__add-to-cart"
            aria-label="Add to cart"
            disabled={!canAddToCart}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <section className="mobile-detail__specs">
        <h2 className="mobile-detail__specs-title">SPECIFICATIONS</h2>
        <SpecsTable
          specs={{
            brand: mobile.brand,
            name: mobile.name,
            description: mobile.description,
            ...mobile.specs,
          }}
        />
      </section>

      <section className="mobile-detail__similar-products">
        {mobile.similarProducts.length > 0 && <SimilarProducts products={mobile.similarProducts} />}
      </section>
    </main>
  );
}
