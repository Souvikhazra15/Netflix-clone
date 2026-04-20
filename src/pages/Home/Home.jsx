import React from 'react';
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
  'Sci-Fi & Mystery'
];

const Home = () => {
  const { groupedContent, featuredContent, isLoading, error } = useContent();

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
      </main>

      <Footer />
    </div>
  );
};

export default Home;