import React, { useState } from 'react';
import { ProductType } from './AnimatedProductIcon';
import { ProductTab } from './ProductTab';
import { ProductPanel } from './ProductPanel';

export const PRODUCTS: { id: ProductType; label: string }[] = [
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'callie', label: 'Callie' },
  { id: 'notetaker', label: 'Notetaker' },
  { id: 'payments', label: 'Payments' },
];

interface ProductSwitcherProps {
  initialProduct?: ProductType;
}

export const ProductSwitcher: React.FC<ProductSwitcherProps> = ({
  initialProduct = 'scheduling',
}) => {
  const [activeProduct, setActiveProduct] = useState<ProductType>(initialProduct);

  const handleTabChange = (product: ProductType) => {
    if (product !== activeProduct) {
      setActiveProduct(product);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* =================================================================== */}
      {/* 1. CIRCULAR PRODUCT TAB SELECTOR (Top / Center)                     */}
      {/* =================================================================== */}
      <div className="relative mb-6 sm:mb-8 md:mb-10 z-30">
        <div
          role="tablist"
          aria-label="Calendly Product Solutions"
          className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 py-2"
        >
          {PRODUCTS.map((prod) => (
            <ProductTab
              key={prod.id}
              id={prod.id}
              label={prod.label}
              isActive={activeProduct === prod.id}
              onClick={() => handleTabChange(prod.id)}
              controlsId={`panel-${prod.id}`}
            />
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. ACTIVE PRODUCT CONTENT PANEL                                     */}
      {/* =================================================================== */}
      <div className="w-full relative z-20">
        <ProductPanel
          activeProduct={activeProduct}
          id={`panel-${activeProduct}`}
        />
      </div>
    </div>
  );
};
