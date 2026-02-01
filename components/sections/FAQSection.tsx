"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does a project usually take?",
    answer:
      "Project timelines depend on the scope and complexity. Most projects are delivered within 2–6 weeks.",
  },
  {
    question: "Do you work with small businesses and startups?",
    answer:
      "Yes. We work with startups, small businesses, and growing companies looking to compete in the market.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern technologies such as Next.js, React, Tailwind CSS, and scalable backend solutions.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Absolutely. We offer ongoing maintenance, updates, and support after project delivery.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4">

        {/* Header */}
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 uppercase">
            FAQ
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600">
            Answers to common questions about our services and process.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
