import React from 'react'
import './Player.css'
import back_arrow from '../../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom'

const Player = () => {
  const navigate = useNavigate();

  return (
    <div className='player'>
      <img src={back_arrow} alt="Back" className='back-arrow' onClick={() => navigate(-1)} />
      <div className='player-container'>
        <iframe
          src='https://www.youtube.com/embed/KhXWLkeG0A4'
          title='Trailer' 
          frameBorder='0' 
          allowFullScreen>
        </iframe>
      </div>
      <div className='player-info'>
        <h3>Published Date</h3>
        <h2>Series Name</h2>
        <p>Action • Thriller • Drama</p>
      </div>
    </div>
  )
}

export default Player