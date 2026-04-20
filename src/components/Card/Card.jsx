import React from 'react';
import './Card.css';

const Card = ({ item }) => {
  return (
    <a
      className="content-card"
      href={item.trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch trailer: ${item.title}`}
    >
      <img src={item.thumbnailUrl} alt={item.title} loading="lazy" />
      <span className="content-card__title">{item.title}</span>
    </a>
  );
};

export default Card;
