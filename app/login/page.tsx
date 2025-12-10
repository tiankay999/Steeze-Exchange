"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error("Failed to login")
      }


      const data = await response.json()

      console.log(data.token)
      localStorage.setItem("token", data.token)

      router.push("/home")
    } catch (err) {
      const msg = "Failed to Login Try Again"
      setError(msg)
    } finally {
       if(error){
        setLoading(false)
       }else{
          setLoading(true)
       }
    }
    



  };

  return (
    <main className="min-h-screen w-full bg-slate-900/60 flex items-center justify-center bg-[url('/blurry.png')]">
      {/* blurred background  */}
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
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-violet-500 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            <div className="text-xs text-slate-400">
              Don't have an account? <a href="/signup" className="text-violet-500 hover:underline">Register</a>
            </div>  
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
          </button>
          {/* Social icons row */}
          <div className="flex justify-center gap-4 mt-4">
            {/* Facebook Button */}
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition"
              aria-label="Login with Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.271 0-4.192 1.512-4.192 4.442v2.558z" />
              </svg>
            </button>

            {/* Trust Wallet Button */}
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition"
              aria-label="Connect Trust Wallet"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3375BB">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="m11.176 15.658-.802-1.353-.847 1.353h-.846l1.378-2.146-1.554-2.48h.848l.951 1.621.821-1.621h.839l-1.642 2.508 1.488 2.096zM15.42 12.396c.263-.448.395-.918.395-1.408 0-1.127-.404-2.028-1.214-2.704-.81-.676-1.802-1.014-2.976-1.014-.403 0-.796.038-1.18.113l-.401-.849H8.97l.872 1.848c-.287.05-.568.106-.843.169-1.312.3-2.316.924-3.012 1.875-.696.95-.992 2.15-.887 3.593.105 1.442.585 2.651 1.44 3.626.854.976 1.942 1.625 3.264 1.947 1.322.321 2.673.238 4.053-.25 1.38-.488 2.544-1.327 3.493-2.518.949-1.191 1.472-2.677 1.57-4.457.098-1.78-.175-3.284-.82-4.475zm-3.561 6.848c-1.304 0-2.355-.386-3.153-1.159-.798-.773-1.197-1.89-1.197-3.35c0-1.365.378-2.463 1.135-3.295.756-.832 1.764-1.248 3.023-1.248 1.157 0 2.083.332 2.778.995.694.663 1.042 1.603 1.042 2.82 0 1.258-.396 2.298-1.189 3.12-.794.822-1.815 1.233-3.064 1.233zM12.981 12.012c.112-.047.227-.07.344-.07.24 0 .428.07.564.21.136.14.204.35.204.63 0 .28-.068.49-.204.63s-.324.21-.564.21c-.116 0-.231-.023-.344-.07l-.375.794h-.54l.758-1.588z" />
              </svg>
            </button>


            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition"
              aria-label="Login with GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#181717">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.19 6.839 9.504.5.092.682-.217.682-.483 0-.237-.007-.866-.012-1.699-2.781.602-3.368-1.34-3.368-1.34-.454-1.157-1.107-1.464-1.107-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.087 2.91.829.091-.645.35-1.087.636-1.338-2.22-.253-4.555-1.113-4.555-4.949 0-1.096.392-1.997 1.03-2.705-.103-.255-.446-1.285.098-2.671 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.386.202 2.416.1 2.671.638.708 1.029 1.609 1.029 2.705 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.482C21.137 20.217 24 16.444 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" />
              </svg>
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
