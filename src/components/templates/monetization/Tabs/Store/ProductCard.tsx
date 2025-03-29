'use client';

import { useState } from 'react';
import { Minus, MinusIcon, Plus, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import image from '@/assets/image1.png';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="border rounded-lg p-4">
      
      <div className="w-full flex justify-center flex-col">
      <div className="relative mb-6 justify-center flex  h-48 w-full">
        <Image
          src={product.image || image}
          alt={product.name}
          width={280}
          height={280}
          priority
          sizes="100%"
          className="object-cover transition rounded-md duration-300 hover:opacity-90"
        />
      </div>
        <div className="ml-4 flex justify-between items-center flex-gow">
        <div>
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
              <button
                className="p-1 hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 border-x">{quantity}</span>
              <button
                className="p-1 hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
}


{/* <div className="flex items-center space-x-2">
              
<div className="flex items-center border rounded-md overflow-hidden">
  
  <button className="p-1 hover:bg-gray-100" onClick={decreaseQuantity}>
    
    <MinusIcon className="w-4 h-4" />
  </button>
  <span className="px-3 py-1 border-x">{quantity}</span>
  <button className="p-1 hover:bg-gray-100" onClick={increaseQuantity}>
    
    <PlusIcon className="w-4 h-4" />
  </button>
</div>
<button className="border border-gray-300 rounded-md px-4 py-1 text-sm hover:bg-gray-50 transition-colors">
  
  Edit
</button>
</div> */}