import { useEffect, useMemo, useState } from 'react';
import contentData from '../data/contentData';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

const tmdbRows = [
  { category: 'Trending Now', endpoint: '/trending/all/week' },
  { category: 'Popular on Netflix', endpoint: '/movie/popular' },
  { category: 'Only on Netflix', endpoint: '/tv/popular' },
  { category: 'Action Hits', endpoint: '/discover/movie?with_genres=28' },
  { category: 'Sci-Fi & Mystery', endpoint: '/discover/tv?with_genres=10765' }
];

function toTrailerSearchUrl(title) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} official trailer`)}`;
}

function normalizeTmdbResults(items, category) {
  return items
    .map((item) => {
      const title = item.title || item.name || 'Untitled';
      const imagePath = item.backdrop_path || item.poster_path;

      if (!imagePath) {
        return null;
      }

      return {
        id: `tmdb-${category}-${item.id}`,
        title,
        thumbnailUrl: `${TMDB_IMAGE_BASE}${imagePath}`,
        category,
        trailerUrl: toTrailerSearchUrl(title),
        overview: item.overview || 'No description available.'
      };
    })
    .filter(Boolean);
}

function buildTmdbUrl(endpoint, apiKey) {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${TMDB_API_BASE}${endpoint}${separator}api_key=${apiKey}&language=en-US`;
}

export default function useContent() {
  const [content, setContent] = useState(contentData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    if (!apiKey) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadFromTmdb() {
      setIsLoading(true);
      setError('');

      try {
        const requests = tmdbRows.map(({ endpoint }) =>
          fetch(buildTmdbUrl(endpoint, apiKey), { signal: controller.signal }).then((res) => {
            if (!res.ok) {
              throw new Error('Failed to load content.');
            }
            return res.json();
          })
        );

        const responses = await Promise.all(requests);

        const merged = responses.flatMap((response, index) => {
          const category = tmdbRows[index].category;
          return normalizeTmdbResults(response.results || [], category);
        });

        if (merged.length > 0) {
          setContent(merged);
        } else {
          setContent(contentData);
        }
      } catch (tmdbError) {
        if (tmdbError.name !== 'AbortError') {
          setError('Unable to fetch live data. Showing curated picks instead.');
          setContent(contentData);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadFromTmdb();

    return () => controller.abort();
  }, []);

  const featuredContent = useMemo(() => {
    return content.find((item) => item.category === 'Trending Now') || content[0] || null;
  }, [content]);

  const groupedContent = useMemo(() => {
    return content.reduce((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
      return groups;
    }, {});
  }, [content]);

  return {
    content,
    groupedContent,
    featuredContent,
    isLoading,
    error
  };
}
