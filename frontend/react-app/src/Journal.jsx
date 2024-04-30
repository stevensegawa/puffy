import React from 'react';
import './Journal.css'; // Make sure the CSS file is linked
import puffyImage from './puffy.JPG'; // Make sure to replace with the correct path

const Journal = () => {
  return (
    <div className="journal-container">
      <div className="journal-content">
        <div className="journal-text">
          <h1>Gratitude Journal</h1>
          <ul>
            <li>Puffy summarizes your convo</li>
            <li>Reflect on the highlights of your day</li>
            <li>Choose any date you talked with Puffy</li>
          </ul>
        </div>
        <img src={puffyImage} alt="Puffy" className="journal-image" />
      </div>
      <div className="journal-entries">
        {/* Here would be your journal entries. This is just a placeholder. */}
        <div className="entry-placeholder"></div>
      </div>
    </div>
  );
};

export default Journal;
