// import { createLivestream } from "@/app/actions";
'use client';
import { clsx } from 'clsx';
import React, { useState } from 'react';
// import { toast } from 'sonner';
import InputField from '@/components/ui/InputField';
import { RiVideoAddLine } from 'react-icons/ri';
import { RotatingLines } from 'react-loader-spinner';

export function CreateLivestream() {
  const [formData, setFormData] = useState({
    streamName: '',
    record: false,
    creatorId: '',
  });
  //
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validate form data
    const newErrors: { [key: string]: string } = {};
    if (!formData.streamName) newErrors.streamName = 'This field cannot be empty';
    if (!formData.creatorId) newErrors.creatorId = 'This field cannot be empty';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Create livestream
    // const result = await createLivestream({
    //   streamName: formData.streamName,
    //   record: formData.record,
    //   creatorId: formData.creatorId,
    // });
    // setLoading(false);
    // setFormData({
    //   streamName: "",
    //   record: false,
    //   creatorId: "",
    // });

    //   if (!result.success) {
    //     toast.error(result.error);
    //   } else {
    //     toast.success("Livestream successfully created!");
    //     setTimeout(() => {
    //       window.location.reload(); // Reload the page to update the channel
    //     }, 1500);
    //   }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'record' ? value === 'yes' : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-3 w-full')}>
      <div className="flex flex-col">
        <div>
          <label htmlFor="streamName" className="block text-sm font-medium pb-2 text-gray-900">
            Stream Name
          </label>

          <InputField
            type="text"
            label="Stream Name"
            name="streamName"
            value={formData.streamName}
            onChange={handleChange}
            placeholder="Stream Name"
            className={clsx(
              'border focus:outline-none placeholder:text-black-tertiary-text focus:ring-1 transition duration-200',
              { 'border-red-500': errors.streamName },
            )}
          />
        </div>

        {errors.streamName && <p className="text-red-500 text-sm">{errors.streamName}</p>}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="record" className="block text-sm/6 font-medium text-gray-900">
          Do you want your stream to be recorded?
        </label>
        <select
          name="record"
          value={formData.record ? 'yes' : 'no'}
          onChange={handleChange}
          className="mb-2 p-3 placeholder:text-black-tertiary-text border rounded-md focus:outline-none text-sm text-black-secondary-text focus:ring-1 focus:ring-main-blue transition duration-200"
        >
          <option value="no">Do not record</option>
          <option value="yes">Record</option>
        </select>
      </div>

      <div className="flex flex-col ">
        <div>
          <label htmlFor="creatorId" className="block text-sm font-medium pb-2 text-gray-900">
            Creator ID
          </label>
          <InputField
            type="text"
            label="Creator ID"
            name="creatorId"
            value={formData.creatorId}
            onChange={handleChange}
            placeholder="Creator ID"
            className={clsx(
              'mb-2 p-2 border text-base placeholder:text-black-tertiary-text  focus:outline-none focus:ring-2 transition duration-200',
              { 'border-red-500': errors.creatorId },
            )}
          />
        </div>
        {errors.creatorId && <p className="text-red-500 text-sm">{errors.creatorId}</p>}
      </div>

      <div className="flex justify-end">
        <button
          className="flex items-center justify-center w-32 p-2 border rounded bg-main-blue text-white transition duration-200"
          disabled={loading}
        >
          {loading ? (
            <RotatingLines
              visible={true}
              strokeWidth="5"
              animationDuration="0.75"
              strokeColor="#ffffff"
              ariaLabel="rotating-lines-loading"
              width="24"
            />
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-sm">Create</p>
              <RiVideoAddLine className="text-xl" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
