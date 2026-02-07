import Link from "next/link";
import { Briefcase, UserPlus, HelpCircle, DollarSign } from "lucide-react";

const freelancerActions = [
  {
    title: "Hire a Freelancer",
    description:
      "Find skilled freelancers ready to help you build, design, and grow your business.",
    href: "/freelancer/hire",
    icon: Briefcase,
  },
  {
    title: "Join as a Freelancer",
    description:
      "Create your freelancer profile and start working with real clients worldwide.",
    href: "/freelancer/join",
    icon: UserPlus,
  },
  {
    title: "How It Works",
    description:
      "Understand how our platform connects clients with verified freelancers.",
    href: "/freelancer/how-it-works",
    icon: HelpCircle,
  },
  {
    title: "Pricing & Commission",
    description:
      "Transparent pricing and fair commission structure for freelancers and clients.",
    href: "/freelancer/pricing",
    icon: DollarSign,
  },
];

export default function FreelancerOverviewPage() {
  return (
    <main>
      {/* HERO / INTRO */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span
            className="inline-block mb-4 rounded-full bg-orange-50 px-4 py-1
                       text-xs font-semibold text-orange-600 uppercase"
          >
            Freelancer Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Work With Top Freelancers <br className="hidden sm:block" />
            or Join as One
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Our freelancer platform connects businesses with trusted
            professionals and gives freelancers opportunities to work on
            real-world projects.
          </p>
        </div>
      </section>

      {/* ACTION CARDS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {freelancerActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border bg-white p-6 shadow-sm
                             transition-all duration-300
                             hover:-translate-y-2 hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center
                               rounded-lg bg-orange-100 text-orange-600"
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3
                    className="text-lg font-bold text-gray-900
                               group-hover:text-orange-500 transition"
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {item.description}
                  </p>

                  <span
                    className="mt-5 inline-block text-sm font-semibold
                               text-orange-500"
                  >
                    Learn More →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready to Get Started?
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-gray-300">
            Whether you want to hire talent or start freelancing,
            our platform is built to support your success.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/freelancer/hire"
              className="rounded-full bg-orange-500 px-8 py-3
                         font-semibold text-white hover:bg-orange-600 transition"
            >
              Hire a Freelancer
            </Link>

            <Link
              href="/freelancer/join"
              className="rounded-full border border-gray-500 px-8 py-3
                         font-semibold text-white hover:bg-white
                         hover:text-gray-900 transition"
            >
              Join as Freelancer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
