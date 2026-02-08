"use client";
import Link from 'next/link';
export default function AboutUsPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          About Us
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We are a passionate team of innovators and problem solvers committed to delivering exceptional solutions for businesses to thrive in a digital-first world.
        </p>
      </div>

      {/* Who We Are Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            WHO WE ARE
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            A Team of Innovators & Visionaries
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our team thrives on creating innovative solutions, collaborating closely with clients to build systems that solve problems and drive growth.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            OUR MISSION
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            Our Mission is Clear
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            To empower businesses with cutting-edge technology, helping them streamline processes, improve efficiency, and scale rapidly.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            OUR VALUES
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            Core Values That Drive Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in integrity, innovation, and collaboration. Our values shape the way we work and define our relationship with clients.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Integrity</h3>
            <p className="mt-4 text-gray-600">
              We uphold the highest standards of ethics, ensuring that all our interactions are transparent, honest, and trust-building.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
            <p className="mt-4 text-gray-600">
              We continuously push the boundaries of creativity, striving to deliver forward-thinking, impactful solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
            <p className="mt-4 text-gray-600">
              We are dedicated to maintaining the highest quality in everything we do, ensuring our solutions are top-notch and results-driven.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Collaboration</h3>
            <p className="mt-4 text-gray-600">
              We believe in the power of teamwork—both within our organization and in collaboration with our clients—to deliver the best solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            OUR VISION
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            A Vision for the Future
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We aim to be the leading provider of innovative solutions, helping businesses of all sizes transform and thrive in the digital era.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Get in Touch with Us
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          If you have any questions or would like to discuss how we can help your business, feel free to contact us!
        </p>

        <div className="mt-8 flex justify-center gap-6">
       <button
  className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
>
  <Link href="/contact">
    Contact Us
  </Link>
</button>
          <button
            onClick={() => window.open('https://github.com/your-profile', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
