"use client";

export default function ContactSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold text-orange-600 uppercase">
            Contact Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Let’s Talk About Your Project
          </h2>

          <p className="mt-4 text-gray-600 max-w-lg">
            Have an idea or a project in mind? Fill out the form and our team
            will get back to you within 24 hours.
          </p>

          {/* Contact Info */}
          <div className="mt-8 space-y-4 text-gray-700">
            <p>
              📧 <span className="font-medium">Email:</span> info@kaaftoondigital.com
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span> +252 61 XXX XXX
            </p>
            <p>
              📍 <span className="font-medium">Location:</span> Somalia
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
