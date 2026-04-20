import React from 'react';
import './Banner.css';

const Banner = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <section className="banner" style={{ backgroundImage: `url(${item.thumbnailUrl})` }}>
      <div className="banner__overlay" />
      <div className="banner__content">
        <p className="banner__badge">Featured</p>
        <h1>{item.title}</h1>
        <p>{item.overview}</p>
        <div className="banner__actions">
          <a href={item.trailerUrl} target="_blank" rel="noopener noreferrer" className="banner__btn banner__btn--light">
            Play Trailer
          </a>
          <a href={item.trailerUrl} target="_blank" rel="noopener noreferrer" className="banner__btn banner__btn--dark">
            More Info
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
