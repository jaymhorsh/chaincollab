
'use client';
import React, { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { RiVideoAddLine } from 'react-icons/ri';
import { RotatingLines } from 'react-loader-spinner';
import tus from 'tus-js-client';
import api from '@/utils/api';

export default function UploadVideoAsset() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a video file.');
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // 1. Request an upload URL from Livepeer
      // const token = '03a07a54-0519-4c3b-871a-e659e3814e71';
      const response = await api.post('/asset/request-upload')

      if (response.status !== 200) {
        throw new Error('Failed to request upload URL');
      }

      // const uploadData = await response.json();
      const { tusEndpoint } = response.data;
      if (!tusEndpoint) {
        throw new Error('tusEndpoint not provided');
      }

      // 2. Create a tus upload instance
      const upload = new tus.Upload(file, {
        endpoint: tusEndpoint,
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        uploadSize: file.size,
        onError: (err) => {
          console.error('Error uploading file:', err);
          setError('Error uploading file: ' + err.toString());
          setUploading(false);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setProgress(parseFloat(percentage));
        },
        onSuccess: () => {
          console.log('Upload finished:', upload.url);
          setUploading(false);
          alert('Video uploaded successfully!');
          // Optionally, you might want to dispatch an action to refresh the asset list here.
          // Reset form state
          setFile(null);
          setTitle('');
          setProgress(0);
        },
      });

      // 3. Check for previous uploads to resume if available
      const previousUploads = await upload.findPreviousUploads();
      if (previousUploads.length > 0) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      upload.start();
    } catch (err: any) {
      console.error(err);
      setError('Upload failed: ' + err.toString());
      setUploading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <RiVideoAddLine className="text-main-blue text-2xl" /> Upload Video Asset
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={clsx(
            "border-dashed border-4 border-gray-300 rounded-md p-6 w-full h-full text-center cursor-pointer transition-colors relative",
            {
              "bg-gray-50 hover:bg-gray-100": !file,
              "bg-gray-200": file,
            },
          )}
        >
          {file ? (
            <div>
              <p className="mb-2 font-medium">File Selected:</p>
              <p className="text-gray-700 break-all">{file.name}</p>
              {file.type.startsWith('video') && (
                <div className="mt-4 w-full overflow-hidden">
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="w-full h-40 object-contain"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="relative h-32 flex justify-center items-center flex-col">
              <p className="mb-2 font-medium">Drag &amp; drop a video file here</p>
              <p className="text-sm text-gray-600">or click to select a file</p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your video"
            className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-main-blue transition duration-200"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {uploading && (
          <div className="flex items-center gap-4">
            <RotatingLines
              visible={true}
              strokeWidth="5"
              animationDuration="0.75"
              strokeColor="#main-blue"
              ariaLabel="upload-loading"
              width="24"
            />
            <span>{progress}%</span>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="mt-2 flex items-center justify-center gap-2 bg-main-blue text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
}





















// 'use client';
// import React, { useState, useCallback } from 'react';
// import { clsx } from 'clsx';
// import { RiVideoAddLine } from 'react-icons/ri';
// import { RotatingLines } from 'react-loader-spinner';

// export default function UploadVideoAsset() {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a video file.');
//       return;
//     }

//     setError(null);
//     setUploading(true);
//     setProgress(0);

//     // Simulate an upload process. Replace with Livepeer asset upload call.
//     const simulateUpload = () => {
//       let progressVal = 0;
//       const interval = setInterval(() => {
//         progressVal += 10;
//         setProgress(progressVal);
//         if (progressVal >= 100) {
//           clearInterval(interval);
//           setUploading(false);
//           alert('Video uploaded successfully!');
//           // Reset form
//           setFile(null);
//           setTitle('');
//           setProgress(0);
//         }
//       }, 300);
//     };

//     simulateUpload();
//   };

//   return (
//     <div className="w-full mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//         <RiVideoAddLine className="text-main-blue text-2xl" /> Upload Video Asset
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           className={clsx(
//             "border-dashed border-4 border-gray-300 rounded-md p-6 w-full h-full text-center cursor-pointer transition-colors relative",
//             {
//               "bg-gray-50 hover:bg-gray-100": !file,
//               "bg-gray-200": file,
//             },
//           )}
//         >
//           {file ? (
//             <div>
//               <p className="mb-2 font-medium">File Selected:</p>
//               <p className="text-gray-700 break-all">{file.name}</p>
//               {file.type.startsWith('video') && (
//                 <div className="mt-4 w-full overflow-hidden">
//                   <video
//                     src={URL.createObjectURL(file)}
//                     controls
//                     className="w-full h-40 object-contain"
//                   />
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="relative h-32 flex justify-center items-center flex-col">
//               <p className="mb-2 font-medium">Drag &amp; drop a video file here</p>
//               <p className="text-sm text-gray-600">or click to select a file</p>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium mb-1 text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter a title for your video"
//             className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-main-blue transition duration-200"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         {uploading && (
//           <div className="flex items-center gap-4">
//             <RotatingLines
//               visible={true}
//               strokeWidth="5"
//               animationDuration="0.75"
//               strokeColor="#main-blue"
//               ariaLabel="upload-loading"
//               width="24"
//             />
//             <span>{progress}%</span>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={uploading}
//           className="mt-2 flex items-center justify-center gap-2 bg-main-blue text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50"
//         >
//           {uploading ? 'Uploading...' : 'Upload Video'}
//         </button>
//       </form>
//     </div>
//   );
// }
