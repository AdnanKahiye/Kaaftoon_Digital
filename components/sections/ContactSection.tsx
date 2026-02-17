"use client";
import { UtilityService } from "@/lib/utils";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
  to: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    message: "",
    to: "maansoft.so@gmail.com",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);  // New state for tracking submission

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setLoading(true);

    try {
      // Call the UtilityService to send the contact request
      const response = await UtilityService.createContactRequest(formData);

      // Check the response
      if (response.data.success) {
        toast.success("Contact request sent successfully!");
        setSubmitted(true);  // Set submission state to true after success
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Email error:", error);
      toast.error(error?.response?.data?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-block mb-3 rounded-full
            bg-white px-5 py-1 text-xs font-semibold
            text-[#D51116] uppercase tracking-wide"
          >
            Contact Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D51116]">
            Let's Discuss Your Project
          </h2>

          <p className="mt-4 text-gray-700">
            Share your idea with us and let's turn it into a powerful digital
            solution tailored to your business goals.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT INFO */}
          <div className="space-y-8">
            <p className="text-gray-700 max-w-md">
              We work closely with businesses and individuals to deliver
              innovative, scalable, and reliable digital services. Our team is
              ready to help you move forward.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Address</p>
                  <p className="text-sm text-gray-700">Somalia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Email</p>
                  <p className="text-sm text-gray-700">
                    info@kaaftoondigital.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">Phone</p>
                  <p className="text-sm text-gray-700">+252 252612024843</p>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#F39220] shadow"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D51116]">WhatsApp</p>
                  <p className="text-sm text-gray-700">+252 252612024843</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-2xl bg-white p-8 shadow-xl border border-[#F39220]/30">
            {submitted ? (
              <div className="text-center text-lg font-semibold text-[#D51116]">
                <p>Thank you for reaching out!</p>
                <p>We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#D51116]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                    focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D51116]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                    focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D51116]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3
                    focus:border-[#D51116] focus:ring-1 focus:ring-[#D51116] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center
                  rounded-full bg-[#D51116] px-6 py-3
                  text-white font-semibold
                  hover:bg-[#F39220] transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
