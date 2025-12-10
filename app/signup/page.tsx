"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match,Try again");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          confirmPassword
        })
      }


      )


      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed")
      }

      // Registration successful - redirect or show success message
      const data = await res.json();
      router.push("/login")
      console.log("Registration successful:", data);
      // TODO: Redirect to login or dashboard
    }
    catch (err: any) {
      console.log(err)
      setError(err.message || "Something went wrong, try again")
    } finally {
      if (error) {
        setLoading(false)
      } else {
        setLoading(true)
      }
    }
  }




  return (
    <main className="min-h-screen w-full bg-slate-900/60 flex items-center justify-center bg-[url('/blurry.png')]">
      {/* blurred background */}
      <div className="fixed inset-0 -z-10 bg-slate-900">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#4f46e5_0,_#020617_55%)] opacity-40" />
      </div>

      {/*  herer is the Modal card */}
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
            onClick={() => alert("Feature to be added soon ")}
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
              value={name}
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
              value={username}
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
          <Link href="/login" className="text-black italic m-6 text-blue-500 ">Already have an account?? Login</Link>
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-500 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition mt-1"
          >
            {loading ? "Creating Account" : "Create Account "}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
            <div className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google sign up */}
          <button
          onClick={() => alert("This Button is coming soon")}
            type="button"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33 30.1 37.5 24 37.5c-7 0-12.6-5.6-12.6-12.6s5.6-12.6 12.6-12.6c3.4 0 6.4 1.3 8.7 3.4l5.6-5.3C37.3 6.9 31.2 4 24 4 12.1 4 2.1 14 2.1 26s10 22 21.9 22c11.7 0 20.6-8.9 20.6-21.8 0-1.2-.1-2.4-.3-3.6z"
                />
              </defs>
              <clipPath id="b">
                <use href="#a" overflow="visible" />
              </clipPath>
              <path
                clipPath="url(#b)"
                fill="#FBBC05"
                d="M0 37V11l17 13z"
              />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7 6.5V11z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M24 44.5l6.5-6.5h14.2c-.3 1.2-.6 2.4-.8 3.6-2 3.8-5.3 6.6-9.4 8.7L24 44.5z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M44.5 20c0-.8-.1-1.6-.2-2.4l-15-11V20z"
              />
            </svg>

            <span>Sign in with Google</span>
          
          </button>

         
        </form>

        {/* Terms text */}
        <p className="mt-4 text-[10px] text-center text-slate-400 leading-snug">
          By creating an account, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> &amp;{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </main>
  )
}
