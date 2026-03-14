"use client";

import Link from "next/link";
import { ArrowRight, Activity, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-[#D51116]">
      
      {/* ================= MINIMALIST BACKGROUND ================= */}
      <div className="absolute inset-0 bg-[#D51116]" />
      
      {/* Sharp Geometric Accent */}
      <div 
        className="absolute top-0 right-0 h-full w-1/3 bg-[#F39220] opacity-10" 
        style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      />

      {/* Single Clean Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F39220] opacity-20 blur-[100px]" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: HEADLINE */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-8 rounded-lg bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              <Activity size={12} className="text-[#F39220]" />
              Performance Driven
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-white tracking-tight">
              Scale Your <br />
              <span className="text-[#FFECCD]">Digital Impact</span>
            </h1>

            <p className="mt-6 max-w-lg text-white/90 text-lg leading-relaxed">
              Custom software and high-performance systems designed for 
              businesses that refuse to settle for average.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#D51116] transition-all hover:bg-[#FFECCD]"
              >
                View Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: THE WELCOME CARD */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl overflow-hidden">
               
               {/* Status Badge */}
               <div className="flex items-center gap-2 mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Team Online</span>
               </div>

               {/* Welcome Text */}
               <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">Welcome!</h3>
                  <div className="h-1 w-12 bg-[#F39220] rounded-full mb-4"></div>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Ready to transform your ideas into a powerful digital reality? 
                    Our experts are here to help you build the future.
                  </p>
               </div>

               {/* Stats / Features Inside Card */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                    <Zap size={16} className="text-[#F39220] mb-1" />
                    <span className="text-white font-bold text-sm">Fast Track</span>
                    <span className="text-white/40 text-[10px]">Rapid Deployment</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                    <Activity size={16} className="text-[#FFECCD] mb-1" />
                    <span className="text-white font-bold text-sm">Smart Ops</span>
                    <span className="text-white/40 text-[10px]">AI Integration</span>
                  </div>
               </div>
               
               {/* Aesthetic background circle inside card */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F39220] opacity-10 rounded-full blur-2xl -z-10"></div>
            </div>

            {/* External decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#F39220]/20 rounded-full"></div>
            <div className="absolute -top-10 left-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/20"></div>
          </div>

        </div>
      </div>
    </section>
  );
}