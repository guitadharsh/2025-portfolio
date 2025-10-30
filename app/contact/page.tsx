"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";
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
          “Drop me a note — I’d love to hear from you.”
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-[#6a5845]">Your Email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-[#cbb693]/60 bg-[#fffaf0] focus:outline-none focus:ring-2 focus:ring-[#b89664] placeholder:text-[#9b8974]/70"
              placeholder="example@email.com"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-[#6a5845]">Message</span>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="p-3 rounded-lg border border-[#cbb693]/60 bg-[#fffaf0] resize-none focus:outline-none focus:ring-2 focus:ring-[#b89664] placeholder:text-[#9b8974]/70"
              placeholder="Write your message..."
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            type="submit"
            className="flex justify-center items-center gap-2 bg-[#b89664] hover:bg-[#a48254] text-white font-medium py-3 rounded-full transition-all duration-300 shadow-md"
          >
            {status === "sending" ? (
              <span>Sending...</span>
            ) : (
              <>
                <SendHorizonal size={18} />
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
      </motion.div>
    </section>
  );
};

export default Contact;
