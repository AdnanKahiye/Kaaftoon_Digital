"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity, but most projects are completed within two to six weeks.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We collaborate with startups, small businesses, and growing companies at different stages of their journey.",
  },
  {
    question: "Which technologies do you specialize in?",
    answer:
      "We work with modern technologies including Next.js, React, Tailwind CSS, and scalable backend architectures.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. We provide ongoing maintenance, updates, and technical support after project delivery.",
  },
  {
    question: "Can you customize solutions for my business?",
    answer:
      "Absolutely. Every solution is tailored to match your business goals, users, and growth plans.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#FFECCD]">
      <div className="mx-auto max-w-6xl px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div>
            <span
              className="inline-block mb-4 rounded-full
              bg-white px-5 py-1 text-xs font-semibold
              text-[#D51116] uppercase tracking-wide"
            >
              FAQ’s
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116] leading-tight">
              Frequently Asked <br className="hidden sm:block" />
              Questions
            </h2>

            <p className="mt-4 max-w-md text-gray-700">
              Find clear answers to the most common questions about our services,
              process, and how we help businesses succeed.
            </p>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white
                  border border-[#F39220]/30
                  transition hover:shadow-md"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-[#D51116]">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 items-center justify-center
                      rounded-full border
                      ${
                        isOpen
                          ? "bg-[#D51116] border-[#D51116] text-white"
                          : "border-[#F39220] text-[#D51116]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-40 pb-6" : "max-h-0"}`}
                  >
                    <p className="text-sm text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
