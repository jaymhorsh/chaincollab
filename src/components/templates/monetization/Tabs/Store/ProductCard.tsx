"use client"

import { useState } from "react"
import Image from "next/image"
import { PencilIcon } from "lucide-react"
import defaultImage from "@/assets/image1.png"
import { UpdateProductDialog } from "./EditProduct"
import type { Product } from "@/interfaces"

interface ProductCardProps {
  product: Product
  onProductUpdate: () => void
}

export default function ProductCard({ product, onProductUpdate }: ProductCardProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className="border rounded-lg p-4 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
            <div className="animate-pulse text-main-blue">Updating...</div>
          </div>
        )}

        <div className="w-full flex justify-center flex-col">
          <div className="relative mb-2 justify-center flex h-48 w-full">
            <Image
              src={product?.imageUrl || defaultImage}
              alt={product?.name}
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
                <h4 className="font-medium capitalize">{product?.name}</h4>
                <p className="text-gray-500">${product?.price}</p>
                <p>Quantity: {product?.quantity}</p>
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
        onUpdateProduct={() => {
          setIsLoading(true)
          onProductUpdate()
          setTimeout(() => setIsLoading(false), 500)
        }}
        product={product}
      />
    </>
  )
}

