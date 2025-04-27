"use client";

import React, { useState, useEffect } from "react";
import TransactionForm, { TransactionData } from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<TransactionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction: TransactionData) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      await fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateTransaction = async (transaction: TransactionData) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if (!res.ok) throw new Error("Failed to update transaction");
      setEditingTransaction(null);
      await fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTransaction = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/transactions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");
      await fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = (transaction: TransactionData) => {
    if (editingTransaction) {
      updateTransaction({ ...transaction, _id: editingTransaction._id });
    } else {
      addTransaction(transaction);
    }
  };

  const handleEdit = (transaction: TransactionData) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <TransactionForm
        onSubmit={handleSubmit}
        initialData={editingTransaction || undefined}
        onCancel={editingTransaction ? handleCancelEdit : undefined}
      />
      <div className="mt-8">
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
        />
      </div>
      <div className="mt-8">
        <MonthlyExpensesChart transactions={transactions} />
      </div>
    </div>
  );
}
