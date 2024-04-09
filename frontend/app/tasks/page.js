"use client";

import Link from "next/link";
import TaskItem from "@/components/task-item";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios.instance";
import Header from "@/components/header";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    axiosInstance
      .get("/tasks")
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <main className="min-h-screen p-24">
      <Header />
      <div className="flex justify-between">
        <h1 className="mb-3 text-2xl font-semibold">Tasks ({tasks.length})</h1>
        <Link href="/tasks/create" className="font-mono font-bold">
          [new]
        </Link>
      </div>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          id={t.id}
          title={t.title}
          priority={t.priority}
          dueDate={t.due_date}
        />
      ))}
      {error && (
        <div className="font-mono font-semibold text-sm text-red-500 bg-red-100 p-2 rounded mb-4">
          Something goes wrong! try again...
        </div>
      )}
    </main>
  );
}
