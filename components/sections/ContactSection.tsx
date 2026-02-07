"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


export default function ContactSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-block mb-3 rounded-full
            bg-white px-5 py-1 text-xs font-semibold
            text-[#D51116] uppercase tracking-wide"
          >
            Contact Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116]">
            Let’s Discuss Your Project
          </h2>

          <p className="mt-4 text-gray-700">
            Share your idea with us and let’s turn it into a powerful digital
            solution tailored to your business goals.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT INFO */}
          <div className="space-y-8">
            <p className="text-gray-700 max-w-md">
              We work closely with businesses and individuals to deliver
              innovative, scalable, and reliable digital services. Our team is
              ready to help you move forward.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Address</p>
                  <p className="text-sm text-gray-700">Somalia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Email</p>
                  <p className="text-sm text-gray-700">
                    info@kaaftoondigital.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Phone</p>
                  <p className="text-sm text-gray-700">+252 61 XXX XXX</p>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">WhatsApp</p>
                  <p className="text-sm text-gray-700">
                    +252 61 XXX XXX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-2xl bg-white p-8 shadow-xl border border-[#F39220]/30">
            <form className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-[#D51116]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                  focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D51116]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                  focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D51116]">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                  focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center
                rounded-full bg-[#D51116] px-6 py-3
                text-white font-semibold
                hover:bg-[#F39220] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
