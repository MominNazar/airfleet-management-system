import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HeroSection.css';
import airplane from '../assets/images/plane.jpg';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="hero-section" style={{ backgroundImage: `url(${airplane})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>AirFleet.com</h1>
                <h2>ARE YOU READY TO FLY?</h2> {/* Updated slogan for better grammar */}
                <p>Please Sign in</p>
                <button onClick={() => navigate('/login')}>Sign In</button>
                <button onClick={() => navigate('/register')}>Sign Up</button>
            </div>
        </div>
    );
};

export default HeroSection;
