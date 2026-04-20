const getTrailerUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;
const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const contentData = [
  {
    id: 'm1',
    title: 'The Night Agent',
    thumbnailUrl: getThumbnailUrl('YDbnY9Obsfs'),
    category: 'Trending Now',
    trailerUrl: getTrailerUrl('YDbnY9Obsfs'),
    overview: 'An FBI agent answers a mysterious emergency line and gets pulled into a deadly conspiracy.'
  },
  {
    id: 'm2',
    title: 'Wednesday',
    thumbnailUrl: getThumbnailUrl('Di310WS8zLk'),
    category: 'Trending Now',
    trailerUrl: getTrailerUrl('Di310WS8zLk'),
    overview: 'Wednesday Addams investigates a supernatural mystery at Nevermore Academy.'
  },
  {
    id: 'm3',
    title: 'Stranger Things',
    thumbnailUrl: getThumbnailUrl('b9EkMc79ZSU'),
    category: 'Trending Now',
    trailerUrl: getTrailerUrl('b9EkMc79ZSU'),
    overview: 'Small-town friends uncover secret experiments and a terrifying alternate world.'
  },
  {
    id: 'm4',
    title: 'Money Heist',
    thumbnailUrl: getThumbnailUrl('_InqQJRqGW4'),
    category: 'Trending Now',
    trailerUrl: getTrailerUrl('_InqQJRqGW4'),
    overview: 'A criminal mastermind leads an elite crew to execute history-making heists.'
  },
  {
    id: 'm5',
    title: 'The Witcher',
    thumbnailUrl: getThumbnailUrl('ndl1W4ltcmg'),
    category: 'Popular on Netflix',
    trailerUrl: getTrailerUrl('ndl1W4ltcmg'),
    overview: 'A monster hunter navigates destiny, politics, and danger across a fractured world.'
  },
  {
    id: 'm6',
    title: 'Dark',
    thumbnailUrl: getThumbnailUrl('ESEUoa-mz2c'),
    category: 'Popular on Netflix',
    trailerUrl: getTrailerUrl('ESEUoa-mz2c'),
    overview: 'A missing child reveals a time-travel mystery that binds four families together.'
  },
  {
    id: 'm7',
    title: 'Breaking Bad',
    thumbnailUrl: getThumbnailUrl('HhesaQXLuRY'),
    category: 'Popular on Netflix',
    trailerUrl: getTrailerUrl('HhesaQXLuRY'),
    overview: 'A chemistry teacher turns to crime and transforms into a ruthless drug kingpin.'
  },
  {
    id: 'm8',
    title: 'Ozark',
    thumbnailUrl: getThumbnailUrl('5hAXVqrljbs'),
    category: 'Popular on Netflix',
    trailerUrl: getTrailerUrl('5hAXVqrljbs'),
    overview: 'A financial advisor laundered money for a cartel and relocates his family to survive.'
  },
  {
    id: 'm9',
    title: 'Arcane',
    thumbnailUrl: getThumbnailUrl('fXmAurh012s'),
    category: 'Only on Netflix',
    trailerUrl: getTrailerUrl('fXmAurh012s'),
    overview: 'Two sisters are torn apart by conflict between utopian ideals and harsh realities.'
  },
  {
    id: 'm10',
    title: 'Love, Death & Robots',
    thumbnailUrl: getThumbnailUrl('wUFwunMKa4E'),
    category: 'Only on Netflix',
    trailerUrl: getTrailerUrl('wUFwunMKa4E'),
    overview: 'Visually striking animated shorts explore sci-fi, fantasy, and dark comedy themes.'
  },
  {
    id: 'm11',
    title: 'Peaky Blinders',
    thumbnailUrl: getThumbnailUrl('oVzVdvGIC7U'),
    category: 'Only on Netflix',
    trailerUrl: getTrailerUrl('oVzVdvGIC7U'),
    overview: 'A notorious family rises through the criminal underworld in post-war Birmingham.'
  },
  {
    id: 'm12',
    title: 'The Queen\'s Gambit',
    thumbnailUrl: getThumbnailUrl('oZn3qSgmLqI'),
    category: 'Only on Netflix',
    trailerUrl: getTrailerUrl('oZn3qSgmLqI'),
    overview: 'A chess prodigy battles addiction and personal demons on her way to greatness.'
  },
  {
    id: 'm13',
    title: 'Extraction 2',
    thumbnailUrl: getThumbnailUrl('Y274jZs5s7s'),
    category: 'Action Hits',
    trailerUrl: getTrailerUrl('Y274jZs5s7s'),
    overview: 'A black-ops mercenary returns for a high-risk mission with no room for mistakes.'
  },
  {
    id: 'm14',
    title: 'The Old Guard',
    thumbnailUrl: getThumbnailUrl('aK-X2d0lJ_s'),
    category: 'Action Hits',
    trailerUrl: getTrailerUrl('aK-X2d0lJ_s'),
    overview: 'Immortal mercenaries face a new threat while protecting their oldest secret.'
  },
  {
    id: 'm15',
    title: 'Manifest',
    thumbnailUrl: getThumbnailUrl('LjsFgS4jRz8'),
    category: 'Action Hits',
    trailerUrl: getTrailerUrl('LjsFgS4jRz8'),
    overview: 'Passengers return from a flight years later and discover strange new callings.'
  },
  {
    id: 'm16',
    title: 'Black Mirror',
    thumbnailUrl: getThumbnailUrl('jDiYGjp5iFg'),
    category: 'Action Hits',
    trailerUrl: getTrailerUrl('jDiYGjp5iFg'),
    overview: 'An anthology exploring the unsettling relationship between technology and society.'
  },
  {
    id: 'm17',
    title: 'One Piece',
    thumbnailUrl: getThumbnailUrl('Ades3pQbeh8'),
    category: 'Top Picks for You',
    trailerUrl: getTrailerUrl('Ades3pQbeh8'),
    overview: 'A spirited pirate captain and his crew search for the world\'s ultimate treasure.'
  },
  {
    id: 'm18',
    title: 'Squid Game',
    thumbnailUrl: getThumbnailUrl('oqxAJKy0ii4'),
    category: 'Top Picks for You',
    trailerUrl: getTrailerUrl('oqxAJKy0ii4'),
    overview: 'Cash-strapped players compete in deadly childhood games for a life-changing prize.'
  },
  {
    id: 'm19',
    title: 'Narcos',
    thumbnailUrl: getThumbnailUrl('xl8zdCY-abw'),
    category: 'Top Picks for You',
    trailerUrl: getTrailerUrl('xl8zdCY-abw'),
    overview: 'The rise of drug empires and law enforcement\'s fight to stop them.'
  },
  {
    id: 'm20',
    title: 'Lupin',
    thumbnailUrl: getThumbnailUrl('ga0iTWXCGa0'),
    category: 'Top Picks for You',
    trailerUrl: getTrailerUrl('ga0iTWXCGa0'),
    overview: 'A master thief seeks revenge with brilliant heists inspired by Arsene Lupin.'
  }
];

export default contentData;
