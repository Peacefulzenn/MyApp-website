"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Expense = {
  id: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
};

export default function Expenses() {
  const [budget, setBudget] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("Travel");
  const [description, setDescription] = useState("");

  // Fetch expenses from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const fetchedExpenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Expense[];
      setExpenses(fetchedExpenses);
    });

    return () => unsubscribe();
  }, []);

  // Handle adding expenses
  const handleAddExpense = async () => {
    const expenseAmount = parseFloat(amount);
    if (!amount || isNaN(expenseAmount) || expenseAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newExpense: Omit<Expense, "id"> = {
      category,
      amount: expenseAmount,
      description: category === "Other" ? description : "",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await addDoc(collection(db, "expenses"), newExpense);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>

      {/* Budget Display & Input */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Budget: ₹{budget !== null ? budget.toFixed(2) : "0.00"}</h2>
        {budget === null && (
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Set Budget"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setBudget(parseFloat(amount))}>
              Set Budget
            </button>
          </div>
        )}
      </div>

      {/* Expense Input */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded mr-2">
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
        {category === "Other" && (
          <input
            type="text"
            placeholder="Describe your expense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded mr-2"
          />
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>

      {/* Expense List */}
      <h2 className="text-xl font-semibold mt-4">Today's Expenses</h2>
      <ul className="mt-2 border p-4 rounded">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.id} className="p-2 border-b">
              {expense.date} - {expense.category}: ₹{expense.amount.toFixed(2)} {expense.description && `(${expense.description})`}
            </li>
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </ul>
    </div>
  );
}
