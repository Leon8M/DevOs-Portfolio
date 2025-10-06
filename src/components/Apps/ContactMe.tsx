// src/components/Apps/ContactMe.tsx
"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPlaceholder from "@/components/ui/AnimatedPlaceholder";

interface MessageBoxProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type, onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";
  const titleText =
    type === "success"
      ? "Success"
      : type === "error"
      ? "Error"
      : "Information";
  const iconSrc =
    type === "success"
      ? "/xp-icons/info-success-icon.png"
      : type === "error"
      ? "/xp-icons/info-error-icon.png"
      : "/xp-icons/info-icon.png";

  return (
    <AnimatePresence>
      <motion.div
        key="msgbox"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className="bg-[#D4D0C8] border-2 border-[#808080] shadow-xp-dialog p-1 rounded-sm flex flex-col min-w-[300px] max-w-[90%] md:max-w-[400px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title Bar */}
          <div
            className={`flex items-center justify-between h-[26px] px-1 text-white font-bold text-xs select-none ${bgColor} border-b border-white/50`}
          >
            <div className="flex items-center gap-1">
              <img src={iconSrc} alt={titleText} className="w-4 h-4" />
              <span>{titleText}</span>
            </div>
            <button
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center bg-[#E81123] hover:bg-[#F1707A] border border-[#E81123] text-white rounded-sm"
            >
              <img
                src="/xp-icons/close-icon.png"
                alt="Close"
                className="w-3 h-3"
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex items-center gap-4 bg-white text-gray-800 text-sm">
            <img src={iconSrc} alt="Icon" className="w-8 h-8 flex-shrink-0" />
            <p>{message}</p>
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-[#A0A0A0] bg-[#D4D0C8] flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-1 bg-gradient-to-b from-[#ECE9D8] to-[#D4D0C8] border border-[#808080] rounded-sm shadow-sm text-sm font-bold text-gray-800 hover:from-[#DCD9D4] hover:to-[#C6C3BD] active:from-[#C6C3BD] active:to-[#DCD9D4]"
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ContactMe: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      setMessageBox({
        message:
          "Email service not configured. Please set the required environment variables.",
        type: "error",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: "Leon Munene",
          from_email: formData.email,
          to_email: "leonmunene254@gmail.com",
          message: formData.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          setMessageBox({
            message:
              "Thank you for your message! I will get back to you as soon as possible.",
            type: "success",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setLoading(false);
          setMessageBox({
            message:
              "Something went wrong. Please try again. Error: " +
              (error.text || error),
            type: "error",
          });
        }
      );
  };

  return (
    <div
      className="p-3 md:p-5 bg-[#ECE9D8] w-full h-full overflow-y-auto text-sm xp-scrollbar"
      style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
    >
      <h2 className="text-lg font-bold mb-4 text-[#003B7C] xp-text-shadow">
        Contact Me
      </h2>

      <div className="bg-white p-4 border xp-panel-border-inset rounded-sm shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
        <p className="text-gray-800 mb-4">
          Have a project in mind or just want to chat? Fill out the form below
          and I will get back to you!
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="xp-input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="xp-input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-semibold mb-1 text-gray-700"
            >
              Message
            </label>
            <div className="relative">
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="xp-textarea"
                required
              />
              {!formData.message && (
                <AnimatedPlaceholder
                  placeholders={[
                    "Hello, I have a project in mind...",
                    "I'd like to connect with you.",
                    "Just wanted to say hi!",
                  ]}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="xp-button-primary"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </div>
  );
};

export default ContactMe;
