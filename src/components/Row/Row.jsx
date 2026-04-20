import React from 'react';
import Card from '../Card/Card';
import './Row.css';

const SKELETON_COUNT = 6;

const Row = ({ title, items, isLoading }) => {
  return (
    <section className="content-row" aria-label={title}>
      <h2>{title}</h2>
      <div className="content-row__track">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={`${title}-skeleton-${index}`} className="content-row__skeleton" />
            ))
          : items.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </section>
  );
};

export default Row;
