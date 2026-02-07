import Image from "next/image";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Founder, Startup Company",
    message:
      "Working with this team was a game changer. They delivered a professional product that helped us compete confidently in the market.",
    avatar: "/Images/testimonials/branding.jpg",
  },
  {
    name: "Sarah Ali",
    role: "Marketing Manager",
    message:
      "Their design and development skills are outstanding. Communication was smooth, delivery was fast, and the quality exceeded expectations.",
    avatar: "/Images/testimonials/branding.jpg",
  },
  {
    name: "Mohamed Yusuf",
    role: "Business Owner",
    message:
      "From branding to software development, everything was handled professionally. I highly recommend their services.",
    avatar: "/Images/testimonials/branding.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block mb-3 rounded-full
            bg-white px-4 py-1 text-xs font-semibold
            text-[#D51116] uppercase"
          >
            Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116]">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-gray-700">
            Trusted by businesses and entrepreneurs who value quality,
            performance, and results.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white p-6 shadow
              border border-[#F39220]/30
              hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-gray-700 text-sm leading-relaxed">
                “{item.message}”
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div
                  className="relative h-12 w-12 overflow-hidden rounded-full
                  border-2 border-[#F39220]"
                >
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#D51116]">
                    {item.name}
                  </h4>
                  <span className="text-sm text-gray-600">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
