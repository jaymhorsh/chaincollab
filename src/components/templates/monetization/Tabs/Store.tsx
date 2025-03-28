"use client"
import type React from "react"
import { useEffect, useMemo, useState, useCallback } from "react"
import Shirt from "../../../../assets/Shirt.png"
import Image from "next/image"
import { MinusIcon, PlusIcon, X, Upload } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getAllStreams } from "@/features/streamAPI"
import type { RootState, AppDispatch } from "@/store/store"
import * as Dialog from "@radix-ui/react-dialog"
import { usePrivy } from "@privy-io/react-auth"
import image from "../../../../assets/image1.png"

interface Product {
  id: string
  name: string
  price: number
  image: any
  currency?: string
  quantity?: number
}

const Store = () => {
  const { user } = usePrivy()
  const dispatch = useDispatch<AppDispatch>()
  const { streams, loading: streamsLoading } = useSelector((state: RootState) => state.streams)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [selectedStream, setSelectedStream] = useState<string>("")
  const [isEnabled, setIsEnabled] = useState(true)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "WAGMI DAO T-Shirt - Black",
      price: 40.0,
      image: Shirt,
      currency: "USDC",
      quantity: 0,
    },
    {
      id: "2",
      name: "WAGMI DAO T-Shirt - Black",
      price: 40.0,
      image: Shirt,
      currency: "USDC",
      quantity: 0,
    },
  ])

  // Fetch streams when component mounts
  useEffect(() => {
    dispatch(getAllStreams())
  }, [dispatch])

  // Filter streams that have playbackId (similar to dashboard)
  const filteredStreams = useMemo(() => {
    return streams.filter((stream: any) => !!stream.playbackId && stream.creatorId?.value === user?.wallet?.address)
  }, [streams, user?.wallet?.address])

  const handleAddProduct = () => {
    setIsAddProductOpen(true)
  }

  const toggleEnabled = useCallback(() => {
    setIsEnabled((prev) => !prev)
  }, [])

  return (
    <div>
      <div className="mb-4">
        {/* Channel Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Select Channel</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center border rounded-lg overflow-hidden flex-grow max-w-md">
              <div className="flex items-center px-3 py-2 w-full">
                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden mr-2 flex-shrink-0">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="Channel icon"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <select
                  className="bg-transparent border-none focus:outline-none w-full"
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  disabled={streamsLoading}
                >
                  <option value="">Select a channel</option>
                  {filteredStreams.map((stream: any) => (
                    <option key={stream.id} value={stream.id}>
                      {stream.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <button
                className={`px-6 py-2 transition-colors ${isEnabled ? "bg-blue-600 text-white" : "text-gray-600"}`}
                onClick={isEnabled ? undefined : toggleEnabled}
              >
                Enabled
              </button>
              <button
                className={`px-6 py-2 transition-colors ${!isEnabled ? "bg-blue-600 text-white" : "text-gray-600"}`}
                onClick={isEnabled ? toggleEnabled : undefined}
              >
                Disable
              </button>
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="my-8">
          <h2 className="text-lg font-medium mb-2">Manage your merchandise and digital products</h2>

          <div className="bg-white rounded-lg border p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Active Products</h3>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <AddProductDialog
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onAddProduct={(newProduct) => {
          setProducts([...products, { ...newProduct, id: (products.length + 1).toString() }])
        }}
      />
    </div>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(product.quantity || 0)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AddProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddProduct: (product: Omit<Product, "id">) => void
}

const AddProductDialog = ({ isOpen, onOpenChange, onAddProduct }: AddProductDialogProps) => {
  const [productName, setProductName] = useState("")
  const [productImage, setProductImage] = useState<File | null>(null)
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      uploadImage(file)
    }
  }

  const uploadImage = (file: File) => {
    setProductImage(file)
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)

        // Create a preview URL
        const reader = new FileReader()
        reader.onload = () => {
          setProductImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }, 200)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      uploadImage(file)
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (!productName || !price) {
      alert("Please fill in all required fields")
      return
    }

    // Create new product object
    const newProduct: Omit<Product, "id"> = {
      name: productName,
      price: Number.parseFloat(price),
      image: productImagePreview || "/placeholder.svg",
      currency: "USDC",
      quantity: Number.parseInt(quantity) || 0,
    }

    // Add product
    onAddProduct(newProduct)

    // Reset form and close dialog
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setProductName("")
    setProductImage(null)
    setProductImagePreview(null)
    setDescription("")
    setPrice("")
    setQuantity("")
    setUploadProgress(0)
    setIsUploading(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 mt-6 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg overflow-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">Add New Product</Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Images</label>
              <div
                className={`border border-dashed rounded-md p-4 text-center ${isDragging ? "bg-blue-50 border-blue-300" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="py-4">
                    <div className="flex items-center justify-center mb-2">
                      <Upload className="h-8 w-8 text-blue-500 animate-pulse" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
                  </div>
                ) : productImagePreview ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src={productImagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => {
                        setProductImage(null)
                        setProductImagePreview(null)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <label className="cursor-pointer text-blue-600 hover:underline">
                      Click to upload
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[80px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Pricing</h3>
                <div>
                  <label className="block text-sm mb-1">Price (USD)</label>
                  <input
                    type="number"
                    className="w-full border rounded-md p-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Inventory</h3>
                <div>
                  <label className="block text-sm mb-1">Quantity</label>
                  <input
                    type="number"
                    className="w-full border rounded-md p-2"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => {
                  resetForm()
                  onOpenChange(false)
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Store

