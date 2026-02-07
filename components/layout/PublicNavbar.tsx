"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Linkedin } from "lucide-react";


export default function PublicNavbar() {
  const pathname = usePathname();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [freelancerOpen, setFreelancerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);
  const freelancerTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-200 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-2 grid grid-cols-3 items-center">
          <div className="hidden md:flex items-center gap-6">
            <a href="mailto:info@kaftondigital.com" className="flex items-center gap-2 hover:text-orange-400 transition">
              <Mail className="h-4 w-4 text-orange-500" />
              info@kaftondigital.com
            </a>
            <a href="tel:+252610000000" className="flex items-center gap-2 hover:text-orange-400 transition">
              <Phone className="h-4 w-4 text-orange-500" />
              +252 61 xxx xxxx
            </a>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex items-center gap-3 rounded-full bg-gray-800 px-4 py-1 hover:bg-gray-700 transition">
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                NEW
              </span>
              <span className="text-gray-300 hover:text-white transition">
                Smart digital solutions for growing businesses
              </span>
            </div>
          </div>

        <div className="flex justify-end items-center gap-4">
  <a href="https://facebook.com" target="_blank" className="hover:text-orange-400 transition">
    <Facebook className="h-5 w-5" />
  </a>
  <a href="https://twitter.com" target="_blank" className="hover:text-orange-400 transition">
    <Twitter className="h-5 w-5" />
  </a>
  <a href="https://linkedin.com" target="_blank" className="hover:text-orange-400 transition">
    <Linkedin className="h-5 w-5" />
  </a>
</div>

        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <header className="fixed top-[40px] left-0 right-0 z-40 bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* LOGO = HOME */}
          <Link href="/" className="text-3xl font-extrabold text-gray-900">
            Kafton<span className="text-orange-500">Digital</span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-12">

            {/* FREELANCER */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (freelancerTimeout.current) clearTimeout(freelancerTimeout.current);
                setFreelancerOpen(true);
              }}
              onMouseLeave={() => {
                freelancerTimeout.current = setTimeout(() => {
                  setFreelancerOpen(false);
                }, 250);
              }}
            >
              <button
                className={`relative transition
                  ${pathname.startsWith("/freelancer")
                    ? "font-bold text-orange-500"
                    : "font-medium text-gray-700 hover:text-orange-500"}
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:bg-orange-500 after:transition-all
                  ${pathname.startsWith("/freelancer")
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"}
                `}
              >
                Freelancer ▾
              </button>

              <div
                className={`absolute left-1/2 mt-5 -translate-x-1/2 w-64
                rounded-xl bg-white shadow-xl border border-gray-100 p-4 z-50
                transition-all duration-200
                ${freelancerOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
                onMouseEnter={() => {
                  if (freelancerTimeout.current) clearTimeout(freelancerTimeout.current);
                }}
                onMouseLeave={() => {
                  freelancerTimeout.current = setTimeout(() => {
                    setFreelancerOpen(false);
                  }, 250);
                }}
              >
           <ul className="space-y-2">
  <DropdownItem href="/freelancer/hire">Hire a Freelancer</DropdownItem>
  <DropdownItem href="/freelancer/join">Join as a Freelancer</DropdownItem>
  <DropdownItem href="/freelancer/how-it-works">How It Works</DropdownItem>
  <DropdownItem href="/freelancer/pricing">Pricing & Commission</DropdownItem>
  <DropdownItem href="/freelancer/faq">Freelancer FAQ</DropdownItem>
</ul>

              </div>
            </div>

            {/* SERVICES */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                servicesTimeout.current = setTimeout(() => {
                  setServicesOpen(false);
                }, 250);
              }}
            >
              <button className="relative font-semibold text-gray-800 hover:text-orange-500 transition">
                Services ▾
              </button>

              <div
                className={`absolute left-1/2 mt-5 -translate-x-1/2 z-50
                transition-all duration-200
                ${servicesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
                onMouseEnter={() => {
                  if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
                }}
                onMouseLeave={() => {
                  servicesTimeout.current = setTimeout(() => {
                    setServicesOpen(false);
                  }, 250);
                }}
              >
                <MegaMenu closeMenu={() => setServicesOpen(false)} />
              </div>
            </div>

            {/* RIGHT */}
            <NavLink href="/portfolio" pathname={pathname}>Portfolio</NavLink>
            <NavLink href="/packages" pathname={pathname}>Packages</NavLink>
            <NavLink href="/blogs" pathname={pathname}>Blogs</NavLink>
            <NavLink href="/contact" pathname={pathname}>Contact Us</NavLink>
          </nav>

          {/* LOGIN */}
          <Link href="/auth/login" className="hidden lg:inline-flex rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition">
            Login
          </Link>

          {/* MOBILE */}
          <button className="lg:hidden text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white shadow px-6 py-6">
            <nav className="flex flex-col gap-4 font-medium">
              <Link href="/freelancer">Freelancer</Link>
              <Link href="/services">Services</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

/* ================= NAV LINK ================= */
function NavLink({ href, pathname, children }: any) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`relative transition
        ${active ? "font-bold text-orange-500" : "font-medium text-gray-700 hover:text-orange-500"}
        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500
        ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}
        after:transition-all`}
    >
      {children}
    </Link>
  );
}

/* ================= DROPDOWN ITEM ================= */
function DropdownItem({ href, children }: any) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition"
    >
      {children}
    </Link>
  );
}

/* ================= MEGA MENU ================= */
function MegaMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="w-[900px] bg-white rounded-2xl shadow-xl p-10 grid grid-cols-3 gap-12 border border-gray-100">
      <MenuColumn title="Software Services" links={[
        ["Business Website", "/services/software/business-website"],
        ["Personal Website", "/services/software/personal-website"],
        ["Business Application", "/services/software/business-application"],
      ]} closeMenu={closeMenu} />

      <MenuColumn title="Creative Services" links={[
        ["Business Branding", "/services/creative/business-branding"],
        ["Digital Marketing", "/services/creative/digital-marketing"],
        ["Social Media Management", "/services/creative/social-media"],
        ["Content Creation", "/services/creative/content-creation"],
      ]} closeMenu={closeMenu} />

<MenuColumn
  title="Consultancy Services"
  links={[
    ["IT Consulting", "/services/consultancy/it"],
    ["Business Systems Consulting", "/services/consultancy/business-systems"],
    ["Security Consulting", "/services/consultancy/security"],
    ["Startup & Tech Advisory", "/services/consultancy/startup"],
  ]}
  closeMenu={closeMenu}
/>



    </div>
  );
}

function MenuColumn({ title, links, closeMenu }: any) {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, href]: any) => (
          <li key={label}>
            <Link href={href} onClick={closeMenu}
              className="flex justify-between rounded-lg px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
              {label} <span>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
