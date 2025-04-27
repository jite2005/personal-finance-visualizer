"use client";

import React, { useState, useEffect } from "react";

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  initialData?: TransactionData;
  onCancel?: () => void;
}

export interface TransactionData {
  _id?: string;
  amount: number;
  date: string;
  description: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [date, setDate] = useState(initialData?.date || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setDate(initialData.date);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (amount <= 0) newErrors.amount = "Amount must be greater than zero";
    if (!date) newErrors.date = "Date is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ amount, date, description });
    setAmount(0);
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
      <div >
        <label htmlFor="amount" className="block font-semibold mb-1">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          min="0"
          step="0.01"
        />
        {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
      </div>
      <div>
        <label htmlFor="date" className="block font-semibold mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block font-semibold mb-1">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
