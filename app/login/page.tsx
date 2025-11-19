


export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_45%,_#000_100%)]">
      <div className="relative">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm">
          <div className="px-6 pt-6 pb-5 border-b border-slate-100">
            <p className="text-center text-sm font-semibold text-slate-900">
              Log in or sign up
            </p>
          </div>

          <div className="px-6 py-5 space-y-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">
                W
              </span>
              <span>Continue with a wallet</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button className="w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              Continue
            </button>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-900 hover:bg-slate-50">
                A
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-900 hover:bg-slate-50">
                G
              </button>
            </div>
          </div>

          <div className="px-6 pb-5 pt-1">
            <p className="text-center text-[11px] leading-relaxed text-slate-400">
              By logging in, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-slate-500 underline underline-offset-2"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-slate-500 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

