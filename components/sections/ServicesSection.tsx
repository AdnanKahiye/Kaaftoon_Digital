"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const TABS = ["Marketing", "Creative", "Software"] as const;
type Tab = typeof TABS[number];

const PACKAGES: Record<Tab, any[]> = {
  Software: [
    {
      id: "software-basic",
      name: "Basic",
      price: "$299",
      badge: "",
      features: [
        "Landing or Business Website",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
      ],
    },
    {
      id: "software-special",
      name: "Special",
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
    },
    {
      id: "software-advanced",
      name: "Advanced",
      price: "$999",
      badge: "",
      features: [
        "Web Application or System",
        "Custom Features",
        "API Integration",
        "Security Hardening",
        "6 Months Support",
      ],
    },
  ],
  Creative: [
    {
      id: "creative-starter",
      name: "Starter",
      price: "$99.99",
      badge: "",
      features: ["4 Post Design", "4 Videos", "Normal Logo", "Facebook Management", "Idea Creation"],
    },
    {
      id: "creative-special",
      name: "Special Package",
      price: "$299.99",
      badge: "POPULAR",
      highlight: true,
      features: [
        "12 Post Design",
        "Daily Videos",
        "Video Animation",
        "Manage Platforms",
        "Daily Support",
      ],
    },
    {
      id: "creative-advanced",
      name: "Advanced Package",
      price: "$199.99",
      badge: "",
      features: [
        "8 Post Design",
        "8 Videos",
        "Logo Animation",
        "TikTok + FB Management",
        "Idea Creation",
      ],
    },
  ],
  Marketing: [
    {
      id: "marketing-basic",
      name: "Basic",
      price: "$149",
      badge: "",
      features: [
        "Social Media Setup",
        "Content Calendar",
        "Basic Ads Campaign",
      ],
    },
    {
      id: "marketing-growth",
      name: "Growth",
      price: "$349",
      badge: "POPULAR",
      highlight: true,
      features: [
        "Ad Campaign Management",
        "SEO Optimization",
        "Analytics and Reports",
      ],
    },
    {
      id: "marketing-scale",
      name: "Scale",
      price: "$649",
      badge: "",
      features: [
        "Full Funnel Marketing",
        "Email Campaigns",
        "Monthly Strategy Planning",
      ],
    },
  ],
};

export default function ServicesPackagesSection() {
  const [tab, setTab] = useState<Tab>("Marketing");
  const router = useRouter();

  const handleGetStarted = (packageId: string, packageName: string, tabName: string) => {
    // Navigate to form page with package details in query params
    router.push(`/package-form?package=${packageId}&name=${encodeURIComponent(packageName)}&type=${encodeURIComponent(tabName)}`);
  };

  return (
    <section className="py-16 md:py-20 bg-[#FFECCD]">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-[#F39220]/20 px-4 py-1 text-xs font-semibold text-[#D51116] uppercase tracking-wide">
            Our price plan for every business size
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116]">
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
                    ? "bg-[#D51116] text-white shadow-md"
                    : "bg-white border border-[#F39220] text-[#D51116] hover:bg-[#FFECCD]"
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
              key={pkg.id}
              className={`group relative flex flex-col h-full rounded-2xl border bg-white p-8
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-2xl
                ${
                  pkg.highlight
                    ? "border-[#D51116] shadow-xl scale-[1.03]"
                    : "border-[#F39220]/40 shadow-md hover:border-[#D51116]"
                }`}
            >
              {/* BADGE */}
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F39220] px-4 py-1 text-xs font-bold text-white">
                  {pkg.badge}
                </span>
              )}

              {/* CARD HEADER */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#D51116]">
                  {pkg.name}
                </h3>

                <div className="mt-3 text-4xl font-extrabold text-gray-900">
                  {pkg.price}
                </div>

                <p className="mt-1 text-sm text-gray-500">package per month</p>
              </div>

              {/* DIVIDER */}
              <div className="my-6 h-px bg-[#F39220]/30" />

              {/* FEATURES */}
              <ul className="flex-1 space-y-4 text-sm text-gray-700">
                {pkg.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-[#F39220] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleGetStarted(pkg.id, pkg.name, tab)}
                className={`mt-8 inline-flex w-full items-center justify-center
                  rounded-xl px-4 py-3 text-sm font-semibold
                  transition-all duration-300 group-hover:scale-105
                  ${
                    pkg.highlight
                      ? "bg-[#D51116] text-white hover:bg-[#F39220]"
                      : "bg-gray-900 text-white hover:bg-[#D51116]"
                  }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}