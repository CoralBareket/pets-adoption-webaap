import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/assets/styles/HPSearchBar.css';

const SearchBar = () => {
    const [breed, setBreed] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const handleBreedChange = (e) => setBreed(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);

    const handleAdvancedSearch = () => {
        navigate('/matching-quiz');
    };

    const handleClearSearch = () => {
        setBreed('');
        setLocation('');
        setAge('');
    };

    return (
        <section className="search-bar">
            <h2>מצאו את השידוך המושלם</h2>
            <div className="search-form-container">
                <form className="search-form">
                    <div className="form-group">
                        <label htmlFor="breed">אני רוצה לאמץ</label>
                        <select id="breed" value={breed} onChange={handleBreedChange}>
                            <option value="" disabled hidden>כלב</option>
                            <option value="dog">כלב</option>
                            <option value="cat">חתול</option>
                            <option value="other">אחר</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">באזור</label>
                        <select id="location" value={location} onChange={handleLocationChange}>
                            <option value="" disabled hidden>בחר אזור</option>
                            <option value="north">צפון</option>
                            <option value="center">מרכז</option>
                            <option value="south">דרום</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">בגיל</label>
                        <select id="age" value={age} onChange={handleAgeChange}>
                            <option value="" disabled hidden>בחר גיל</option>
                            <option value="puppy">גור</option>
                            <option value="young">צעיר</option>
                            <option value="adult">בוגר</option>
                            <option value="senior">מבוגר</option>
                        </select>
                    </div>
                </form>
                <button type="submit" className="search-btn">חיפוש</button>
            </div>
            <div className="search-options">
                <button className="advanced-search" onClick={handleAdvancedSearch}>
                    <span className="icon-container">
                        <span className="icon">≡</span>
                    </span>
                    <span className="text">חיפוש מתקדם</span>
                </button>
                <button className="image-search">
                    <span className="icon-container">
                        <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 6 C 6 6 6 8 6 8" />
                            <path d="M16 6 C 18 6 18 8 18 8" />
                            <path d="M8 18 C 6 18 6 16 6 16" />
                            <path d="M16 18 C 18 18 18 16 18 16" />
                        </svg>
                    </span>
                    <span className="text">חיפוש לפי תמונה</span>
                </button>
                <button className="clear-search" onClick={handleClearSearch}>
                    <span className="icon-container">
                        <span className="icon">×</span>
                    </span>
                    <span className="text">נקה חיפוש</span>
                </button>
            </div>
        </section>
    );
};

export default SearchBar;