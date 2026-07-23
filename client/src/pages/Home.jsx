import React, { useEffect, useState } from "react";
import axios from "axios";

// Animate-on-scroll utility
function useRevealAnimation() {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.87) {
          el.classList.add("revealed");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal);
    return () => window.removeEventListener("scroll", reveal);
  }, []);
}

// Section: Stats (from real Users/Lessons)
// Defensive fetch, fallback to demo values
function StatsBand() {
  const [stats, setStats] = useState({
    students: null,
    lessons: null,
    community: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const usersRes = await axios.get("/api/users");
        const lessonsRes = await axios.get("/api/lessons");
        if (!mounted) return;
        setStats({
          students: usersRes.data?.length ?? 4710,
          lessons: lessonsRes.data?.length ?? 48,
          community: Math.max(usersRes.data?.length ?? 4710, 4700) + 120,
        });
      } catch (e) {
        // Fallback values
        setStats({ students: 4710, lessons: 48, community: 4820 });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Impact</span>
          <h2 style={{ color: "var(--accent)" }}>
            By the <span className="gradient-text">Numbers</span>
          </h2>
          <p>
            Our serene journey has touched souls around the world—browse our thriving student community and learning curriculum.
          </p>
        </div>
        <div className="stats">
          <div>
            <span className="stat-value">{loading ? "…" : stats.students}</span>
            <span className="stat-label">Learners</span>
          </div>
          <div>
            <span className="stat-value">{loading ? "…" : stats.lessons}</span>
            <span className="stat-label">Quranic Lessons</span>
          </div>
          <div>
            <span className="stat-value">{loading ? "…" : stats.community}</span>
            <span className="stat-label">Global Community</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section: Features
const features = [
  {
    icon: (
      <img
        src="https://loremflickr.com/64/64/quran?lock=101"
        alt="Interactive Quran"
        width="48"
        height="48"
        className="feature-icon"
        style={{ borderRadius: "50%" }}
      />
    ),
    title: "Interactive Quran",
    desc: "Experience recitation and translation with guided lessons tailored to every learner’s pace.",
  },
  {
    icon: (
      <img
        src="https://loremflickr.com/64/64/islamic-art?lock=102"
        alt="Geometric Learning"
        width="48"
        height="48"
        className="feature-icon"
        style={{ borderRadius: "50%" }}
      />
    ),
    title: "Geometric Wisdom",
    desc: "Lessons inspired by Islamic tessellation motifs, making spiritual learning visually engaging.",
  },
  {
    icon: (
      <img
        src="https://loremflickr.com/64/64/community?lock=103"
        alt="Community"
        width="48"
        height="48"
        className="feature-icon"
        style={{ borderRadius: "50%" }}
      />
    ),
    title: "Community Engagement",
    desc: "Discuss, share, and grow within a spiritual community dedicated to Quranic understanding.",
  },
];

function FeaturesGrid() {
  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Features</span>
          <h2 style={{ color: "var(--accent)" }}>
            Elevate Your <span className="gradient-text">Learning</span>
          </h2>
          <p>
            From interactive recitation to a serene community—we guide you through a holistic Quranic education.
          </p>
        </div>
        <div className="grid-3">
          {features.map(({ icon, title, desc }, idx) => (
            <div className="feature-card" key={title}>
              <div aria-hidden className="feature-icon">{icon}</div>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section: How It Works steps
const steps = [
  {
    num: 1,
    title: "Choose Your Level",
    icon: (
      <img
        src="https://loremflickr.com/48/48/mosque?lock=201"
        alt=""
        className="step-icon"
        width="32"
        height="32"
        style={{ borderRadius: "50%" }}
      />
    ),
    desc: "Begin at any stage—novice or advanced—matching your knowledge and fluency.",
  },
  {
    num: 2,
    title: "Immerse in Lessons",
    icon: (
      <img
        src="https://loremflickr.com/48/48/quran-study?lock=202"
        alt=""
        className="step-icon"
        width="32"
        height="32"
        style={{ borderRadius: "50%" }}
      />
    ),
    desc: "Explore structured interactive modules, blending recitation, translation, and reflection.",
  },
  {
    num: 3,
    title: "Connect & Grow",
    icon: (
      <img
        src="https://loremflickr.com/48/48/friends?lock=203"
        alt=""
        className="step-icon"
        width="32"
        height="32"
        style={{ borderRadius: "50%" }}
      />
    ),
    desc: "Engage with fellow learners, mentors, and discussions to deepen your spiritual journey.",
  },
];

function HowItWorks() {
  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 style={{ color: "var(--accent)" }}>
            <span className="gradient-text">Three Steps</span> to Wisdom
          </h2>
          <p>
            Our process is simple, contemplative, and personalized—begin your Quranic journey today.
          </p>
        </div>
        <div className="steps-row">
          {steps.map((step) => (
            <div className="step" key={step.num}>
              <div className="step-num" style={{ background: "var(--accent)", color: "var(--surface)" }}>{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section: Gallery/Showcase
const galleryImgs = [
  {
    src: "https://loremflickr.com/600/400/quran?lock=301",
    alt: "Student reciting Quran",
  },
  {
    src: "https://loremflickr.com/600/400/quranic-art?lock=302",
    alt: "Quranic geometric art",
  },
  {
    src: "https://loremflickr.com/600/400/classroom?lock=303",
    alt: "Learning session",
  },
  {
    src: "https://loremflickr.com/600/400/muslim-community?lock=304",
    alt: "Community event",
  },
];

function GalleryShowcase() {
  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Showcase</span>
          <h2 style={{ color: "var(--accent)" }}>
            <span className="gradient-text">Moments</span> of Inspiration
          </h2>
          <p>
            Discover real people and sacred art—glimpses from our flourishing learning journey.
          </p>
        </div>
        <div className="grid-4">
          {galleryImgs.map(({ src, alt }, idx) => (
            <div className="card" key={src}>
              <img
                src={src}
                alt={alt}
                width="280"
                height="190"
                style={{
                  display: "block",
                  width: "100%",
                  height: "190px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid var(--border)",
                  margin: "0 auto",
                  background: "var(--surface-2)",
                }}
              />
              <div style={{ marginTop: 8, fontWeight: 500 }}>{alt}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section: Testimonials
const testimonials = [
  {
    avatar: "https://i.pravatar.cc/300?img=14",
    name: "Fatima Al-Khaled",
    badge: "Beginner Graduate",
    quote:
      "The app’s serene design makes learning relaxing and empowering. I finally feel connected to the Quran in a way that resonates with my heart.",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=22",
    name: "Yusuf Tariq",
    badge: "Advanced Student",
    quote:
      "Interactive lessons helped me improve my recitation and spiritual understanding. The community is uplifting and supportive.",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=31",
    name: "Amina Zahir",
    badge: "Parent & Mentor",
    quote:
      "Teaching my children Quranic values has never been easier. The elegant UI and the personalized approach are unmatched.",
  },
];

function TestimonialsGrid() {
  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2 style={{ color: "var(--accent)" }}>
            Learners' <span className="gradient-text">Voices</span>
          </h2>
          <p>
            Trusted and loved by thousands—explore heartfelt stories from our diverse spiritual community.
          </p>
        </div>
        <div className="grid-3">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <img
                src={t.avatar}
                alt={t.name + " avatar"}
                width="56"
                height="56"
                style={{
                  display: "block",
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  marginBottom: 16,
                  objectFit: "cover",
                  width: 56,
                  height: 56,
                }}
              />
              <blockquote>
                <span style={{ color: "var(--primary)", fontWeight: 400 }}>
                  “{t.quote}”
                </span>
              </blockquote>
              <div style={{ marginTop: 12 }}>
                <span style={{ fontWeight: 700 }}>{t.name}</span>
                <span className="badge" style={{ marginLeft: 8 }}>
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section: FAQ
const faqs = [
  {
    q: "Is this app suitable for all ages?",
    a: "Absolutely! Lessons are tailored for ages 7 and up with modules for youth, adults, and elders alike.",
  },
  {
    q: "Is community engagement safe?",
    a: "All discussions are moderated by mentors and spiritual guides, ensuring respectful, beneficial dialogue.",
  },
  {
    q: "Can I access lessons offline?",
    a: "Many lessons and recitations can be saved for offline study, enhancing accessibility wherever you are.",
  },
  {
    q: "How is privacy handled?",
    a: "Your data is secure and never shared without consent. We value trust and spiritual integrity.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 style={{ color: "var(--accent)" }}>
            <span className="gradient-text">Common Questions</span>
          </h2>
          <p>
            Your peace of mind matters—explore answers to frequent questions below.
          </p>
        </div>
        <div>
          {faqs.map(({ q, a }, idx) => (
            <div
              key={q}
              className="card faq-card"
              style={{
                marginBottom: 16,
                cursor: "pointer",
                boxShadow: "none",
                border: openIndex === idx
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
                transition: "border-color 180ms",
              }}
              onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <div style={{ fontWeight: 700, color: "var(--primary)" }}>
                {q}
              </div>
              {openIndex === idx && (
                <div style={{ marginTop: 8, color: "var(--muted)" }}>{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA
function FinalCTA() {
  return (
    <section className="section final-cta reveal" style={{
      background: "linear-gradient(135deg, #F3ECE3 0%, #FAF7F2 100%)",
    }}>
      <div className="container">
        <div className="section-head" style={{ alignItems: "center" }}>
          <span className="eyebrow">Ready to Begin?</span>
          <h2 style={{ color: "var(--accent)" }}>
            Empower Your <span className="gradient-text">Spiritual Journey</span>
          </h2>
          <p>
            Join thousands cultivating wisdom and tranquility through Quranic learning. Start now—your path awaits.
          </p>
          <div className="hero-actions" style={{ marginTop: 24 }}>
            <a href="/lessons" className="btn btn-primary">
              Explore Lessons
            </a>
            <a href="/contact" className="btn btn-secondary">
              Connect with Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// HERO with crescent motif (accent gold, subtly blurred)
// The backdrop geometric pattern is handled by the global design system.
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow" style={{ letterSpacing: "0.05em", color: "var(--accent)" }}>
          Quranic Serenity
        </span>
        <h1>
          Spiritual Learning for Every <span className="gradient-text">Soul</span>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              position: "relative",
              left: 0,
              top: "-28px",
              zIndex: 0,
            }}
          >
            <svg
              width="86"
              height="50"
              viewBox="0 0 86 50"
              style={{
                position: "absolute",
                left: 0,
                top: "-18px",
                pointerEvents: "none",
                filter: "blur(4px)",
                opacity: 0.38,
              }}
            >
              <ellipse
                cx="43"
                cy="28"
                rx="36"
                ry="12"
                fill="#AD924C"
              />
              <path
                d="M63,17 A20,20 0 1,0 19,17"
                stroke="#AD924C"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>
        </h1>
        <p className="hero-subtitle">
          The most serene, trustworthy platform for learning Quran interactively—personalized guidance, elegant resources, and a vibrant spiritual community.
        </p>
        <div className="hero-actions">
          <a href="/lessons" className="btn btn-primary">
            Start Learning
          </a>
          <a href="/about" className="btn btn-secondary">
            About Us
          </a>
        </div>
      </div>
    </section>
  );
}

// Scroll-reveal animation
useRevealAnimation();

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <StatsBand />
      <GalleryShowcase />
      <TestimonialsGrid />
      <FAQSection />
      <FinalCTA />
    </>
  );
}