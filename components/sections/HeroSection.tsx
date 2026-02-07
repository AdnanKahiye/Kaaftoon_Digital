"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const backgrounds = [
  "/Images/hero-bg-1.jpg",
  "/Images/hero-bg-2.jpg",
];

export default function HeroSection() {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % backgrounds.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const nextBg = () => {
    setActiveBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBg = () => {
    setActiveBg((prev) =>
      prev === 0 ? backgrounds.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      {/* ================= BACKGROUND SLIDER ================= */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            activeBg === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={bg}
            alt="MaanSoft Hero Background"
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/65" />

      {/* ================= NAVIGATION ARROWS ================= */}
  <button
  onClick={prevBg}
  className="hidden md:flex absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-orange-500 transition"
  aria-label="Previous slide"
>
  <ChevronLeft size={26} />
</button>


<button
  onClick={nextBg}
  className="hidden md:flex absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-orange-500 transition"
  aria-label="Next slide"
>
  <ChevronRight size={26} />
</button>


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-6xl px-6 text-center lg:text-left">

          {/* Badge */}
          <span className="inline-block mb-6 rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-1.5 text-xs font-semibold text-orange-400 uppercase tracking-wide">
            All-in-one Digital Partner
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] max-w-3xl text-white">
            Let’s Elevate Your <br />
            <span className="text-orange-500">Digital Growth</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-gray-200 text-lg">
            We design and build software, digital platforms, and business systems
            that help organizations operate smarter, scale faster, and succeed
            in a competitive digital landscape.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start">
            <Link
              href="/services"
              className="rounded-full bg-orange-500 px-9 py-3 font-semibold text-white hover:bg-orange-600 transition"
            >
              Our Services
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-9 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
