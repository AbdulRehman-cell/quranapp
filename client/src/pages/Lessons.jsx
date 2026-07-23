import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  // Fetch lessons from API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    axios
      .get("/api/lessons")
      .then((res) => {
        if (isMounted) {
          setLessons(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(
            "Failed to load lessons. Please check your connection and try again."
          );
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique levels for filter dropdown
  const lessonLevels = React.useMemo(() => {
    const levels = new Set();
    lessons.forEach((lesson) => {
      if (typeof lesson.level === "string" && lesson.level.trim() !== "") {
        levels.add(lesson.level);
      }
    });
    return Array.from(levels).sort();
  }, [lessons]);

  // Filter and search lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchLevel =
      filterLevel === "all" || lesson.level === filterLevel ? true : false;
    const matchSearch =
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Lessons introduction">
        <div className="container">
          <h1>
            Explore <span className="gradient-text">Quranic Lessons</span> by
            Level
          </h1>
          <p className="hero-subtitle">
            Deepen your understanding of the Quran with expertly crafted
            lessons, organized for every stage of your journey.
          </p>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="section" aria-labelledby="lessons-intro-title">
        <div className="container">
          <h2 id="lessons-intro-title" className="section-head">
            Structured Learning Paths for Your Spiritual Growth
          </h2>
          <p>
            Our curriculum offers thoughtfully designed lessons to guide you
            through the Quranic teachings, blending classical scholarship with
            practical application. Use the filters below to find lessons that
            suit your current knowledge level and areas of interest.
          </p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section
        className="section"
        aria-label="Search and filter Quranic lessons by level and keyword"
      >
        <div className="container" style={{ maxWidth: "480px" }}>
          <form
            onSubmit={(e) => e.preventDefault()}
            aria-describedby="filter-instructions"
          >
            <label htmlFor="search" className="eyebrow">
              Search lessons
            </label>
            <input
              id="search"
              type="search"
              value={searchTerm}
              placeholder="Enter lesson title or description"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", marginBottom: "16px" }}
              aria-label="Search lessons by title or description"
            />

            <label htmlFor="level-filter" className="eyebrow">
              Filter by Level
            </label>
            <select
              id="level-filter"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              aria-label="Filter lessons by level"
              style={{ width: "100%" }}
            >
              <option value="all">All Levels</option>
              {lessonLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </form>
        </div>
      </section>

      {/* Lessons Grid Section */}
      <section className="section" aria-label="List of Quranic lessons">
        <div className="container">
          <h2 className="section-head">Lessons</h2>
          {loading && (
            <p role="status" aria-live="polite">
              Loading lessons...
            </p>
          )}
          {error && (
            <p role="alert" style={{ color: "var(--primary)" }}>
              {error}
            </p>
          )}
          {!loading && !error && filteredLessons.length === 0 && (
            <p>No lessons match your search and filter criteria.</p>
          )}
          <div className="grid grid-3" style={{ gap: "32px" }}>
            {filteredLessons.map((lesson) => (
              <article
                key={lesson._id || lesson.title}
                className="card"
                aria-labelledby={`lesson-title-${lesson._id}`}
              >
                <div
                  className="feature-icon"
                  aria-hidden="true"
                  style={{
                    borderTop: "2px solid var(--accent)",
                    borderRadius: "18px 18px 0 0",
                    height: "6px",
                    marginBottom: "12px",
                  }}
                />
                <h3
                  id={`lesson-title-${lesson._id}`}
                  style={{ marginBottom: "8px" }}
                >
                  {lesson.title || "Untitled Lesson"}
                </h3>
                <p
                  style={{ color: "var(--muted)", fontWeight: "500", fontSize: "0.9rem", minHeight: "54px" }}
                >
                  {(lesson.description || "").slice(0, 110)}
                  {(lesson.description || "").length > 110 ? "…" : ""}
                </p>
                <div>
                  <span className="badge" aria-label={`Level: ${lesson.level || "Unspecified"}`}>
                    {lesson.level || "Unspecified"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section" aria-label="Call to explore more Quranic content">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-head">Ready to start learning?</h2>
          <p>
            Dive into the lessons and enhance your connection with the Quran at
            your own pace. Join our community for ongoing support and
            insights.
          </p>
          <a href="/contact" className="btn btn-primary" tabIndex={0}>
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}