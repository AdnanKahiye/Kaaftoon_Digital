"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Phone, Mail, Facebook, Twitter, Linkedin, X, ChevronDown  ,Music} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function PublicNavbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // NEW: State for mobile dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);

  const serviceLinks = [
    { label: "Software Services", href: "/services/software" },
    { label: "Creative Services", href: "/services/creative" },
    { label: "Consultancy Services", href: "/services/consultancy" },
  ];

  const handleMouseEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#D51116] text-white text-sm">
        <div className="mx-auto max-w-7xl px-6 py-2 grid grid-cols-3 items-center">
          <div className="hidden md:flex items-center gap-6">
            <a href="mailto:info@kaaftontech.com" className="flex items-center gap-2 hover:text-[#FFECCD] transition">
              <Mail className="h-4 w-4 text-[#FFECCD]" />
              info@kaaftontech.com
            </a>
            <a href="tel:+252612024843" className="flex items-center gap-2 hover:text-[#FFECCD] transition">
              <Phone className="h-4 w-4 text-[#FFECCD]" />
              +252 612024843
            </a>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex items-center gap-3 rounded-full bg-[#F39220] px-4 py-1">
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#D51116]">NEW</span>
              <span className="text-white text-xs">Smart digital solutions for businesses</span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            <a href="https://www.facebook.com/share/18fXQ9t7sw/" className="hover:text-[#FFECCD] transition"><Facebook className="h-4 w-4" /></a>
            <a href="https://www.tiktok.com/@kaaftontech01?_r=1&_t=ZS-95HPAUFUERI" className="hover:text-[#FFECCD] transition"><Twitter className="h-4 w-4" /></a>
            <a href="https://www.tiktok.com/@kaaftontech01?_r=1&_t=ZS-95HPAUFUERIh" className="hover:text-[#FFECCD] transition"><Music className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <header className="fixed top-[36px] left-0 right-0 z-40 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/#hero" className="flex items-center group">
      <div className="relative w-[140px] h-[50px] md:w-[170px] md:h-[60px]">
        <Image
          src="/Images/Kaafton-07.png"
          alt="Adnan Kahiye Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
  </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href="/" pathname={pathname}>Home</NavLink>

            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 font-semibold text-gray-800 hover:text-[#D51116] transition">
                Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`
                absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 py-2 transition-all duration-200
                ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
              `}>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFECCD] hover:text-[#D51116] transition"
                    onClick={() => setServicesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink href="/portfolio" pathname={pathname}>Portfolio</NavLink>
            <NavLink href="/packages" pathname={pathname}>Packages</NavLink>
            <NavLink href="/about-us" pathname={pathname}>Who we are</NavLink>
            <NavLink href="/contact" pathname={pathname}>Contact Us</NavLink>
          </nav>

          <Link
            href="/auth/login"
            className="hidden lg:inline-flex rounded-full bg-[#F39220] px-6 py-2.5 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>

          {/* MOBILE BUTTON */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <span className="text-2xl">☰</span>}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t transition-all duration-300 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          <div className="flex flex-col p-6 gap-4 text-center items-center"> {/* Kept centered as requested */}
            <Link href="/" className="text-lg font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Home</Link>
            
            {/* MOBILE SERVICES DROPDOWN */}
            <div className="w-full">
              <button 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-center gap-2 w-full text-lg font-medium text-gray-700"
              >
                Services 
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-60 mt-4" : "max-h-0"}`}>
                <div className="flex flex-col gap-3 bg-gray-50 rounded-lg py-3">
                  {serviceLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className="text-gray-600 hover:text-[#D51116]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/portfolio" className="text-lg font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Portfolio</Link>
            <Link href="/packages" className="text-lg font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Packages</Link>
            <Link href="/about-us" className="text-lg font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Who we are</Link>
            <Link href="/contact" className="text-lg font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            
            <Link href="/auth/login" className="w-full max-w-[200px] bg-[#D51116] text-white text-center py-3 rounded-full font-bold">Login</Link>
          </div>
        </div>
      </header>
    </>
  );
}

function NavLink({ href, pathname, children }: any) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`relative font-semibold transition ${active ? "text-[#D51116]" : "text-gray-700 hover:text-[#D51116]"}
        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#F39220]
        ${active ? "after:w-full" : "after:w-0 hover:after:w-full"} after:transition-all`}
    >
      {children}
    </Link>
  );
}