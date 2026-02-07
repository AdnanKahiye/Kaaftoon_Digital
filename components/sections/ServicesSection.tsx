"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const TABS = ["Software", "Creative", "Marketing"] as const;
type Tab = typeof TABS[number];

const PACKAGES: Record<Tab, any[]> = {
  Software: [
    {
      name: "Basic",
      price: "$299",
      badge: "",
      features: [
        "Landing or Business Website",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
      ],
      cta: "/contact",
    },
    {
      name: "Pro",
      price: "$599",
      badge: "POPULAR",
      highlight: true,
      features: [
        "Custom Website",
        "Admin Dashboard",
        "Advanced SEO",
        "Performance Optimization",
        "3 Months Support",
      ],
      cta: "/contact",
    },
    {
      name: "Premium",
      price: "$999",
      badge: "",
      features: [
        "Web Application or System",
        "Custom Features",
        "API Integration",
        "Security Hardening",
        "6 Months Support",
      ],
      cta: "/contact",
    },
  ],
  Creative: [
    {
      name: "Starter",
      price: "$199",
      badge: "",
      features: [
        "Logo Design",
        "Brand Colors",
        "Social Media Kit",
      ],
      cta: "/contact",
    },
    {
      name: "Brand Pro",
      price: "$399",
      badge: "POPULAR",
      highlight: true,
      features: [
        "Full Brand Identity",
        "Logo and Guidelines",
        "Marketing Materials",
        "Unlimited Revisions",
      ],
      cta: "/contact",
    },
    {
      name: "Ultimate",
      price: "$699",
      badge: "",
      features: [
        "Brand and Website UI",
        "Design System",
        "Social Media Templates",
      ],
      cta: "/contact",
    },
  ],
  Marketing: [
    {
      name: "Basic",
      price: "$149",
      badge: "",
      features: [
        "Social Media Setup",
        "Content Calendar",
        "Basic Ads Campaign",
      ],
      cta: "/contact",
    },
    {
      name: "Growth",
      price: "$349",
      badge: "POPULAR",
      highlight: true,
      features: [
        "Ad Campaign Management",
        "SEO Optimization",
        "Analytics and Reports",
      ],
      cta: "/contact",
    },
    {
      name: "Scale",
      price: "$649",
      badge: "",
      features: [
        "Full Funnel Marketing",
        "Email Campaigns",
        "Monthly Strategy Planning",
      ],
      cta: "/contact",
    },
  ],
};

export default function ServicesPackagesSection() {
  const [tab, setTab] = useState<Tab>("Software");

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-orange-500/10 px-4 py-1 text-xs font-semibold text-orange-500 uppercase tracking-wide">
            Our price plan for every business size
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Choose Our Plan
          </h2>
        </div>

        {/* TABS */}
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300
                ${
                  tab === t
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white border border-orange-200 text-orange-600 hover:bg-orange-50"
                }`}
            >
              {t} Packages
            </button>
          ))}
        </div>

        {/* PACKAGES */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES[tab].map((pkg) => (
            <div
              key={pkg.name}
              className={`group relative flex flex-col h-full rounded-2xl border bg-white p-8
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-2xl
                ${
                  pkg.highlight
                    ? "border-orange-500 shadow-xl scale-[1.02]"
                    : "border-gray-200 shadow-md hover:border-orange-400"
                }`}
            >
              {/* BADGE */}
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                  {pkg.badge}
                </span>
              )}

              {/* CARD HEADER */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {pkg.name}
                </h3>

                <div className="mt-3 text-4xl font-extrabold text-gray-900">
                  {pkg.price}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  One time package
                </p>
              </div>

              {/* DIVIDER */}
              <div className="my-6 h-px bg-gray-200" />

              {/* FEATURES */}
              <ul className="flex-1 space-y-4 text-sm text-gray-600">
                {pkg.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={pkg.cta}
                className={`mt-8 inline-flex w-full items-center justify-center
                  rounded-xl px-4 py-3 text-sm font-semibold
                  transition-all duration-300 group-hover:scale-105
                  ${
                    pkg.highlight
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
