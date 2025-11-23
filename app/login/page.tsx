"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const[password,setPassword]=useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle your login / signup logic here

  };

  return (
    <main className="min-h-screen w-full bg-slate-900/60 flex items-center justify-center bg-[url('/blurry.png')]">
      {/* blurred background mock (optional) */}
      <div className="fixed inset-0 -z-10 bg-slate-900">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#4f46e5_0,_#020617_55%)] opacity-40" />
      </div>

      {/* Modal card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl px-8 py-6 border border-slate-100">
        {/* Close icon row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl font-medium text-black mx-auto mr-5 font-serif ">
        Login
          </span>
          {/* fake close icon to match UI */}
          <button
            type="button"
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Continue with wallet */}
          <button
            type="button"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            Continue with a wallet
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Email input + continue */}
          <div className="space-y-2">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
            <input
              type="email"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-violet-500 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition"
            >
              Continue
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 transition"
          >
            {/* simple Google dot (replace with real logo if you want) */}
            <span className="h-4 w-4 rounded-full bg-blue-500" />
            <span>Continue with Google</span>
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
          By logging in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> &amp;{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </main>
  );
}
