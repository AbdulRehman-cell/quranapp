import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/contacts", formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setError("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="section">
        <div className="section-head">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>
        </div>
      </section>

      <section className="section">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit} className="grid grid-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="card"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="card"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="card"
          ></textarea>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className="text-error">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </section>

      <section className="section">
        <h2>Contact Details</h2>
        <p>If you have any questions, feel free to reach out via email or follow us on social media!</p>
        <p>Email: <a href="mailto:support@quranapp.com" className="btn btn-ghost">support@quranapp.com</a></p>
        <div className="grid grid-3">
          <a href="#" className="btn btn-secondary">Facebook</a>
          <a href="#" className="btn btn-secondary">Twitter</a>
          <a href="#" className="btn btn-secondary">Instagram</a>
        </div>
      </section>
    </div>
  );
}