"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { packageService } from "@/lib/packages";

const TABS = ["Marketing", "Creative", "Software"] as const;
type Tab = typeof TABS[number];

export default function ServicesPackagesSection() {
  const [tab, setTab] = useState<Tab>("Marketing");
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getPackagesOnly();
        const data = response.data;

        if (data.success) {
          setPackages(data.data);
        } else {
          console.error("Packages not found");
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleGetStarted = (
    packageId: string,
    packageName: string,
    tabName: string
  ) => {
    router.push(
      `/package-form?package=${packageId}&name=${encodeURIComponent(
        packageName
      )}&type=${encodeURIComponent(tabName)}`
    );
  };

  return (
    <section className="py-16 md:py-20 bg-[#FFECCD]">
      <div className="mx-auto max-w-6xl px-6 overflow-hidden">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-[#F39220]/20 px-4 py-1 text-xs font-semibold text-[#D51116] uppercase tracking-wide">
            Our price plan for every business size
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116] break-words">
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
        {loading ? (
          <div className="text-center mt-10 text-gray-600">
            Loading packages...
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages
              .filter((pkg) => pkg.type === tab)
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className={`group relative flex flex-col h-full rounded-2xl border bg-white p-8 overflow-hidden
                  transition-all duration-300
                  ${
                    pkg.highlight
                      ? "border-[#D51116] shadow-xl"
                      : "border-[#F39220]/40 shadow-md hover:border-[#D51116]"
                  }`}
                >
                  {/* BADGE */}
                  {pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F39220] px-4 py-1 text-xs font-bold text-white">
                      {pkg.badge}
                    </span>
                  )}

                  {/* HEADER */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#D51116] break-words">
                      {pkg.name}
                    </h3>

                    <div className="mt-3 text-4xl font-extrabold text-gray-900">
                      ${pkg.price}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      package per month
                    </p>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-6 h-px bg-[#F39220]/30" />

                  {/* FEATURES */}
                  <ul className="flex-1 space-y-4 text-sm text-gray-700">
                    {pkg.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 text-[#F39220] shrink-0" />
                        <span className="break-words">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() =>
                      handleGetStarted(pkg.id, pkg.name, tab)
                    }
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold
                    transition-all duration-300
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
        )}
      </div>
    </section>
  );
}