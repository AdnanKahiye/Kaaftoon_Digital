import Link from "next/link";
import {
  Code2,
  Palette,
  Globe,
  Video,
  Megaphone,
  LayoutDashboard,
} from "lucide-react";

const services = [
  {
    title: "Software Development",
    description:
      "Custom web and mobile applications built with modern, scalable technologies.",
    icon: Code2,
    color: "text-orange-500",
    href: "/services/software",
  },
  {
    title: "Branding & Design",
    description:
      "Professional branding, logo design, and visual identity for your business.",
    icon: Palette,
    color: "text-yellow-500",
    href: "/services/branding",
  },
  {
    title: "Web Development",
    description:
      "Fast, responsive, and SEO-friendly websites that convert visitors.",
    icon: Globe,
    color: "text-blue-500",
    href: "/services/web-development",
  },
  {
    title: "Video Editing",
    description:
      "High-quality video editing for ads, social media, and promotions.",
    icon: Video,
    color: "text-indigo-500",
    href: "/services/video-editing",
  },
  {
    title: "Digital Marketing",
    description:
      "Marketing strategies that increase visibility, traffic, and sales.",
    icon: Megaphone,
    color: "text-red-500",
    href: "/services/marketing",
  },
  {
    title: "UI / UX Design",
    description:
      "User-centered designs that improve engagement and user experience.",
    icon: LayoutDashboard,
    color: "text-teal-500",
    href: "/services/ui-ux",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 uppercase">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Services We Provide
          </h2>

          <p className="mt-4 text-gray-600">
            We offer a wide range of digital services to help your business
            grow and succeed online.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 ${service.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Action Button */}
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  Learn More →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
