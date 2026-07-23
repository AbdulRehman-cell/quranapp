import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Lessons from "./pages/Lessons.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/lessons", name: "Lessons" },
  { path: "/gallery", name: "Gallery" },
  { path: "/contact", name: "Contact" },
];

export default function App() {
  return (
    <>
      {/* Sticky semi-opaque header nav with blurred bg */}
      <header className="sticky-nav">
        <div className="container nav-content">
          <span className="brand">quranapp</span>
          <nav>
            {navLinks.map(({ path, name }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
                end={path === "/"}
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Elegant spiritual footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-brand">
            <span className="brand">quranapp</span>
          </div>
          <nav className="footer-links">
            {navLinks.map(({ path, name }) => (
              <NavLink
                key={name}
                to={path}
                className="footer-link"
                end={path === "/"}
              >
                {name}
              </NavLink>
            ))}
          </nav>
          <div className="footer-info">
            <span className="footer-mission">
              Empowering souls through <span className="gradient-text">Quranic</span> knowledge.
            </span>
            <div className="footer-copy">
              &copy; {new Date().getFullYear()} QuranApp. Designed with serenity.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}