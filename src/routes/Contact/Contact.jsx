import React, { useEffect, useState } from "react";
import { Mail, Phone, Home, Heart, Zap } from "lucide-react";

const ContactDetail = ({ icon: Icon, title, content }) => (
  <li className="flex items-start">
    <Icon className="w-6 h-6 mr-3 text-[#38A169] flex-shrink-0" />
    <div>
      <strong className="text-gray-800 block">{title}</strong>
      {typeof content === "string" ? (
        <span className="block text-gray-600">{content}</span>
      ) : (
        content
      )}
    </div>
  </li>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const primaryGreen = "bg-[#38A169]";
  const textPrimaryGreen = "text-[#38A169]";
  const focusRing = "focus:ring-2 focus:ring-[#38A169] focus:border-[#38A169]";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" }); 

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 antialiased"
      style={{ fontFamily: "Inter, sans-serif" }}
    >

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Get in <span className={textPrimaryGreen}>Touch</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you donate, claim food, or answer any questions
            about the movement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-xl shadow-2xl shadow-green-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${focusRing} transition duration-150 placeholder-gray-500`}
                  placeholder="Jane Doe"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${focusRing} transition duration-150 placeholder-gray-500`}
                  placeholder="example@food4all.org"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${focusRing} transition duration-150 placeholder-gray-500`}
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full ${primaryGreen} text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition duration-300 shadow-lg shadow-green-300/50`}
                disabled={isSubmitted}
              >
                {isSubmitted ? "Message Sent!" : "Submit Inquiry"}
              </button>

              {isSubmitted && (
                <div className="mt-4 p-4 text-center bg-green-50 text-green-700 border border-green-300 rounded-lg animate-fadeIn">
                  Thank you for your message! We will be in touch shortly.
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#38A169]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Links & Support
              </h3>
              <ul className="space-y-4">
                <ContactDetail
                  icon={Mail}
                  title="General Inquiries"
                  content={
                    <a
                      href="mailto:info@food4all.org"
                      className="hover:text-[#38A169] block"
                    >
                      info@food4all.org
                    </a>
                  }
                />
                <ContactDetail
                  icon={Phone}
                  title="Support Line"
                  content="(800) 555-FOOD (3663)"
                />
                <ContactDetail
                  icon={Home}
                  title="Headquarters"
                  content={
                    <address className="not-italic block text-gray-600">
                      123 Community Way, Suite 400
                      <br />
                      Chicago, IL 60601, USA
                    </address>
                  }
                />
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#38A169]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Specific Assistance
              </h3>
              <p className="text-gray-600 mb-4">
                If your question relates to a specific area, please use these
                emails:
              </p>
              <ul className="space-y-4">
                <ContactDetail
                  icon={Heart}
                  title="Donor Support"
                  content={
                    <a
                      href="mailto:donate@food4all.org"
                      className="hover:text-[#38A169] block"
                    >
                      donate@food4all.org
                    </a>
                  }
                />
                <ContactDetail
                  icon={Zap}
                  title="Partnership Inquiries"
                  content={
                    <a
                      href="mailto:partners@food4all.org"
                      className="hover:text-[#38A169] block"
                    >
                      partners@food4all.org
                    </a>
                  }
                />
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Food4All. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Contact;
