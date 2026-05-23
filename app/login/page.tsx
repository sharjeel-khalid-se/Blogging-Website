"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token = localStorage.getItem("auth_token")
  if(token){
    router.push("/")
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(response)
      const data = await response.json()
      if(!response.ok){
        console.log(data.message)
        setError(data.message || "An error occurred. Please try again.")
        return;
      }
      
      console.log("Registration successful:", data.message);

      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        "An error occurred while submitting the form. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen w-full">
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-400">Blog</h1>
        <h2 className="text-2xl font-bold">Welcome Back</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
              className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
              required
              className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button className={`bg-indigo-400 text-white py-3 px-6 rounded hover:bg-white hover:text-indigo-400 hover:border-indigo-400 border transition hover:scale-110 hover:cursor-pointer font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p>
            {`Don't have an account? `}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
