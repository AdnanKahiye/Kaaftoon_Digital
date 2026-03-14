"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { packageService } from "@/lib/packages";

const TABS = ["Digital Marketing", "Branding & Identity"] as const;
type Tab = typeof TABS[number];

export default function ServicesPackagesSection() {
  const [tab, setTab] = useState<Tab>("Digital Marketing");
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
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleGetStarted = (packageId: string, packageName: string, tabName: string) => {
    router.push(
      `/package-form?package=${packageId}&name=${encodeURIComponent(packageName)}&type=${encodeURIComponent(tabName)}`
    );
  };

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 40h40M40 0v40' stroke='%23D51116' stroke-width='1' fill='none'/%3E%3C/svg%3E")` }} 
      />
      
      <div className="relative mx-auto max-w-6xl px-4">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-gray-50 border border-gray-100 px-4 py-1.5 text-[11px] font-bold text-[#D51116] uppercase tracking-[0.2em]">
            <Sparkles size={14} className="text-[#F39220]" />
            Pricing Plans
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Tailored Solutions for <br />
            <span className="text-[#D51116]">Every Business</span>
          </h2>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex p-1 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-8 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 whitespace-nowrap
                ${tab === t 
                  ? "bg-white text-[#D51116] shadow-sm border border-gray-100" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* PACKAGES GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-2 border-[#D51116]/20 border-t-[#D51116] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {packages
              .filter((pkg) => pkg.type === tab)
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className={`group relative flex flex-col h-full rounded-3xl bg-white p-10 transition-all duration-500
                  ${pkg.highlight 
                    ? "border-2 border-[#D51116] shadow-2xl z-10 scale-[1.02]" 
                    : "border border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200"
                  }`}
                >
                  {/* LABEL */}
                  <p className="text-[10px] font-black text-[#F39220] uppercase tracking-[0.2em] mb-4">
                    {pkg.name}
                  </p>

                  {/* PRICE */}
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-6xl font-black text-gray-900 tracking-tighter">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      / mo
                    </span>
                  </div>

                  {/* FEATURES LIST (flex-1 pushes the button down) */}
                  <div className="flex-1 space-y-5 mb-12">
                    {pkg.features.map((f: string) => (
                      <div key={f} className="flex items-start gap-3 group/item">
                        {/* Red Brand Tick */}
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D51116]/10 text-[#D51116]">
                          <Check className="h-3 w-3" strokeWidth={4} />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 leading-tight">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA BUTTON */}
                  <button
                    onClick={() => handleGetStarted(pkg.id, pkg.name, tab)}
                    className={`group/btn mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300
                    ${pkg.highlight 
                      ? "bg-[#D51116] text-white hover:bg-[#F39220]" 
                      : "bg-gray-50 text-gray-900 hover:bg-[#D51116] hover:text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}