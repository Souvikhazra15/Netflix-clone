import React, { useEffect, useMemo, useState } from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import searchIcon from '../../../assets/search_icon.svg';
import bellIcon from '../../../assets/bell_icon.svg';
import profileImg from '../../../assets/profile_img.png';
import caretIcon from '../../../assets/caret_icon.svg';

const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

const notificationItems = [
  'New episode: Wednesday is now streaming',
  'Because you watched Dark: Try Black Mirror',
  'Top 10 update: The Night Agent climbed to #1'
];

const Navbar = ({
  activeNav,
  onNavChange,
  searchQuery,
  onSearchChange,
  availableLanguages,
  selectedLanguage,
  onLanguageChange
}) => {
  const [isSolid, setIsSolid] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > 48);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDocumentClick = () => {
      setIsNotificationsOpen(false);
      setIsProfileOpen(false);
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  const unreadCount = useMemo(() => notificationItems.length, []);

  return (
    <header className={`navbar ${isSolid ? 'navbar--solid' : ''}`}>
      <div className='navbar-left'>
        <img src={logo} alt="Logo" />
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <button
                type='button'
                className={`navbar-link ${activeNav === item ? 'navbar-link--active' : ''}`}
                onClick={() => onNavChange(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='navbar-right'>
        <div className={`navbar-search ${isSearchOpen ? 'navbar-search--open' : ''}`}>
          <button
            type='button'
            className='icon-btn'
            aria-label='Open search'
            onClick={(event) => {
              event.stopPropagation();
              setIsSearchOpen((prev) => !prev);
            }}
          >
            <img src={searchIcon} alt='Search' className='icons' />
          </button>
          {isSearchOpen && (
            <input
              type='text'
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Titles, people, genres'
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>

        {activeNav === 'Browse by Language' && (
          <select
            className='language-picker'
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
            aria-label='Select language'
          >
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        )}

        <p className='kids-label'>Children</p>

        <div
          className='navbar-notifications'
          onClick={(event) => {
            event.stopPropagation();
            setIsNotificationsOpen((prev) => !prev);
            setIsProfileOpen(false);
          }}
        >
          <button type='button' className='icon-btn' aria-label='Notifications'>
            <img src={bellIcon} alt='Bell' className='icons' />
            {unreadCount > 0 && <span className='notification-badge'>{unreadCount}</span>}
          </button>
          {isNotificationsOpen && (
            <div className='dropdown notification-dropdown'>
              {notificationItems.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          )}
        </div>

        <div
          className='navbar-profile'
          onClick={(event) => {
            event.stopPropagation();
            setIsProfileOpen((prev) => !prev);
            setIsNotificationsOpen(false);
          }}
        >
          <img src={profileImg} alt='Profile' className='profile' />
          <img src={caretIcon} alt='Caret' className='caret' />
          {isProfileOpen && (
            <div className='dropdown'>
              <p>Manage Profiles</p>
              <p>Account</p>
              <p>Sign out of Netflix</p>
            </div>
          )}
        </div>

        <div className='navbar-mobile-menu'>
          <select
            aria-label='Navigation'
            value={activeNav}
            onChange={(event) => onNavChange(event.target.value)}
          >
            {navItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

Navbar.defaultProps = {
  activeNav: 'Home',
  onNavChange: () => {},
  searchQuery: '',
  onSearchChange: () => {},
  availableLanguages: ['All Languages'],
  selectedLanguage: 'All Languages',
  onLanguageChange: () => {}
};

export default Navbar;