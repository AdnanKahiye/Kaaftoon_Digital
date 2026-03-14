"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Send } from "lucide-react";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F1115] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Brand Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D51116]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F39220]/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block group">
              <h3 className="text-2xl font-black tracking-tighter text-white">
                kafton<span className="text-[#D51116] group-hover:text-[#F39220] transition-colors duration-300">Digital</span>
              </h3>
            </Link>
            
            <p className="mt-6 max-w-sm text-gray-400 font-medium leading-relaxed">
              Empowering businesses with cutting-edge ICT solutions, from professional 
              branding and web development to strategic social media management.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-4 mt-8">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <button 
                  key={idx} 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-[#D51116] hover:text-white hover:bg-[#D51116]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#F39220] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Services", "Portfolio", "Contact", "About Us"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`} 
                    className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#D51116] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#F39220] mb-8">
              Contact
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#D51116] group-hover:bg-[#D51116] group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Email</p>
                  <p className="text-sm font-bold text-white">info@kaftondigital.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#D51116] group-hover:bg-[#D51116] group-hover:text-white transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Call Us</p>
                  <p className="text-sm font-bold text-white">+252 612024843</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#D51116] group-hover:bg-[#D51116] group-hover:text-white transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Location</p>
                  <p className="text-sm font-bold text-white">Mogadishu, Somalia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-gray-500 tracking-widest uppercase">
            © {currentYear} KAFTON DIGITAL. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors tracking-widest">
              PRIVACY
            </Link>
            <Link href="/terms" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors tracking-widest">
              TERMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}