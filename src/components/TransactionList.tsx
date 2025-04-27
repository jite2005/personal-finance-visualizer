"use client";

import React from "react";
import { TransactionData } from "./TransactionForm";

interface TransactionListProps {
  transactions: TransactionData[];
  onEdit: (transaction: TransactionData) => void;
  onDelete: (id?: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions found.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ _id, date, description, amount }) => (
          <tr key={_id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{date}</td>
            <td className="border border-gray-300 px-4 py-2">{description}</td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              ${amount.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={() =>
                  onEdit({ _id, date, description, amount })
                }
                className="text-blue-600 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(_id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
