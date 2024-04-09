"use client";

import Link from "next/link";
import TaskItem from "@/components/task-item";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios.instance";
import Header from "@/components/header";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance.get("/tasks").then((response) => {
      setTasks(response.data.data);
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
    </main>
  );
}
