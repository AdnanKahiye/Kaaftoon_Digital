import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold text-white">
              kafton<span className="text-orange-500">Digital</span>
            </h3>

            <p className="mt-4 max-w-md text-sm text-gray-400 leading-relaxed">
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
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
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
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
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
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Kaaftoon Digital Solution. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
