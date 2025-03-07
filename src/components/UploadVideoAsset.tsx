'use client';
import React, { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { RotatingLines } from 'react-loader-spinner';
import * as tus from 'tus-js-client';
import api from '@/utils/api';
import { usePrivy } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { getAssets } from '@/features/assetsAPI';
import { AppDispatch } from '@/store/store';

export default function UploadVideoAsset({ onClose }: { onClose: () => void }) {
  const { user } = usePrivy();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
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
      const response = await api.post('/asset/request-upload', {
        name: title,
        creatorId: {
          type: 'unverified',
          value: user?.wallet?.address || '',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to request upload URL');
      }

      const { tusEndpoint } = response.data;
      if (!tusEndpoint) {
        throw new Error('tusEndpoint not provided');
      }

      // Create a tus upload instance
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
          setUploading(false);
          toast.success('Video uploaded successfully!');
          onClose();
          dispatch(getAssets());
          // Reset form
          setFile(null);
          setTitle('');
          setProgress(0);
        },
      });

      // Check for previous uploads to resume if available
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
    <div className="w-full h-full overflow-y-auto mx-auto  p-6 pt-3 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={clsx(
            'border-dashed border-4 border-gray-300 rounded-md p-6 w-full h-full text-center cursor-pointer transition-colors relative',
            {
              'bg-gray-50 hover:bg-gray-100': !file,
              'bg-gray-200': file,
            },
          )}
        >
          {file ? (
            <div>
              <p className="mb-2 font-medium">File Selected:</p>
              <p className="text-gray-700 break-all">{file.name}</p>
              {file.type.startsWith('video') && (
                <div className="mt-4 w-full overflow-hidden">
                  <video src={URL.createObjectURL(file)} controls className="w-full h-40 object-contain" />
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
