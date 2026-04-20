import card1 from '../../assets/cards/card1.jpg';
import card2 from '../../assets/cards/card2.jpg';
import card3 from '../../assets/cards/card3.jpg';
import card4 from '../../assets/cards/card4.jpg';
import card5 from '../../assets/cards/card5.jpg';
import card6 from '../../assets/cards/card6.jpg';
import card7 from '../../assets/cards/card7.jpg';
import card8 from '../../assets/cards/card8.jpg';
import card9 from '../../assets/cards/card9.jpg';
import card10 from '../../assets/cards/card10.jpg';
import card11 from '../../assets/cards/card11.jpg';
import card12 from '../../assets/cards/card12.jpg';
import card13 from '../../assets/cards/card13.jpg';
import card14 from '../../assets/cards/card14.jpg';

const contentData = [
  {
    id: 'm1',
    title: 'The Night Agent',
    thumbnailUrl: card1,
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=YDbnY9Obsfs',
    overview: 'An FBI agent answers a mysterious emergency line and gets pulled into a deadly conspiracy.'
  },
  {
    id: 'm2',
    title: 'Wednesday',
    thumbnailUrl: card2,
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=Di310WS8zLk',
    overview: 'Wednesday Addams investigates a supernatural mystery at Nevermore Academy.'
  },
  {
    id: 'm3',
    title: 'Stranger Things',
    thumbnailUrl: card3,
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    overview: 'Small-town friends uncover secret experiments and a terrifying alternate world.'
  },
  {
    id: 'm4',
    title: 'Money Heist',
    thumbnailUrl: card4,
    category: 'Trending Now',
    trailerUrl: 'https://www.youtube.com/watch?v=_InqQJRqGW4',
    overview: 'A criminal mastermind leads an elite crew to execute history-making heists.'
  },
  {
    id: 'm5',
    title: 'The Witcher',
    thumbnailUrl: card5,
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
    overview: 'A monster hunter navigates destiny, politics, and danger across a fractured world.'
  },
  {
    id: 'm6',
    title: 'Dark',
    thumbnailUrl: card6,
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=ESEUoa-mz2c',
    overview: 'A missing child reveals a time-travel mystery that binds four families together.'
  },
  {
    id: 'm7',
    title: 'Breaking Bad',
    thumbnailUrl: card7,
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    overview: 'A chemistry teacher turns to crime and transforms into a ruthless drug kingpin.'
  },
  {
    id: 'm8',
    title: 'Ozark',
    thumbnailUrl: card8,
    category: 'Popular on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=5hAXVqrljbs',
    overview: 'A financial advisor laundered money for a cartel and relocates his family to survive.'
  },
  {
    id: 'm9',
    title: 'Arcane',
    thumbnailUrl: card9,
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=fXmAurh012s',
    overview: 'Two sisters are torn apart by conflict between utopian ideals and harsh realities.'
  },
  {
    id: 'm10',
    title: 'Love, Death & Robots',
    thumbnailUrl: card10,
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=wUFwunMKa4E',
    overview: 'Visually striking animated shorts explore sci-fi, fantasy, and dark comedy themes.'
  },
  {
    id: 'm11',
    title: 'Peaky Blinders',
    thumbnailUrl: card11,
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=oVzVdvGIC7U',
    overview: 'A notorious family rises through the criminal underworld in post-war Birmingham.'
  },
  {
    id: 'm12',
    title: 'The Queen\'s Gambit',
    thumbnailUrl: card12,
    category: 'Only on Netflix',
    trailerUrl: 'https://www.youtube.com/watch?v=oZn3qSgmLqI',
    overview: 'A chess prodigy battles addiction and personal demons on her way to greatness.'
  },
  {
    id: 'm13',
    title: 'Extraction 2',
    thumbnailUrl: card13,
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=Y274jZs5s7s',
    overview: 'A black-ops mercenary returns for a high-risk mission with no room for mistakes.'
  },
  {
    id: 'm14',
    title: 'The Old Guard',
    thumbnailUrl: card14,
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=aK-X2d0lJ_s',
    overview: 'Immortal mercenaries face a new threat while protecting their oldest secret.'
  },
  {
    id: 'm15',
    title: 'Manifest',
    thumbnailUrl: card3,
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=LjsFgS4jRz8',
    overview: 'Passengers return from a flight years later and discover strange new callings.'
  },
  {
    id: 'm16',
    title: 'Black Mirror',
    thumbnailUrl: card5,
    category: 'Action Hits',
    trailerUrl: 'https://www.youtube.com/watch?v=jDiYGjp5iFg',
    overview: 'An anthology exploring the unsettling relationship between technology and society.'
  },
  {
    id: 'm17',
    title: 'One Piece',
    thumbnailUrl: card2,
    category: 'Top Picks for You',
    trailerUrl: 'https://www.youtube.com/watch?v=Ades3pQbeh8',
    overview: 'A spirited pirate captain and his crew search for the world\'s ultimate treasure.'
  },
  {
    id: 'm18',
    title: 'Squid Game',
    thumbnailUrl: card4,
    category: 'Top Picks for You',
    trailerUrl: 'https://www.youtube.com/watch?v=oqxAJKy0ii4',
    overview: 'Cash-strapped players compete in deadly childhood games for a life-changing prize.'
  },
  {
    id: 'm19',
    title: 'Narcos',
    thumbnailUrl: card8,
    category: 'Top Picks for You',
    trailerUrl: 'https://www.youtube.com/watch?v=xl8zdCY-abw',
    overview: 'The rise of drug empires and law enforcement\'s fight to stop them.'
  },
  {
    id: 'm20',
    title: 'Lupin',
    thumbnailUrl: card10,
    category: 'Top Picks for You',
    trailerUrl: 'https://www.youtube.com/watch?v=ga0iTWXCGa0',
    overview: 'A master thief seeks revenge with brilliant heists inspired by Arsene Lupin.'
  }
];

export default contentData;
