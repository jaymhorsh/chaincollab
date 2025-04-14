"use client"
import { clsx } from "clsx"
import type React from "react"
import { useState } from "react"
import InputField from "@/components/ui/InputField"
import { RiVideoAddLine } from "react-icons/ri"
import { RotatingLines } from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store/store"
import type { RootState } from "@/store/store"
import { createLivestream, getAllStreams } from "@/features/streamAPI"

import { toast } from "sonner"
import { usePrivy } from "@privy-io/react-auth"
import { resetStreamStatus } from "@/features/streamSlice"

interface CreateLivestreamProps {
  close: () => void // Function to close the dialog
}
type PaymentOption = "free" | "one-time" | "monthly"

export function CreateLivestream({ close }: CreateLivestreamProps) {
  const { user } = usePrivy()
  const [formData, setFormData] = useState({
    streamName: "",
    record: false,
    creatorId: user?.wallet?.address || "",
    paymentOption: "free" as PaymentOption,
    amount: 0,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, success } = useSelector((state: RootState) => state.streams)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const newErrors: { [key: string]: string } = {};
    if (!formData.streamName) newErrors.streamName = "This field cannot be empty";
    if (!formData.creatorId) newErrors.creatorId = "This field cannot be empty";
    if (formData.paymentOption !== "free" && (!formData.amount || formData.amount <= 0)) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Dispatch createLivestream action
      const response = await dispatch(
        createLivestream({
          streamName: formData.streamName,
          record: formData.record,
          creatorId: formData.creatorId,
          paymentOption: formData.paymentOption,
          amount: formData.amount,
        })
      ).unwrap();

      console.log("Livestream created and data sent:", response);

      // Execute success actions
      setFormData({
        streamName: "",
        record: false,
        creatorId: user?.wallet?.address || "",
        paymentOption: "free",
        amount: 0,
      });
      toast.success("Stream created successfully");
      dispatch(getAllStreams());
      dispatch(resetStreamStatus());
      close();
    } catch (err: any) {
      console.error("Error creating livestream:", err);
      toast.error(err.message || "Failed to create stream");
      dispatch(resetStreamStatus());
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "record" ? value === "yes" : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handlePaymentOptionChange = (option: PaymentOption) => {
    setFormData((prev) => ({
      ...prev,
      paymentOption: option,
      // Reset amount to 0 if switching to free
      amount: option === "free" ? 0 : prev.amount,
    }))
    if (errors.paymentOption) {
      setErrors((prev) => {
        const { paymentOption, ...rest } = prev
        return rest
      })
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setFormData((prev) => ({
      ...prev,
      amount: isNaN(value) ? 0 : value,
    }))
    if (errors.amount) {
      setErrors((prev) => {
        const { amount, ...rest } = prev
        return rest
      })
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-3")}>
        <div className="flex flex-col">
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
              "border w-full focus:outline-none placeholder:text-black-tertiary-text focus:ring-1 focus:ring-main-blue transition duration-200",
              { "border-red-500": errors.streamName },
            )}
          />
          {errors.streamName && <p className="text-red-500 text-sm pb-1">{errors.streamName}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="record" className="block text-sm font-medium text-gray-900">
            Do you want your stream to be recorded?
          </label>
          <select
            name="record"
            value={formData.record ? "yes" : "no"}
            onChange={handleChange}
            className="mb-2 p-3 border rounded-md focus:outline-none text-sm text-black-secondary-text focus:ring-1 focus:ring-main-blue transition duration-200"
          >
            <option value="no">Do not record</option>
            <option value="yes">Record</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium pb-2 text-gray-900">View Mode</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => handlePaymentOptionChange("free")}
              className={clsx(
                "px-4 py-2 border rounded-md transition duration-200",
                formData.paymentOption === "free"
                  ? "bg-main-blue text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100",
              )}
            >
              Free
            </button>
            <button
              type="button"
              onClick={() => handlePaymentOptionChange("one-time")}
              className={clsx(
                "px-4 py-2 border rounded-md transition duration-200",
                formData.paymentOption === "one-time"
                  ? "bg-main-blue text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100",
              )}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => handlePaymentOptionChange("monthly")}
              className={clsx(
                "px-4 py-2 border rounded-md transition duration-200",
                formData.paymentOption === "monthly"
                  ? "bg-main-blue text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100",
              )}
            >
              Monthly
            </button>
          </div>
        </div>

        {formData.paymentOption !== "free" && (
          <div className="flex flex-col">
            <label htmlFor="amount" className="block text-sm font-medium pb-2 text-gray-900">
              Amount
            </label>
            <InputField
              type="number"
              label="Amount"
              name="amount"
              value={formData.amount.toString()}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              className={clsx(
                "border w-full focus:outline-none placeholder:text-black-tertiary-text focus:ring-1 focus:ring-main-blue transition duration-200",
                { "border-red-500": errors.amount },
              )}
            />
            {errors.amount && <p className="text-red-500 text-sm pb-1">{errors.amount}</p>}
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="creatorId" className="block text-sm font-medium pb-2 text-gray-900">
            Creator ID
          </label>
          <InputField
            type="text"
            label="Creator ID"
            name="creatorId"
            readOnly
            value={formData.creatorId}
            onChange={handleChange}
            placeholder="Creator ID"
            className={clsx(
              "mb-2 p-2 border text-base placeholder:text-black-tertiary-text outline-none transition duration-200",
              { "border-red-500": errors.creatorId },
            )}
          />
          {errors.creatorId && <p className="text-red-500 text-sm pb-1">{errors.creatorId}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center w-32 p-2 border rounded bg-main-blue text-white transition duration-200 disabled:opacity-50"
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
    </div>
  )
}
