import {
  CheckCircle,
  Rocket,
  Shield,
  Users,
} from "lucide-react";

const reasons = [
  {
    title: "Market-Focused Solutions",
    description:
      "We design and build solutions that compete, convert, and scale in real markets.",
    icon: Rocket,
  },
  {
    title: "Experienced Digital Team",
    description:
      "A multidisciplinary team combining design, development, and marketing expertise.",
    icon: Users,
  },
  {
    title: "Quality & Performance",
    description:
      "Modern tools and best practices focused on speed, security, and scalability.",
    icon: Shield,
  },
  {
    title: "Client-Centered Approach",
    description:
      "Transparent collaboration, flexibility, and long-term partnership mindset.",
    icon: CheckCircle,
  },
];

const stats = [
  { label: "Happy Clients", value: "1,700+" },
  { label: "Projects Completed", value: "2,300+" },
  { label: "Professionals", value: "700+" },
  { label: "Years Experience", value: "15+" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-gray-50">

      {/* ================= MAIN CONTENT (CENTERED) ================= */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1
                             text-xs font-semibold text-orange-600 uppercase">
              Why Choose Us
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Here is why we are <br className="hidden sm:block" />
              different from others
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              We focus on building long-term client relationships through
              customized, scalable solutions and continuous innovation.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-6">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center
                                 rounded-lg bg-orange-100 text-orange-600"
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE (VISUAL PLACEHOLDER) */}
          <div className="relative">
            <div
              className="h-[320px] w-full rounded-2xl
                         bg-gradient-to-br from-orange-200 to-orange-100
                         shadow-lg"
            />
            <div className="absolute -top-6 -right-6 h-20 w-20
                            rounded-full border border-dashed
                            border-orange-300 opacity-40" />
          </div>
        </div>
      </div>

      {/* ================= STATS BAR (FULL WIDTH 100%) ================= */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
