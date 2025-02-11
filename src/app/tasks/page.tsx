"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "daily_tasks"));
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "daily_tasks"), {
        title: newTask,
        completed: false,
      });

      setTasks([...tasks, { id: docRef.id, title: newTask, completed: false }]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">📋 Tasks</h1>

        {/* Input Form */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task..."
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            ➕ Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-200 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-800">{task.title}</span>
              <span className="text-lg">
                {task.completed ? "✅" : "❌"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
