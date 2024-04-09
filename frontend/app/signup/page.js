"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios.instance";

export default function Signup() {
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleWithSignUp = async (e) => {
    e.preventDefault();

    setError(false);
    const { name, email, password } = user;

    try {
      await axios.post("users", { name, email, password });
      router.push("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <main className="grid place-items-center h-full">
      <Link
        href="/"
        className="fixed top-1 right-1 font-mono font-semibold text-sm"
      >
        [already have an account? sign in]
      </Link>
      <form
        style={{ width: "350px" }}
        className="flex flex-col bg-white p-4 rounded-xl"
        onSubmit={handleWithSignUp}
      >
        {error && (
          <div className="font-mono font-semibold text-sm text-red-500 bg-red-100 p-2 rounded mb-4">
            Something goes wrong! try again...
          </div>
        )}
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="name" className="font-mono font-semibold text-md">
            Name <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="font-mono bg-transparent outline-none"
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="email" className="font-mono font-semibold text-md">
            Email <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john.doe@email.com"
            className="font-mono bg-transparent outline-none"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="font-mono font-semibold text-md">
            Password <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="secret"
            required
            className="font-mono bg-transparent outline-none"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <hr className="mb-4" />
        <button className="font-mono font-semibold text-md">[sign up]</button>
      </form>
    </main>
  );
}
