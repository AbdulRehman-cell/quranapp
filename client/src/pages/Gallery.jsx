import React from 'react';

const galleryImages = [
  { url: 'https://loremflickr.com/600/400/quran,study?lock=1', description: 'A student engaged in Quranic study.' },
  { url: 'https://loremflickr.com/600/400/islamic,art?lock=2', description: 'Beautiful Islamic geometric art.' },
  { url: 'https://loremflickr.com/600/400/mosque,serene?lock=3', description: 'A serene mosque courtyard.' },
  { url: 'https://loremflickr.com/600/400/quran,calligraphy?lock=4', description: 'Elegant Quranic calligraphy.' },
  { url: 'https://loremflickr.com/600/400/community,learning?lock=5', description: 'Community learning circle.' },
  { url: 'https://loremflickr.com/600/400/quran,classroom?lock=6', description: 'A classroom dedicated to Quranic education.' },
];

export default function Gallery() {
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
          {galleryImages.map((image, index) => (
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
              src="https://loremflickr.com/600/400/community,learning?lock=7"
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
              src="https://loremflickr.com/600/400/community,learning?lock=8"
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
          <div className="feature-card">
            <img
              src="https://loremflickr.com/600/400/quranic,art?lock=9"
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
        </div>
      </section>
    </div>
  );
}