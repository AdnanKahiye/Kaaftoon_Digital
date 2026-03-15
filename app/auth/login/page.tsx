"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Lock, Mail, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("The credentials you entered don't match our records.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      
      {/* Background Decoration (Matching your Landing Page) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 40h40M40 0v40' stroke='%23D51116' stroke-width='1' fill='none'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D51116]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative w-full max-w-md px-6">

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm font-medium text-gray-400">Please enter your details to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D51116] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-12 py-4 text-sm font-semibold text-gray-900 outline-none transition-all focus:border-[#D51116] focus:bg-white focus:ring-4 focus:ring-[#D51116]/5"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-black text-[#D51116] hover:text-[#F39220] transition-colors uppercase tracking-tighter">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D51116] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-12 py-4 text-sm font-semibold text-gray-900 outline-none transition-all focus:border-[#D51116] focus:bg-white focus:ring-4 focus:ring-[#D51116]/5"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#F39220] py-4 font-black text-xs uppercase tracking-[0.2em] text-white transition-all hover:bg-[#D51116] disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Secure encrypted login • © {new Date().getFullYear()} Kafton Digital
        </p>
      </div>
    </div>
  );
}