'use client';
import type { Product } from '@/interfaces/index';
import ProductCard from './ProductCard';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={{product }} />
      ))}
    </div>
  );
};
