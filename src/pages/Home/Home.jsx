import React, { useMemo, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
import Footer from '../../components/Footer/Footer';
import useContent from '../../hooks/useContent';

const navFilters = {
  HOME: 'Home',
  TV: 'TV Shows',
  MOVIES: 'Movies',
  NEW: 'New & Popular',
  LIST: 'My List',
  LANGUAGE: 'Browse by Language'
};

const loadingRows = [
  'Trending Now',
  'Popular on Netflix',
  'Only on Netflix',
  'Action Hits',
  'Top Picks for You'
];

const titleMetadata = {
  'The Night Agent': { type: 'series', language: 'English', isNewPopular: true, inMyList: true },
  Wednesday: { type: 'series', language: 'English', isNewPopular: true, inMyList: true },
  'Stranger Things': { type: 'series', language: 'English', isNewPopular: false, inMyList: true },
  'Money Heist': { type: 'series', language: 'Spanish', isNewPopular: false, inMyList: false },
  'The Witcher': { type: 'series', language: 'English', isNewPopular: true, inMyList: true },
  Dark: { type: 'series', language: 'German', isNewPopular: false, inMyList: false },
  'Breaking Bad': { type: 'series', language: 'English', isNewPopular: false, inMyList: true },
  Ozark: { type: 'series', language: 'English', isNewPopular: false, inMyList: false },
  Arcane: { type: 'series', language: 'English', isNewPopular: true, inMyList: true },
  'Love, Death & Robots': { type: 'series', language: 'English', isNewPopular: true, inMyList: false },
  'Peaky Blinders': { type: 'series', language: 'English', isNewPopular: false, inMyList: false },
  'The Queen\'s Gambit': { type: 'series', language: 'English', isNewPopular: false, inMyList: true },
  'Extraction 2': { type: 'movie', language: 'English', isNewPopular: true, inMyList: false },
  'The Old Guard': { type: 'movie', language: 'English', isNewPopular: false, inMyList: false },
  Manifest: { type: 'series', language: 'English', isNewPopular: false, inMyList: false },
  'Black Mirror': { type: 'series', language: 'English', isNewPopular: false, inMyList: true },
  'One Piece': { type: 'series', language: 'Japanese', isNewPopular: true, inMyList: true },
  'Squid Game': { type: 'series', language: 'Korean', isNewPopular: false, inMyList: true },
  Narcos: { type: 'series', language: 'Spanish', isNewPopular: false, inMyList: false },
  Lupin: { type: 'series', language: 'French', isNewPopular: true, inMyList: false }
};

const Home = () => {
  const { content, featuredContent, isLoading, error } = useContent();
  const [activeNav, setActiveNav] = useState(navFilters.HOME);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');

  const enrichedContent = useMemo(() => {
    return content.map((item) => {
      const metadata = titleMetadata[item.title] || {
        type: 'series',
        language: 'English',
        isNewPopular: false,
        inMyList: false
      };

      return {
        ...item,
        ...metadata
      };
    });
  }, [content]);

  const availableLanguages = useMemo(() => {
    const languages = [...new Set(enrichedContent.map((item) => item.language))].sort();
    return ['All Languages', ...languages];
  }, [enrichedContent]);

  const filteredContent = useMemo(() => {
    let result = [...enrichedContent];

    if (activeNav === navFilters.TV) {
      result = result.filter((item) => item.type === 'series');
    }

    if (activeNav === navFilters.MOVIES) {
      result = result.filter((item) => item.type === 'movie');
    }

    if (activeNav === navFilters.NEW) {
      result = result.filter((item) => item.isNewPopular);
    }

    if (activeNav === navFilters.LIST) {
      result = result.filter((item) => item.inMyList);
    }

    if (activeNav === navFilters.LANGUAGE && selectedLanguage !== 'All Languages') {
      result = result.filter((item) => item.language === selectedLanguage);
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.category.toLowerCase().includes(normalizedQuery) ||
          item.overview.toLowerCase().includes(normalizedQuery)
      );
    }

    return result;
  }, [activeNav, enrichedContent, searchQuery, selectedLanguage]);

  const groupedFilteredContent = useMemo(() => {
    return filteredContent.reduce((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
      return groups;
    }, {});
  }, [filteredContent]);

  const dynamicFeatured = useMemo(() => {
    if (filteredContent.length === 0) {
      return featuredContent;
    }
    return filteredContent.find((item) => item.category === 'Trending Now') || filteredContent[0];
  }, [featuredContent, filteredContent]);

  return (
    <div className='home-page'>
      <Navbar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availableLanguages={availableLanguages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      <Banner item={dynamicFeatured} />

      <main className='home-content'>
        {error && <p className='home-error'>{error}</p>}

        {isLoading
          ? loadingRows.map((title) => <Row key={title} title={title} items={[]} isLoading />)
          : Object.entries(groupedFilteredContent).map(([category, items]) => <Row key={category} title={category} items={items} isLoading={false} />)}

        {!isLoading && filteredContent.length === 0 && (
          <div className='home-empty-state'>
            <h3>No titles found</h3>
            <p>Try a different search or switch to another section from the top menu.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;