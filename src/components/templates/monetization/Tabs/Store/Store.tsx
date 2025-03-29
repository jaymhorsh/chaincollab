'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrivy } from '@privy-io/react-auth';
import { getAllStreams } from '@/features/streamAPI';
import type { RootState, AppDispatch } from '@/store/store';
import Shirt from '@/assets/image1.png';
import { Product } from '@/interfaces';
import { ChannelSelector } from './ChannelSelector';
import { ProductsList } from './ProductList';
import { AddProductDialog } from './AddProductDialog';

const Store = () => {
  const { user } = usePrivy();
  const dispatch = useDispatch<AppDispatch>();
  const { streams, loading: streamsLoading } = useSelector((state: RootState) => state.streams);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'WAGMI DAO T-Shirt - Black',
      price: 40.0,
      image: Shirt,
      currency: 'USDC',
      quantity: 0,
    },
    {
      id: '2',
      name: 'WAGMI DAO T-Shirt - Black',
      price: 40.0,
      image: Shirt,
      currency: 'USDC',
      quantity: 0,
    },
  ]);

  // Fetch streams when component mounts
  useEffect(() => {
    dispatch(getAllStreams());
  }, [dispatch]);

  // Filter streams that have playbackId (similar to dashboard)
  const filteredStreams = useMemo(() => {
    return streams.filter((stream: any) => !!stream.playbackId && stream.creatorId?.value === user?.wallet?.address);
  }, [streams, user?.wallet?.address]);

  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const toggleEnabled = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);

  const handleAddNewProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts([...products, { ...newProduct, id: (products.length + 1).toString() }]);
  };

  return (
    <div>
      <div className="mb-4">
        {/* Channel Selection */}
        <ChannelSelector
          selectedStream={selectedStream}
          setSelectedStream={setSelectedStream}
          filteredStreams={filteredStreams}
          streamsLoading={streamsLoading}
          isEnabled={isEnabled}
          toggleEnabled={toggleEnabled}
        />

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

            <ProductsList products={products} />
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <AddProductDialog
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onAddProduct={handleAddNewProduct}
      />
    </div>
  );
};

export default Store;
