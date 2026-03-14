"use client";

import React from "react";
import Image from "next/image";
import { 
  Code2, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Megaphone, 
  Settings 
} from "lucide-react";

const services = [
  {
    title: "Software Development",
    description: "Custom-built web and mobile applications designed to scale with your growing business needs.",
    icon: <Code2 className="w-5 h-5" />,
    image: "/Images/software.jpg", // Replace with your image paths
  },
  {
    title: "Creative Branding",
    description: "Crafting unique visual identities and brand stories that resonate with your target audience.",
    icon: <Palette className="w-5 h-5" />,
    image: "/Images/design.jpg",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to boost your online presence and convert visitors into loyal customers.",
    icon: <Megaphone className="w-5 h-5" />,
    image: "/Images/digital.jpg",
  },
  {
    title: "Business Consultancy",
    description: "Expert advice on system optimization and startup growth to keep you ahead of the competition.",
    icon: <BarChart3 className="w-5 h-5" />,
    image: "/Images/consol.jpg",
  },
  {
    title: "UI/UX Design",
    description: "User-centric designs that ensure your digital products are intuitive, engaging, and beautiful.",
    icon: <Smartphone className="w-5 h-5" />,
    image: "/Images/figma.jpg",
  },
  {
    title: "System Integration",
    description: "Connecting your business tools into a seamless ecosystem for maximum efficiency.",
    icon: <Settings className="w-5 h-5" />,
    image: "/Images/api.png",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Header - Matches your Testimonials section */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block mb-3 rounded-full
            bg-white px-4 py-1 text-xs font-semibold
            text-[#D51116] uppercase border border-gray-100 shadow-sm"
          >
            What We Offer
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116]">
            Smart Solutions for <span className="text-[#F39220]">Digital Growth</span>
          </h2>

          <p className="mt-4 text-gray-700">
            We combine technical expertise with creative vision to help your business 
            thrive in the modern digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group overflow-hidden rounded-2xl bg-white shadow
              border border-[#F39220]/30
              hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating Icon Bagde */}
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-lg text-[#D51116]">
                  {service.icon}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#D51116] mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Action Link */}
                <div className="flex items-center text-sm font-bold text-[#F39220] cursor-pointer group/link">
                  Learn More 
                  <span className="ml-2 transition-all duration-300 group-hover/link:ml-4"> → </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}