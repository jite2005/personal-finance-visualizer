"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TransactionData } from "./TransactionForm";

interface MonthlyExpensesChartProps {
  transactions: TransactionData[];
}

interface MonthlyData {
  month: string;
  total: number;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({
  transactions,
}) => {
  // Aggregate expenses by month
  const monthlyTotals: { [key: string]: number } = {};

  transactions.forEach(({ date, amount }) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyTotals[key] = (monthlyTotals[key] || 0) + amount;
  });

  // Convert to array and sort by month
  const data: MonthlyData[] = Object.entries(monthlyTotals)
    .map(([key, total]) => {
      const [year, month] = key.split("-");
      return {
        month: `${monthNames[parseInt(month)]} ${year}`,
        total,
      };
    })
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");
      return (
        parseInt(aYear) * 12 +
        monthNames.indexOf(aMonth) -
        (parseInt(bYear) * 12 + monthNames.indexOf(bMonth))
      );
    });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesChart;
