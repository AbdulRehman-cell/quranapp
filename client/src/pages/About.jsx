import React from "react";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(173,146,76,0.12) 0%, transparent 80%), radial-gradient(circle at 80% 80%, rgba(173,146,76,0.08) 0%, transparent 80%)" }}>
        <div className="container">
          <span className="eyebrow">About QuranApp</span>
          <h1>
            Our <span className="gradient-text">Mission</span> &amp; Vision
          </h1>
          <p className="hero-subtitle">
            Empowering Muslims worldwide with accessible, interactive, and profound Quranic education grounded in spirituality and trust.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" aria-labelledby="mission-title">
        <div className="container">
          <header className="section-head">
            <h2 id="mission-title" style={{ color: "var(--accent)", fontVariantCaps: "small-caps", letterSpacing: "0.05em", fontFamily: "'Lora', serif" }}>
              Mission
              <hr style={{ borderTop: "1px dotted var(--border)", marginTop: "0.5rem" }} />
            </h2>
          </header>
          <p>
            At QuranApp, our mission is to provide a serene, trustworthy space where Muslims can deepen their understanding of the Quran through expertly crafted lessons, interactive learning, and community support. We believe spiritual growth flourishes in an environment combining ancient wisdom with modern accessibility.
          </p>
          <p>
            Our platform is designed to nurture lifelong engagement with Quranic study by offering levels for all learners, from beginners to advanced, ensuring inclusivity and clarity. We cultivate a contemplative journey for users to reflect, learn, and connect with divine teachings.
          </p>
          <figure style={{ marginTop: "32px", textAlign: "center" }}>
            <img
              src="https://loremflickr.com/780/450/quran,islamic,calligraphy?lock=11"
              width="780"
              height="450"
              alt="Open Quran with elegant Islamic calligraphy and illuminated manuscript design"
              style={{ borderRadius: "18px", objectFit: "cover", boxShadow: "0 2px 8px rgba(23,103,91,0.04)" }}
            />
            <figcaption style={{ marginTop: "0.75rem", color: "var(--muted)", fontSize: "0.9rem" }}>
              Beautiful Quranic manuscript reflecting spiritual elegance.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section" aria-labelledby="vision-title" style={{ backgroundColor: "var(--surface-2)", backgroundImage: "url('data:image/svg+xml;utf8,<svg width=40 height=40 viewBox=0 0 40 40 fill=none xmlns=http://www.w3.org/2000/svg><circle cx=20 cy=20 r=2 fill=%23AD924C fill-opacity=0.08/><path d=M0 0H40V40H0z stroke=%23E2DBC8 stroke-opacity=0.06 stroke-width=1 stroke-dasharray=2 2/></svg>')" }}>
        <div className="container">
          <header className="section-head">
            <h2 id="vision-title" style={{ color: "var(--accent)", fontVariantCaps: "small-caps", letterSpacing: "0.05em", fontFamily: "'Lora', serif" }}>
              Vision
              <hr style={{ borderTop: "1px dotted var(--border)", marginTop: "0.5rem" }} />
            </h2>
          </header>
          <p>
            Our vision is a vibrant, global community inspired by the Quran’s timeless wisdom, united in contemplation and spiritual growth. We aspire to use cutting-edge technology and empathetic design to foster a nourishing learning environment accessible anytime, anywhere.
          </p>
          <p>
            Together, we champion lifelong engagement with the Quran—empowering every generation to reflect, internalize, and embody its sacred teachings with confidence and grace.
          </p>
          <figure style={{ marginTop: "32px", textAlign: "center" }}>
            <img
              src="https://loremflickr.com/780/450/mosque,spirituality,serene?lock=19"
              width="780"
              height="450"
              alt="Serene mosque courtyard bathed in soft golden light symbolizing spiritual vision"
              style={{ borderRadius: "18px", objectFit: "cover", boxShadow: "0 2px 8px rgba(23,103,91,0.04)" }}
            />
            <figcaption style={{ marginTop: "0.75rem", color: "var(--muted)", fontSize: "0.9rem" }}>
              A tranquil mosque courtyard embodying spiritual aspiration.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <header className="section-head">
            <h2 id="team-title" style={{ color: "var(--accent)", fontVariantCaps: "small-caps", letterSpacing: "0.05em", fontFamily: "'Lora', serif" }}>
              Our Team
              <hr style={{ borderTop: "1px dotted var(--border)", marginTop: "0.5rem" }} />
            </h2>
          </header>

          <div className="grid grid-3" style={{ gap: "32px" }}>
            <article className="card" style={{ borderTop: "2px solid var(--accent)" }}>
              <img
                src="https://i.pravatar.cc/300?img=25"
                alt="Amina Ali - Founder & Quran Scholar"
                width="300"
                height="300"
                style={{ borderRadius: "18px", objectFit: "cover", boxShadow: "0 2px 8px rgba(23,103,91,0.04)", marginBottom: "1rem" }}
              />
              <h3 style={{ fontFamily: "'Lora', serif", color: "var(--text)" }}>Amina Ali</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500 }}>
                Founder &amp; Quran Scholar
              </p>
              <p>
                Amina combines decades of classical Islamic scholarship with modern pedagogical practices to craft our curriculum, ensuring authenticity and accessibility.
              </p>
            </article>

            <article className="card" style={{ borderTop: "2px solid var(--accent)" }}>
              <img
                src="https://i.pravatar.cc/300?img=32"
                alt="Omar Karim - Lead Developer"
                width="300"
                height="300"
                style={{ borderRadius: "18px", objectFit: "cover", boxShadow: "0 2px 8px rgba(23,103,91,0.04)", marginBottom: "1rem" }}
              />
              <h3 style={{ fontFamily: "'Lora', serif", color: "var(--text)" }}>Omar Karim</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500 }}>
                Lead Developer
              </p>
              <p>
                Passionate about digital inclusion, Omar builds the platform’s seamless user experience, focused on thoughtful design and robust functionality.
              </p>
            </article>

            <article className="card" style={{ borderTop: "2px solid var(--accent)" }}>
              <img
                src="https://i.pravatar.cc/300?img=18"
                alt="Sofia Khan - Community & Outreach"
                width="300"
                height="300"
                style={{ borderRadius: "18px", objectFit: "cover", boxShadow: "0 2px 8px rgba(23,103,91,0.04)", marginBottom: "1rem" }}
              />
              <h3 style={{ fontFamily: "'Lora', serif", color: "var(--text)" }}>Sofia Khan</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500 }}>
                Community &amp; Outreach
              </p>
              <p>
                Sofia nurtures our growing community, organizing events and engagement to bring learners together in a warm and spiritual atmosphere.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}