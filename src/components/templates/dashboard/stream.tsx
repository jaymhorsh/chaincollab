'use client';

import { RootState } from '@/app/store';
import { getStreamById } from '@/features/streamAPI';
import { AppDispatch } from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const StreamPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
//   const { stream, loading, error } = useSelector((state: RootState) => state.stream);
  const id = searchParams ? searchParams.get('id') : null;
  useEffect(() => {
    toast.success(id);
  }, [id]);

//   
// console.log(stream)
//   useEffect(() => {
//     if (id) {
//     

//     } else {
//       toast.error('Stream ID is required');
//     }
//   }, [id, dispatch]);
const handleclick = () => { 
  if (id) {
    dispatch(getStreamById(id));
  } else {
    toast.error('Stream ID is required');
  }
}
  return <div>Stream Page for ID: {id}
  <button onClick={handleclick} className='bg-blue-500 p-6'>click</button>
  </div>;
};

export default StreamPage;
