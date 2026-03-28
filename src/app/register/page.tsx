import Link from "next/link";
import AuthForm from "../login/AuthForm";
import { Calendar } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-8">
          <Calendar className="w-7 h-7 text-indigo-400" />
          <span className="text-white font-bold text-xl">Cal.com</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Get started for free
        </h2>
        <p className="mt-2 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/5 backdrop-blur-xl py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-white/10">
          <AuthForm mode="register" />
        </div>
      </div>
    </div>
  );
}
