"use client";

import { useState } from "react";
import { loginAction, registerAction } from "@/app/actions";

const inputClass = "appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all";
const labelClass = "block text-sm font-medium text-white/70 mb-1";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      let result;
      if (mode === "login") {
        result = await loginAction(formData);
      } else {
        result = await registerAction(formData);
      }

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      if (err.message !== "NEXT_REDIRECT") {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === "register" && (
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Email address</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      {error && (
        <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#0a0a0a] disabled:opacity-50 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Please wait...
            </span>
          ) : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </div>
    </form>
  );
}
