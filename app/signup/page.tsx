"use client";

import React, { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const[loading,setLoading]=useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match,Try again");
      return;
    }

    // TODO: send signup data to backend
    console.log({
      fullName,
      userName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <main className="min-h-screen w-full bg-slate-900/60 flex items-center justify-center">
      {/* blurred background */}
      <div className="fixed inset-0 -z-10 bg-slate-900">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#4f46e5_0,_#020617_55%)] opacity-40" />
      </div>

      {/* Modal card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl px-8 py-6 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl font-medium text-black mx-auto mr-5 font-serif">
            Sign up
          </span>
          <button
            type="button"
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sign up with wallet */}
          <button
            type="button"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            Sign up with a wallet
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Full name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Username</label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="@steeze_tech"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Confirm password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center -mt-1">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-500 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition mt-1"
          >
           {loading?"Creating Account":"Create Account "}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
            <div className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google sign up */}
          <button
            type="button"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 transition"
          >
            <span className="h-4 w-4 rounded-full bg-blue-500" />
            <span>Sign up with Google</span>
          </button>

          {/* Social icons row */}
          <div className="flex items-center justify-center gap-5 pt-1">
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              D
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              X
            </button>
          </div>
        </form>

        {/* Terms text */}
        <p className="mt-4 text-[10px] text-center text-slate-400 leading-snug">
          By creating an account, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> &amp;{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </main>
  );
}
