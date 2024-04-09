"use client";

import Header from "@/components/header";
import axiosInstance from "@/utils/axios.instance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetails({ params }) {
  const router = useRouter();
  const [error, setError] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
  });

  useEffect(() => {
    setError(false);
    axiosInstance
      .get(`/tasks/${params.slug}`)
      .then((response) => {
        setTask(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const handleWithSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {};
      for (const key in task) {
        if (task[key] !== "") {
          data[key] = task[key];
        }
      }

      await axiosInstance.patch(`/tasks/${params.slug}`, data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen p-24">
      <Header />
      <form onSubmit={handleWithSubmit}>
        <input
          className="mb-3 text-2xl font-semibold bg-transparent p-2 border-none outline-none"
          placeholder="[title]"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          defaultValue={task.title}
        />
        <div className="w-full font-mono text-sm mb-4 flex flex-col justify-between border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl static rounded-xl border bg-gray-200">
          <div className="mb-4">
            <input
              className="p-2 font-semibold text-sm bg-transparent outline-none"
              placeholder="[due date]"
              type="date"
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
              defaultValue={task.due_date}
            />
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              checked={task.priority === "low"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="low">low</label>{" "}
            <input
              type="radio"
              id="medium"
              name="priority"
              value="medium"
              checked={task.priority === "medium"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="medium">medium</label>{" "}
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              checked={task.priority === "high"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />{" "}
            <label htmlFor="high">high</label>
          </div>
          <textarea
            className="bg-transparent p-2 outline-none"
            placeholder="[description]"
            rows={10}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            defaultValue={task.description}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <Link href="/tasks" className="font-mono font-bold">
            [back]
          </Link>
          <button className="font-mono font-bold">[update]</button>
        </div>
      </form>
      {error && (
        <div className="font-mono font-semibold text-sm text-red-500 bg-red-100 p-2 rounded mb-4 mt-4">
          Something goes wrong! try again...
        </div>
      )}
    </main>
  );
}
