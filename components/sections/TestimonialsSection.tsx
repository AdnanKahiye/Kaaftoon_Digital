"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Founder, Startup Company",
    message:
      "Working with this team was a game changer. They delivered a professional product that helped us compete confidently in the market.",
    avatar: "/Images/picture.png",
  },
  {
    name: "Sarah Ali",
    role: "Marketing Manager",
    message:
      "Their design and development skills are outstanding. Communication was smooth, delivery was fast, and the quality exceeded expectations.",
    avatar: "/Images/picture.png",
  },
  {
    name: "Mohamed Yusuf",
    role: "Business Owner",
    message:
      "From branding to software development, everything was handled professionally. I highly recommend their services.",
    avatar: "/Images/picture.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-4 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block mb-3 rounded-full
            bg-[#FFECCD] px-4 py-1 text-xs font-bold
            text-[#D51116] uppercase tracking-widest shadow-sm"
          >
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-[#D51116] leading-tight">
            Trusted by Industry <span className="text-[#F39220]">Leaders</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            We value quality, performance, and results. Here is what our partners have to say about our collaboration.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-3xl bg-white p-8 shadow-sm
              border border-gray-100 transition-all duration-500
              hover:-translate-y-2 hover:shadow-2xl hover:border-[#F39220]/40"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-gray-100 group-hover:text-[#F39220]/10 transition-colors">
                <Quote size={48} fill="currentColor" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 text-[#F39220]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="relative z-10 text-gray-700 leading-relaxed mb-8 italic">
                “{item.message}”
              </p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div
                  className="relative h-14 w-14 overflow-hidden rounded-2xl
                  border-2 border-white shadow-md transition-transform group-hover:scale-110"
                >
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-[#D51116] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs font-medium text-[#F39220] uppercase tracking-wide">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}