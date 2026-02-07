import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-[#D51116] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold text-white">
              kafton<span className="text-[#F39220]">Digital</span>
            </h3>

            <p className="mt-4 max-w-md text-sm text-[#FFECCD] leading-relaxed">
              We provide professional ICT & digital solutions including
              video editing, graphic design, branding, web & application
              development, and social media management.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/services" className="hover:text-[#FFECCD] transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#FFECCD] transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFECCD] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#FFECCD]">
              <li>
                <span className="text-white font-medium">Email:</span>{" "}
                info@kaftondigital.com
              </li>
              <li>
                <span className="text-white font-medium">Phone:</span>{" "}
                +252 XXX XXX XXX
              </li>
              <li>
                <span className="text-white font-medium">Location:</span>{" "}
                Somalia
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-[#F39220] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-[#FFECCD]">
            © {new Date().getFullYear()} Kafton Digital Solution. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-[#FFECCD] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FFECCD] transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
