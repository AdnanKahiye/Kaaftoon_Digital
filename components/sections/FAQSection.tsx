"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Kaaftoon digital ?",
    answer: "Kaaftoon digital is a full-service digital agency that helps businesses transform their online presence through innovative web and mobile solutions.",
  },
  {
    question: "What is the mission of Kaaftoon digital ?",
    answer: "Our mission is to empower businesses with cutting-edge digital solutions that drive growth, enhance user experience, and create lasting impact in the digital landscape.",
  },
  {
    question: "what is the vision of Kaaftoon digital ? ",
    answer: "Our vision is to be a leading digital agency recognized for our creativity, innovation, and commitment to delivering exceptional results for our clients worldwide.",},
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. We provide ongoing maintenance, updates, and technical support after project delivery.",
  },
  {
    question: "Can you customize solutions for my business?",
    answer: "Absolutely. Every solution is tailored to match your business goals, users, and growth plans.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Set first item open by default for better UX

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      
      {/* Background Decoration (Matches Services Section) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 40h40M40 0v40' stroke='%23D51116' stroke-width='1' fill='none'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT CONTENT (Sticky Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-gray-50 border border-gray-100 px-4 py-1.5 text-[11px] font-bold text-[#D51116] uppercase tracking-[0.2em]">
              <HelpCircle size={14} className="text-[#F39220]" />
              Support Center
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Common <span className="text-[#D51116]">Questions</span> <br />
              Expert Answers.
            </h2>

            <p className="max-w-md text-gray-500 font-medium text-lg leading-relaxed">
              Everything you need to know about our process, technology, and how we drive results for your business.
            </p>
            
            <div className="mt-10 p-6 rounded-3xl bg-gray-50 border border-gray-100">
               <p className="text-sm font-bold text-gray-900 mb-2">Still have questions?</p>
               <p className="text-sm text-gray-500 mb-4 text-pretty">We’re here to help you navigate your digital transformation.</p>
               <button className="text-[#D51116] text-sm font-black uppercase tracking-widest hover:text-[#F39220] transition-colors">
                  Contact Support →
               </button>
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`group rounded-[2rem] transition-all duration-500
                  ${isOpen 
                    ? "bg-white border-2 border-[#D51116] shadow-[0_20px_40px_-15px_rgba(213,17,22,0.1)]" 
                    : "bg-white border border-gray-100 hover:border-[#F39220]/40 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-8 py-7 text-left"
                  >
                    <span className={`text-lg font-bold transition-colors duration-300
                      ${isOpen ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"}`}>
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500
                      ${isOpen
                          ? "bg-[#D51116] text-white rotate-0"
                          : "bg-gray-50 text-gray-400 group-hover:bg-[#FFECCD] group-hover:text-[#D51116]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5" strokeWidth={3} />
                      ) : (
                        <Plus className="h-5 w-5" strokeWidth={3} />
                      )}
                    </span>
                  </button>

                  <div
                    className={`px-8 overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-60 pb-8 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pt-2 border-t border-gray-50">
                       <p className="mt-4 text-gray-500 font-medium leading-relaxed">
                         {faq.answer}
                       </p>
                    </div>
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