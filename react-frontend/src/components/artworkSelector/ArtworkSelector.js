import React from 'react';
import './ArtworkSelector.module.css';

function ArtworkSelector({ text, index }) {
  return (
    <li className="artwork-list-item">
      <button
        className={index ? 'artwork-button-default' : 'artwork-button-highlight'}
      >
        {text}
      </button>
    </li>
  );
}

export default ArtworkSelector;