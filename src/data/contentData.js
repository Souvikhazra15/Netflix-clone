const contentData = [
  {
    id: 'm1',
    title: 'The Night Agent',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/fQMSaP88cf1nz4qwuNEEFtazuDM.jpg',
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=YDbnY9Obsfs',
    overview: 'An FBI agent answers a mysterious emergency line and gets pulled into a deadly conspiracy.'
  },
  {
    id: 'm2',
    title: 'Wednesday',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=Di310WS8zLk',
    overview: 'Wednesday Addams investigates a supernatural mystery at Nevermore Academy.'
  },
  {
    id: 'm3',
    title: 'Stranger Things',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    overview: 'Small-town friends uncover secret experiments and a terrifying alternate world.'
  },
  {
    id: 'm4',
    title: 'Money Heist',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=_InqQJRqGW4',
    overview: 'A criminal mastermind leads an elite crew to execute history-making heists.'
  },
  {
    id: 'm5',
    title: 'The Witcher',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/foGkPxpw9h8zln81j63mix5B7m8.jpg',
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
    overview: 'A monster hunter navigates destiny, politics, and danger across a fractured world.'
  },
  {
    id: 'm6',
    title: 'Dark',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/5Lo5k9k8fQ6TLgq3fD4P5cg2q1B.jpg',
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=ESEUoa-mz2c',
    overview: 'A missing child reveals a time-travel mystery that binds four families together.'
  },
  {
    id: 'm7',
    title: 'Breaking Bad',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg',
    category: 'Because You Watched Crime Dramas',
    trailerUrl: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    overview: 'A chemistry teacher turns to crime and transforms into a ruthless drug kingpin.'
  },
  {
    id: 'm8',
    title: 'Ozark',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/pCGy7fFhJZ7VCf2vEgxGt4P9S5S.jpg',
    category: 'Because You Watched Crime Dramas',
    trailerUrl: 'https://www.youtube.com/watch?v=5hAXVqrljbs',
    overview: 'A financial advisor laundered money for a cartel and relocates his family to survive.'
  },
  {
    id: 'm9',
    title: 'Arcane',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    category: 'Animated Series',
    trailerUrl: 'https://www.youtube.com/watch?v=fXmAurh012s',
    overview: 'Two sisters are torn apart by conflict between utopian ideals and harsh realities.'
  },
  {
    id: 'm10',
    title: 'Love, Death & Robots',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/AsY2k8s8N6fKfG4wj8f2QnqN8A8.jpg',
    category: 'Animated Series',
    trailerUrl: 'https://www.youtube.com/watch?v=wUFwunMKa4E',
    overview: 'Visually striking animated shorts explore sci-fi, fantasy, and dark comedy themes.'
  },
  {
    id: 'm11',
    title: 'Peaky Blinders',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/bGZn5RVzMMXju4ev7xbl1aLdXqq.jpg',
    category: 'Critically Acclaimed',
    trailerUrl: 'https://www.youtube.com/watch?v=oVzVdvGIC7U',
    overview: 'A notorious family rises through the criminal underworld in post-war Birmingham.'
  },
  {
    id: 'm12',
    title: 'The Queen\'s Gambit',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg',
    category: 'Critically Acclaimed',
    trailerUrl: 'https://www.youtube.com/watch?v=oZn3qSgmLqI',
    overview: 'A chess prodigy battles addiction and personal demons on her way to greatness.'
  },
  {
    id: 'm13',
    title: 'Extraction 2',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/7jTQy3M6zjH2f6NQkQX5Y5Q5X5A.jpg',
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=Y274jZs5s7s',
    overview: 'A black-ops mercenary returns for a high-risk mission with no room for mistakes.'
  },
  {
    id: 'm14',
    title: 'The Old Guard',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/cjr4NWURcVN3gW5FlHeabgBHLrY.jpg',
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=aK-X2d0lJ_s',
    overview: 'Immortal mercenaries face a new threat while protecting their oldest secret.'
  },
  {
    id: 'm15',
    title: 'Manifest',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/3mQAXEKSmQ6BL4jJQvstJ8aY3Vx.jpg',
    category: 'Sci-Fi & Mystery',
    trailerUrl: 'https://www.youtube.com/watch?v=LjsFgS4jRz8',
    overview: 'Passengers return from a flight years later and discover strange new callings.'
  },
  {
    id: 'm16',
    title: 'Black Mirror',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/7PRddO7z7mcPi21nZTCMGShAyy1.jpg',
    category: 'Sci-Fi & Mystery',
    trailerUrl: 'https://www.youtube.com/watch?v=jDiYGjp5iFg',
    overview: 'An anthology exploring the unsettling relationship between technology and society.'
  },
  {
    id: 'm17',
    title: 'One Piece',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
    category: 'Top 10 TV Shows',
    trailerUrl: 'https://www.youtube.com/watch?v=Ades3pQbeh8',
    overview: 'A spirited pirate captain and his crew search for the world\'s ultimate treasure.'
  },
  {
    id: 'm18',
    title: 'Squid Game',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/6jUgJFVPSrE6Q8f37w4fA6F2E5A.jpg',
    category: 'Top 10 TV Shows',
    trailerUrl: 'https://www.youtube.com/watch?v=oqxAJKy0ii4',
    overview: 'Cash-strapped players compete in deadly childhood games for a life-changing prize.'
  },
  {
    id: 'm19',
    title: 'Narcos',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/rTmal9fDbwh5F0waol2hq35U4ah.jpg',
    category: 'Binge-Worthy Series',
    trailerUrl: 'https://www.youtube.com/watch?v=xl8zdCY-abw',
    overview: 'The rise of drug empires and law enforcement\'s fight to stop them.'
  },
  {
    id: 'm20',
    title: 'Lupin',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w780/6qkq7B8w2H6YfJmRoTSesFiNUFD.jpg',
    category: 'Binge-Worthy Series',
    trailerUrl: 'https://www.youtube.com/watch?v=ga0iTWXCGa0',
    overview: 'A master thief seeks revenge with brilliant heists inspired by Arsene Lupin.'
  }
];

export default contentData;
