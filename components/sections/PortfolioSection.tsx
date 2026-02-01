import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Brand Identity Design",
    category: "Branding",
    image: "/Images/portfolio/branding.jpg",
  },
  {
    title: "Business Website",
    category: "Web Development",
    image: "/Images/portfolio/website.jpg",
  },
  {
    title: "Promotional Video",
    category: "Video Editing",
    image: "/Images/portfolio/video.jpg",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 uppercase">
            Our Work
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Projects We’ve Delivered
          </h2>

          <p className="mt-4 text-gray-600">
            A selection of projects showcasing our expertise in digital
            services, design, and development.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-xl bg-gray-100"
            >
              {/* Image */}
              <div className="relative w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end">
                <div className="p-6 text-white">
                  <span className="text-sm text-orange-300">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-white font-semibold hover:bg-orange-600 transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
