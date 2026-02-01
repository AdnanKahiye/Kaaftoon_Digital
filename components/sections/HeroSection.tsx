import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <span className="inline-block mb-4 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 tracking-wide uppercase">
            We are the best for
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Make Creative Products <br className="hidden sm:block" />
            with Our Agency
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-gray-600">
            We help businesses grow through professional video editing,
            branding, software development, and modern digital solutions.
            From idea to execution — we bring your vision to life.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              Our Services
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3 font-semibold text-gray-700 hover:border-gray-400 transition"
            >
              Start your journey
            </Link>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full h-[360px] lg:h-[420px] lg:-ml-6 hidden lg:block">
          <Image
            src="/Images/heroimg.png"
            alt="Digital Services Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}