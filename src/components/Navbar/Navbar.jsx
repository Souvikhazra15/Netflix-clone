import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import searchIcon from '../../../assets/search_icon.svg';
import bellIcon from '../../../assets/bell_icon.svg';
import profileImg from '../../../assets/profile_img.png';
import caretIcon from '../../../assets/caret_icon.svg';

const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

const Navbar = () => {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > 48);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${isSolid ? 'navbar--solid' : ''}`}>
      <div className='navbar-left'>
        <img src={logo} alt="Logo" />
        <ul>
          {navItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={searchIcon} alt="Search" className='icons' />
        <p>Children</p>
        <img src={bellIcon} alt="Bell" className='icons' />
        <div className='navbar-profile'>
          <img src={profileImg} alt="Profile" className='profile' />
          <img src={caretIcon} alt="Caret" className='caret' />
          <div className='dropdown'>
            <p>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;