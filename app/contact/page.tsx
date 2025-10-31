"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Github, Linkedin, Instagram, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

interface FormData {
  email: string;
  message: string;
}

type Status = "" | "sending" | "sent" | "error";

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ email: "", message: "" });
  const [status, setStatus] = useState<Status>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("sent");
      setForm({ email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="h-screen w-full flex justify-center items-center text-[#3b2f2f] font-serif px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-[#fff8ec]/80 border border-[#d8c4a1]/70 rounded-3xl shadow-lg p-8 backdrop-blur-md"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-primary text-center mb-2">
          Get in Touch
        </h2>
        <p className="text-sm italic text-center text-[#7b6651]/80 mb-6">
          “Drop me a note I’d love to hear from you.”
        </p>

        {/* 🌸 Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <label className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm text-[#6a5845]">Your Email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="
                p-2 sm:p-3 text-sm sm:text-base
                rounded-lg border border-[#cbb693]/60 bg-[#fffaf0]
                focus:outline-none focus:ring-2 focus:ring-[#b89664]
                placeholder:text-[#9b8974]/60 sm:placeholder:text-[#9b8974]/70
              "
              placeholder="example@email.com"
            />
          </label>

          {/* Message Field */}
          <label className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm text-[#6a5845]">Message</span>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="
                p-2 sm:p-3 text-sm sm:text-base
                rounded-lg border border-[#cbb693]/60 bg-[#fffaf0] resize-none
                focus:outline-none focus:ring-2 focus:ring-[#b89664]
                placeholder:text-[#9b8974]/60 sm:placeholder:text-[#9b8974]/70
              "
              placeholder="Write your message..."
            />
          </label>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            type="submit"
            className="
              flex justify-center items-center gap-2
              bg-[#b89664] hover:bg-[#a48254] text-white font-medium
              py-2.5 sm:py-3 px-3 sm:px-4
              text-sm sm:text-base
              rounded-full transition-all duration-300 shadow-md
            "
          >
            {status === "sending" ? (
              <span>Sending...</span>
            ) : (
              <>
                <SendHorizonal size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>
                  {status === "sent"
                    ? "Sent ✓"
                    : status === "error"
                    ? "Try Again"
                    : "Send Message"}
                </span>
              </>
            )}
          </motion.button>
        </form>

        {/* 🌐 Social Links */}
        <div className="mt-8 flex justify-center gap-5 sm:gap-6">
          {[
            {
              icon: <Github size={18} />,
              href: "https://github.com/guitadharsh",
              label: "GitHub",
            },
            {
              icon: <Linkedin size={18} />,
              href: "https://linkedin.com/in/adharsh-d",
              label: "LinkedIn",
            },
            {
              icon: <Instagram size={18} />,
              href: "https://www.instagram.com/adharshd.in",
              label: "Instagram",
            },
            {
              icon: <Mail size={18} />,
              href: "mailto:adharshd100@gmail.com",
              label: "Email",
            },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="
                w-10 h-10 sm:w-11 sm:h-11 flex justify-center items-center
                rounded-full border border-[#cbb693]/70 bg-[#fffaf0]
                hover:bg-[#b89664] hover:text-white transition-all duration-300
                shadow-sm hover:shadow-md
              "
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
