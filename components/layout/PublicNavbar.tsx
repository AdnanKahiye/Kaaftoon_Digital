"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Phone, Mail } from "lucide-react";

export default function PublicNavbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Xir menu-ga marka meel kale la gujiyo
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-200 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:info@kaaftoon.com"
              className="flex items-center gap-2 hover:text-orange-400"
            >
              <Mail className="h-4 w-4 text-orange-500" />
              info@kaaftoon.com
            </a>

            <a
              href="tel:+252610000000"
              className="flex items-center gap-2 hover:text-orange-400"
            >
              <Phone className="h-4 w-4 text-orange-500" />
              +252 61 xxx xxxx
            </a>
          </div>

          <Link
            href="/contact"
            className="rounded-full bg-orange-500 px-4 py-1.5 text-white font-semibold hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <header className="fixed top-[40px] left-0 right-0 z-40 bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold text-gray-900">
            Kaaftoon<span className="text-orange-500">Digital</span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-8 bg-white rounded-full px-10 py-3 shadow-sm">

            <Link href="/" className="font-medium hover:text-orange-500">
              Home
            </Link>

            {/* ===== SERVICES (CLICK BASED – XASILOON) ===== */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen((prev) => !prev)}
                className="font-medium hover:text-orange-500"
              >
                Services ▾
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full mt-5 -translate-x-1/2 z-50">
                  <MegaMenu closeMenu={() => setServicesOpen(false)} />
                </div>
              )}
            </div>

            <Link href="/products" className="font-medium hover:text-orange-500">
              Products
            </Link>

            <Link href="/resources" className="font-medium hover:text-orange-500">
              Clients
            </Link>

            <Link href="/events" className="font-medium hover:text-orange-500">
              Events
            </Link>
          </nav>

          {/* Login */}
          <Link
            href="/auth/login"
            className="hidden lg:inline-flex rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600"
          >
            Login
          </Link>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="lg:hidden bg-white shadow px-6 py-6">
            <nav className="flex flex-col gap-4 font-medium">
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/products">Products</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/contact">Contact</Link>
              <Link
                href="/auth/login"
                className="mt-4 rounded-full bg-orange-500 py-3 text-center text-white"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
     
    </>
  );
}

/* ================= MEGA MENU ================= */

function MegaMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="w-[900px] bg-white rounded-2xl shadow-xl p-10 grid grid-cols-3 gap-12">

      <MenuColumn
        title="Software Solutions"
        links={[
          ["Web Development", "/services/web"],
          ["Custom Software", "/services/custom"],
          ["Mobile Apps", "/services/mobile"],
          ["ERP Solutions", "/services/erp"],
        ]}
        closeMenu={closeMenu}
      />

      <MenuColumn
        title="Creative Services"
        links={[
          ["Branding", "/services/branding"],
          ["Digital Marketing", "/services/marketing"],
          ["Video Editing", "/services/video"],
        ]}
        closeMenu={closeMenu}
      />

      <MenuColumn
        title="Consultancy"
        links={[
          ["IT Consulting", "/services/it-consulting"],
          ["Digital Strategy", "/services/digital-strategy"],
          ["Business Automation", "/services/automation"],
        ]}
        closeMenu={closeMenu}
      />
    </div>
  );
}

function MenuColumn({
  title,
  links,
  closeMenu,
}: {
  title: string;
  links: [string, string][];
  closeMenu: () => void;
}) {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4 text-gray-900">{title}</h4>
      <ul className="space-y-3 text-gray-600">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              onClick={closeMenu}
              className="hover:text-orange-500 transition"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
