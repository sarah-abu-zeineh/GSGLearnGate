"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceID || !templateID || !userID) {
        toast.error("Email configuration error. Please try again later.");
        return;
      }

      await emailjs.send(serviceID, templateID, formData, userID);

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        data-testid="contact-us-form"
        className="w-[85%] md:w-[50%] lg:w-[40%] xl:w-[30%] m-auto border-1 border-gray-300 shadow-sm p-8 bg-white mt-10 mb-10"
      >
        <p className="text-2xl font-bold" data-testid="contact-us-title">
          Send Message
        </p>

        <div className="mt-6 flex flex-col" data-testid="contact-us-name-container">
          <label htmlFor="name" className="font-bold">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777]"
            data-testid="contact-us-name-input"
          />
        </div>

        <div className="mt-6 flex flex-col" data-testid="contact-us-email-container">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777]"
            data-testid="contact-us-email-input"
          />
        </div>

        <div className="mt-6 flex flex-col" data-testid="contact-us-message-container">
          <label htmlFor="message" className="font-bold">
            Type your message
          </label>
          <textarea
            name="message"
            id="message"
            className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777] resize-none"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            data-testid="contact-us-message-input"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="contact-us-submit-button"
          className="rounded cursor-pointer hover:shadow-md py-0.5 px-3.5 mt-4 bg-blue-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
};

export default ContactUsForm;
