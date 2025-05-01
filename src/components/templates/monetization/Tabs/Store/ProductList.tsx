'use client';

import ProductCard from './ProductCard';
import type { Product } from '@/interfaces';

interface ProductsListProps {
  products: Product[];
  onProductUpdate: (productId: string) => void;
}

export const ProductsList = ({ products, onProductUpdate }: ProductsListProps) => {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onProductUpdate={() => onProductUpdate(product?._id || '')} />
      ))}
    </div>
  );
};
