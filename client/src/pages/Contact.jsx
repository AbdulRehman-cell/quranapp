import React, { useState } from "react";

function getErrorMessage(err, fallback) {
  if (!err) return fallback
  const data = err.response && err.response.data
  if (data) {
    if (typeof data === 'string') return data
    if (typeof data.error === 'string') return data.error
    if (typeof data.message === 'string') return data.message
    try { return JSON.stringify(data) } catch (e) { return fallback }
  }
  if (typeof err.message === 'string') return err.message
  return fallback
}

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
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const mailto = `mailto:support@quranapp.com?subject=${encodeURIComponent(
        'Message from ' + formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
      window.location.href = mailto;
      setSuccess("Your message has been prepared. Please send it from your email client.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(getErrorMessage(err, "There was an error sending your message. Please try again later."));
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
            rows={5}
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