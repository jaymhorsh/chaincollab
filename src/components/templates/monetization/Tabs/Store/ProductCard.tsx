// 'use client';

// import { useState } from 'react';
// import { MinusIcon, PlusIcon } from 'lucide-react';
// import Image from 'next/image';
// import image from '@/assets/image1.png';

// interface Product {
//   id: string
//   name: string
//   price: number
//   imageUrl: string
//   description?: string
//   currency: string
//   quantity?: number
// }

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [quantity, setQuantity] = useState(product.quantity || 0);
// console.log(quantity)
//   const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
//   };

//   return (
//     <div className="border rounded-lg p-4">

//       <div className="w-full flex justify-center flex-col">
//       <div className="relative mb-6 justify-center flex  h-48 w-full">
//         <Image
//           src={product.imageUrl || image}
//           alt={product.name}
//           width={280}
//           height={280}
//           priority
//           sizes="100%"
//           className="object-cover transition rounded-md duration-300 hover:opacity-90"
//         />
//       </div>
//         <div className="ml-4 flex justify-between items-center flex-gow">
//         <div>
//             <div>
//               <h4 className="font-medium">{product.name}</h4>
//               <p className="text-gray-500">${product.price}</p>
//               <p>{product.quantity}</p>
//             </div>
//         </div>
//         <div className="flex items-center space-x-2">
//               <button
//                 className="p-1 hover:bg-gray-100"
//                 onClick={decreaseQuantity}
//               >
//                 <MinusIcon className="w-4 h-4" />
//               </button>
//               <span className="px-3 py-1 border-x">{quantity}</span>
//               <button
//                 className="p-1 hover:bg-gray-100"
//                 onClick={increaseQuantity}
//               >
//                 <PlusIcon className="w-4 h-4" />
//               </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PencilIcon } from 'lucide-react';
import image from '@/assets/image1.png';
import { UpdateProductDialog } from './EditProduct';

interface Product {
  id: string;
  user_id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  currency: string;
  quantity?: number;
}

interface ProductCardProps {
  product: Product;
  onProductUpdate: () => void;
}

export default function ProductCard({ product, onProductUpdate }: ProductCardProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  return (
    <>
      <div className="border rounded-lg p-4">
        <div className="w-full flex justify-center flex-col">
          <div className="relative mb-6 justify-center flex h-48 w-full">
            <Image
              src={product.imageUrl || image}
              alt={product.name}
              width={280}
              height={280}
              priority
              sizes="100%"
              className="object-cover transition rounded-md duration-300 hover:opacity-50"
            />
          </div>
          <div className="ml-4 flex justify-between items-center">
            <div>
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-gray-500">${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsUpdateDialogOpen(true)}
              aria-label="Edit product"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <UpdateProductDialog
        isOpen={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onUpdateProduct={onProductUpdate}
        product={product}
      />
    </>
  );
}
