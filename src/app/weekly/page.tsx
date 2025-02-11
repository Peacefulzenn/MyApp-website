"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Ensure the Firebase import path is correct
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const WeeklyPage = () => {
  const [monthlyData, setMonthlyData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null); // ✅ Fixed syntax error

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "weekly_expenses"));
      const data: { [key: string]: any } = {};

      querySnapshot.forEach((doc) => {
        const entry = doc.data();
        const { month, week, day } = entry;

        if (!data[month]) data[month] = {};
        if (!data[month][week]) data[month][week] = {};
        if (!data[month][week][day]) data[month][week][day] = [];

        data[month][week][day].push({ id: doc.id, ...entry });
      });

      setMonthlyData(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonth = (month: string) => {
    setExpandedMonth((prev) => (prev === month ? null : month));
    setExpandedWeek(null);
  };

  const toggleWeek = (week: string) => {
    setExpandedWeek((prev) => (prev === week ? null : week));
  };

  const deleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, "weekly_expenses", id));
      fetchMonthlyData();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  if (loading) return <p>Loading expenses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Expenses</h1>

      {Object.keys(monthlyData).length === 0 ? (
        <p>No expenses recorded.</p>
      ) : (
        Object.keys(monthlyData).map((month) => (
          <div key={month} className="mb-4 border border-gray-300 p-4 rounded-md">
            <h2
              className="text-xl font-semibold cursor-pointer"
              onClick={() => toggleMonth(month)}
            >
              {month}
            </h2>

            {expandedMonth === month &&
              Object.keys(monthlyData[month]).map((week) => (
                <div key={week} className="ml-4 mt-2">
                  <h3
                    className="text-lg font-medium cursor-pointer"
                    onClick={() => toggleWeek(week)}
                  >
                    Week {week}
                  </h3>

                  {expandedWeek === week &&
                    Object.keys(monthlyData[month][week]).map((day) => (
                      <div key={day} className="ml-6 mt-2">
                        <h4 className="text-md font-medium">{day}</h4>
                        <div className="border p-2 rounded-md">
                          {monthlyData[month][week][day].map((expense: any) => (
                            <div
                              key={expense.id}
                              className="flex justify-between items-center p-2 border-b"
                            >
                              <span>
                                {expense.category}: ₹{expense.amount}
                              </span>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => deleteExpense(expense.id)}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default WeeklyPage;
