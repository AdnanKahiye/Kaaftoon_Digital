import { servicesData } from "@/lib/services";
import ServicesSection from "./ServicesSection";

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* HEADER */}
        <div className="max-w-2xl mb-20">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1
                           text-xs font-semibold text-orange-600 uppercase">
            Our Services
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Services Designed to Scale Your Business
          </h1>

          <p className="mt-4 text-gray-600">
            From software development to creative solutions and professional
            training, we provide end-to-end digital services.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="space-y-20">
          {servicesData.map((section) => (
            <ServicesSection key={section.category} {...section} />
          ))}
        </div>

      </div>
    </section>
  );
}
