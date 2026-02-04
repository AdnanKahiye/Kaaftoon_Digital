"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Phone, Mail } from "lucide-react";

export default function PublicNavbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-200 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:info@maansoft.com"
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              <Mail className="h-4 w-4 text-orange-500" />
              info@maansoft.com
            </a>

            <a
              href="tel:+252610000000"
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              <Phone className="h-4 w-4 text-orange-500" />
              +252 61 xxx xxxx
            </a>
          </div>

          <Link
            href="/contact"
            className="rounded-full bg-orange-500 px-4 py-1.5 text-white font-semibold hover:bg-orange-600 transition"
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
            Maan<span className="text-orange-500">Soft</span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-8 bg-white rounded-full px-10 py-3 shadow-sm">

            <Link href="/" className="font-medium hover:text-orange-500 transition">
              Home
            </Link>

            {/* ===== SERVICES (HOVER + CLICK SAFE) ===== */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setServicesOpen(false);
                }, 200);
              }}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((p) => !p)}
                className="font-medium hover:text-orange-500 transition"
              >
                Services ▾
              </button>

              <div
                className={`absolute left-1/2 top-full mt-5 -translate-x-1/2 z-50
                transition-all duration-200 ease-out
                ${servicesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                onMouseEnter={() => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                }}
                onMouseLeave={() => {
                  closeTimeout.current = setTimeout(() => {
                    setServicesOpen(false);
                  }, 200);
                }}
              >
                <MegaMenu closeMenu={() => setServicesOpen(false)} />
              </div>
            </div>

            <Link href="/freelancer" className="font-medium hover:text-orange-500 transition">
              Freelancer
            </Link>

            <Link href="/articles" className="font-medium hover:text-orange-500 transition">
              Articles
            </Link>

            <Link href="/packages" className="font-medium hover:text-orange-500 transition">
              Packages
            </Link>
          </nav>

          {/* Login */}
          <Link
            href="/auth/login"
            className="hidden lg:inline-flex rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
          >
            Login
          </Link>

          {/* Mobile */}
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
              <Link href="/freelancer">Freelancer</Link>
              <Link href="/articles">Articles</Link>
              <Link href="/packages">Packages</Link>
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
    </>
  );
}

/* ================= MEGA MENU ================= */

function MegaMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="w-[900px] bg-white rounded-2xl shadow-xl p-10 grid grid-cols-3 gap-12">
      <MenuColumn
        title="Software Services"
        links={[
          ["Business Website", "/services/web"],
          ["Personal Website", "/services/personal"],
          ["Business Application", "/services/erp"],
        ]}
        closeMenu={closeMenu}
      />
      <MenuColumn
        title="Creative Services"
        links={[
          ["Business Branding", "/services/branding"],
          ["Digital Marketing", "/services/marketing"],
          ["Social Media Management", "/services/social-media"],
          ["Content Creation", "/services/content-creation"],
        ]}
        closeMenu={closeMenu}
      />
      <MenuColumn
        title="Coaching Services"
        links={[
          ["Backend Development & APIs", "/services/web-development-coaching"],
          ["Relational Databases & SQL", "/services/relational-databases-sql-coaching"],
          ["Software Architecture Design", "/services/software-architecture-coaching"],
          ["DevOps & Containerization", "/services/devops-docker"],
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
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-gray-600
                         hover:bg-orange-50 hover:text-orange-500 transition"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
