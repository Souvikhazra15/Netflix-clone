import React, { useMemo } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
import Footer from '../../components/Footer/Footer';
import useContent from '../../hooks/useContent';

const loadingRows = [
  'Trending Now',
  'Popular on Netflix',
  'Only on Netflix',
  'Action Hits',
  'Top Picks for You'
];

const Home = () => {
  const { groupedContent, featuredContent, isLoading, error } = useContent();

  const descriptionItems = useMemo(() => {
    if (isLoading) {
      return [];
    }

    return Object.values(groupedContent)
      .flat()
      .slice(0, 12);
  }, [groupedContent, isLoading]);

  return (
    <div className='home-page'>
      <Navbar />
      <Banner item={featuredContent} />

      <main className='home-content'>
        {error && <p className='home-error'>{error}</p>}

        {isLoading
          ? loadingRows.map((title) => <Row key={title} title={title} items={[]} isLoading />)
          : Object.entries(groupedContent).map(([category, items]) => (
              <Row key={category} title={category} items={items} isLoading={false} />
            ))}

        <section className='home-description-section'>
          <h2>Story Highlights</h2>
          <p className='home-description-subtitle'>
            Discover what each title is about and jump directly to its trailer.
          </p>

          <div className='home-description-grid'>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <article className='home-description-card home-description-card--skeleton' key={`description-skeleton-${index}`} />
                ))
              : descriptionItems.map((item) => (
                  <article className='home-description-card' key={`description-${item.id}`}>
                    <p className='home-description-card__category'>{item.category}</p>
                    <h3>{item.title}</h3>
                    <p>{item.overview}</p>
                    <a href={item.trailerUrl} target='_blank' rel='noopener noreferrer'>
                      Watch Trailer
                    </a>
                  </article>
                ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;