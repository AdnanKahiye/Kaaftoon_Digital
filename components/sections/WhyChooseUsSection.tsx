import { CheckCircle, Rocket, Shield, Users } from "lucide-react";

const reasons = [
  {
    title: "Market-Focused Solutions",
    description:
      "We don’t just build — we create solutions designed to compete, convert, and scale in real markets.",
    icon: Rocket,
  },
  {
    title: "Experienced Digital Team",
    description:
      "Our team combines design, development, and marketing expertise to deliver high-quality results.",
    icon: Users,
  },
  {
    title: "Quality & Performance",
    description:
      "We use modern tools and best practices to ensure speed, security, and long-term performance.",
    icon: Shield,
  },
  {
    title: "Client-Centered Approach",
    description:
      "We work closely with our clients, offering transparency, flexibility, and continuous support.",
    icon: CheckCircle,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 uppercase">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Built to Compete in the Digital Market
          </h2>

          <p className="mt-4 text-gray-600">
            We help businesses stand out by delivering digital solutions that
            are strategic, scalable, and results-driven.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
