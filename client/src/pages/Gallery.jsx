import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data);
      } catch (err) {
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!images.length) return <div className="empty-state">No images available.</div>;

  return (
    <div className="container">
      <section className="hero">
        <div className="container">
          <h1>Gallery of Learning</h1>
          <p>Explore moments from our community's journey of Quranic education.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-head">Learning Moments</h2>
        <div className="grid grid-3">
          {images.map((image, index) => (
            <div key={index} className="card">
              <img
                src={image.url}
                alt={image.description}
                width="600"
                height="400"
                style={{ objectFit: 'cover', borderRadius: '18px' }}
              />
              <div className="card-content">
                <p className="card-description">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-head">Community Events</h2>
        <div className="grid grid-2">
          <div className="card">
            <img
              src="https://loremflickr.com/600/400/community,learning?lock=1"
              alt="Community Event"
              width="600"
              height="400"
              style={{ objectFit: 'cover', borderRadius: '18px' }}
            />
            <div className="card-content">
              <h3>Quranic Retreat 2023</h3>
              <p>
                Join us for a serene retreat focused on Quranic reflection, connection, and growth.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://loremflickr.com/600/400/community,learning?lock=2"
              alt="Community Event"
              width="600"
              height="400"
              style={{ objectFit: 'cover', borderRadius: '18px' }}
            />
            <div className="card-content">
              <h3>Weekly Study Circles</h3>
              <p>
                Engage with our community every Saturday for enlightening discussions and explorations of the Quran.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-head">Art and Inspiration</h2>
        <div className="grid grid-4">
          {/* Example card for featured art */}
          <div className="feature-card">
            <img
              src="https://loremflickr.com/600/400/quranic,art?lock=3"
              alt="Quranic Art"
              width="600"
              height="400"
              style={{ objectFit: 'cover', borderRadius: '18px' }}
            />
            <div className="feature-content">
              <h3>Quranic Calligraphy</h3>
              <p>Discover the beauty of Quranic art through elaborate calligraphy.</p>
            </div>
          </div>
          {/* Repeat for more art-related cards as needed */}
        </div>
      </section>
    </div>
  );
}