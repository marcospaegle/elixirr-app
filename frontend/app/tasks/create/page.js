"use client";

import Header from "@/components/header";
import axiosInstance from "@/utils/axios.instance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTask() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    due_date: "",
  });

  const handleWithSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axiosInstance.post("/tasks", task);
      router.replace("/tasks");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <main className="min-h-screen p-24">
      <Header />
      <form onSubmit={handleWithSubmit}>
        <input
          className="mb-3 text-2xl font-semibold bg-transparent p-2 border-none outline-none"
          placeholder="[title]"
          required
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <div className="w-full font-mono text-sm mb-4 flex flex-col justify-between border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl static rounded-xl border bg-gray-200">
          <div className="mb-4">
            <input
              className="p-2 font-semibold text-sm bg-transparent outline-none"
              placeholder="[due date]"
              type="date"
              required
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="low"
              checked
              name="priority"
              value="low"
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="low">low</label>{" "}
            <input
              type="radio"
              id="medium"
              name="priority"
              value="medium"
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="medium">medium</label>{" "}
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="high">high</label>
          </div>
          <textarea
            className="bg-transparent p-2 outline-none"
            placeholder="[description]"
            rows={10}
            required
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <Link href="/tasks" className="font-mono font-bold">
            [back]
          </Link>
          <button className="font-mono font-bold">[create]</button>
        </div>
      </form>
      {error && (
        <div className="font-mono font-semibold text-sm text-red-500 bg-red-100 p-2 rounded mb-4 mt-4">
          {error}
        </div>
      )}
    </main>
  );
}
