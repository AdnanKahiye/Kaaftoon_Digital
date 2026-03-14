"use client";

import React from "react";
import {
  CheckCircle,
  Rocket,
  Shield,
  Users,
  ArrowRight,
  Target,
  Zap
} from "lucide-react";

const reasons = [
  {
    title: "Market-Focused Solutions",
    description: "We design solutions that compete, convert, and scale in real markets.",
    icon: Rocket,
  },
  {
    title: "Experienced Digital Team",
    description: "A multidisciplinary team combining design, development, and marketing.",
    icon: Users,
  },
  {
    title: "Quality & Performance",
    description: "Modern tools focused on speed, security, and extreme scalability.",
    icon: Shield,
  },
  {
    title: "Client-Centered Approach",
    description: "Transparent collaboration and a long-term partnership mindset.",
    icon: CheckCircle,
  },
];

const stats = [
  { label: "Happy Clients", value: "70+" },
  { label: "Projects Completed", value: "200+" },
  { label: "Professionals", value: "25+" },
  { label: "Years Experience", value: "6+" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE: CONTENT */}
          <div className="relative">
            <span className="inline-block mb-4 rounded-full bg-[#FFECCD] px-4 py-1.5 text-xs font-bold text-[#D51116] uppercase tracking-wider">
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-[#D51116] leading-[1.1] mb-6">
              Distinction Through <br />
              <span className="text-[#F39220]">Digital Excellence</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
              We don't just build software; we engineer growth. Our approach combines 
              strategic thinking with world-class execution.
            </p>

            {/* FEATURES LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="group flex flex-col items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFECCD] text-[#D51116] mb-4 group-hover:bg-[#F39220] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#D51116] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-snug">
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: MODERN VISUAL COMPONENT */}
          <div className="relative">
            {/* Main Decorative Card */}
            <div className="relative z-10 rounded-3xl bg-gradient-to-br from-[#D51116] to-[#F39220] p-1 shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="rounded-[1.4rem] bg-white p-8 md:p-12">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#F39220]/50 transition-colors">
                    <div className="bg-[#F39220]/10 p-3 rounded-xl text-[#F39220]">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Result Oriented</p>
                      <p className="text-xs text-gray-500">Focusing on your ROI and KPIs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#D51116]/50 transition-colors translate-x-4">
                    <div className="bg-[#D51116]/10 p-3 rounded-xl text-[#D51116]">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Fast Delivery</p>
                      <p className="text-xs text-gray-500">Agile sprints for rapid deployment</p>
                    </div>
                  </div>

                  <div className="mt-4 p-6 rounded-2xl bg-[#D51116] text-white">
                    <p className="text-sm opacity-80 mb-2 italic">"Innovation is our DNA. We thrive on solving the impossible."</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold uppercase tracking-tighter text-lg">Kafton Team</p>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Geometric Elements */}
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-[#F39220]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-[#D51116]/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>

      {/* ================= STATS BAR ================= */}
      <div className="relative bg-[#D51116] py-12">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x-0 md:divide-x divide-white/20">
            {stats.map((stat) => (
              <div key={stat.label} className="group px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#FFECCD]/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}