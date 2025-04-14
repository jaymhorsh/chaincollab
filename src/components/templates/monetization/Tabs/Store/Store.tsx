"use client"
import { useEffect, useMemo, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePrivy } from "@privy-io/react-auth"
import axios from "axios"
import { ColorRing } from "react-loader-spinner"
import { toast } from "sonner"
import { getAllStreams } from "@/features/streamAPI"
import type { RootState, AppDispatch } from "@/store/store"
import type { Product } from "@/interfaces"
import { ChannelSelector } from "./ChannelSelector"
import { ProductsList } from "./ProductList"
import { AddProductDialog } from "./AddProductDialog"

const Store = () => {
  const { user } = usePrivy()
  const dispatch = useDispatch<AppDispatch>()
  const { streams, loading: streamsLoading } = useSelector((state: RootState) => state.streams)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // Product state management
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)

  // Fetch streams when component mounts
  useEffect(() => {
    dispatch(getAllStreams())
  }, [dispatch])

  // Filter streams that have playbackId
  const filteredStreams = useMemo(() => {
    return streams.filter((stream: any) => !!stream.playbackId && stream.creatorId?.value === user?.wallet?.address)
  }, [streams, user?.wallet?.address])

  // Fetch products when wallet address is available
  const fetchProducts = useCallback(async () => {
    if (!user?.wallet?.address) return

    setProductsLoading(true)
    setProductsError(null)

    try {
      const response = await axios.get(`https://chaintv.onrender.com/api/${user.wallet.address}/products`)
      setProducts(response.data.product || [])
    } catch (err) {
      console.error("Error fetching products:", err)
      setProductsError("Failed to load products. Please try again.")
      toast.error("Failed to load products. Please try again.")
    } finally {
      setProductsLoading(false)
    }
  }, [user?.wallet?.address])

  // Initial product fetch
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddProduct = () => {
    setIsAddProductOpen(true)
  }

  const handleProductAdded = useCallback(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div>
      <div className="mb-4">
        {/* Channel Selection */}
        <ChannelSelector filteredStreams={filteredStreams} streamsLoading={streamsLoading} />

        {/* Products Management */}
        <div className="my-8">
          <h2 className="text-lg font-medium mb-2">Manage your merchandise and digital products</h2>

          <div className="bg-white rounded-lg border p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Active Products</h3>
              <button
                className="bg-main-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>

            {productsLoading ? (
              <div className="py-16 flex justify-center items-center">
                <ColorRing
                  visible={true}
                  height="100"
                  width="50"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
                />
              </div>
            ) : productsError ? (
              <div className="py-8 text-center text-red-500">{productsError}</div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No products found. Add your first product to get started.
              </div>
            ) : (
              <ProductsList
                products={products}
                onProductUpdate={() => {
                  setProductsLoading(true)
                  fetchProducts()
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <AddProductDialog
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onAddProduct={handleProductAdded}
      />
    </div>
  )
}

export default Store

