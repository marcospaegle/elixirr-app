"use client";

import { useAuth } from "@/contexts/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { signIn, isUserLogged, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isUserLogged) {
      router.push("/tasks");
    }
  }, [isUserLogged]);

  const handleWithSignIn = (e) => {
    e.preventDefault();
    signIn(credentials.email, credentials.password);
  };

  return (
    <main className="grid place-items-center h-full">
      <Link
        href="/signup"
        className="fixed top-1 right-1 font-mono font-semibold text-sm "
      >
        [new here? sign up]
      </Link>
      <form
        style={{ width: "350px" }}
        className="flex flex-col bg-white p-4 rounded-xl"
        onSubmit={handleWithSignIn}
      >
        {error && (
          <div className="font-mono font-semibold text-sm text-red-500 bg-red-100 p-2 rounded mb-4">
            Something goes wrong! try again...
          </div>
        )}
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="email" className="font-mono font-semibold text-md">
            Email <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@email.com"
            required
            className="font-mono bg-transparent outline-none"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            defaultValue={credentials.email}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="font-mono font-semibold text-md">
            Password <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="secret"
            required
            className="font-mono bg-transparent outline-none"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            defaultValue={credentials.password}
          />
        </div>
        <hr className="mb-4" />
        <button className="font-mono font-semibold text-md">[sign in]</button>
      </form>
    </main>
  );
}
