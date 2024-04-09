"use client";

import Link from "next/link";
import Priority from "./priority";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios.instance";

const TaskItem = ({ id, title, dueDate, priority }) => {
  const router = useRouter();

  const handleWithDelete = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      router.replace("/");
    } catch (error) {}
  };
  return (
    <div className="w-full font-mono text-sm mb-4">
      <p className="flex w-full justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl static  rounded-xl border bg-gray-200 dark:bg-zinc-800/30">
        <span>
          {title} <Priority level={priority} /> ... due by {dueDate}
        </span>
        <span>
          <Link href={`/tasks/${id}`} className="font-mono font-bold">
            [edit]
          </Link>
          <button
            type="button"
            href={`/tasks/${id}`}
            className="font-mono font-bold"
            onClick={handleWithDelete}
          >
            [delete]
          </button>
        </span>
      </p>
    </div>
  );
};

export default TaskItem;
