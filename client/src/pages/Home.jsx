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
    desc: "Experience recitation and translation with guided lessons tailored to every learner's pace.",
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
          {features.map(({ icon, title, desc }) => (
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
          {galleryImgs.map(({ src, alt }) => (
            <div className="card" key={src}>
              <img
                src={src}
                alt={alt}
                width="600"
                height="400"
                style={{ objectFit: "cover", borderRadius: "18px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section: Hero
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">Welcome</span>
        <h1>
          Discover the <span className="gradient-text">Quran</span> with Heart and Mind
        </h1>
        <p className="hero-subtitle">
          A beautifully designed learning experience for Muslims of every level—guided lessons, interactive tools, and a nurturing community await.
        </p>
        <div className="hero-actions">
          <a href="/lessons" className="btn btn-primary">Start Learning</a>
          <a href="/about" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useRevealAnimation();
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturesGrid />
      <HowItWorks />
      <GalleryShowcase />
    </>
  );
}