import React from 'react';
import styles from './ArtworkSelector.module.css';

function ArtworkSelector({ text, index }) {
  return (
    <li className={styles.artworkListItem}>
      <button
        className={index ? 'artwork-button-default' : 'artwork-button-highlight'}
      >
        {text}
      </button>
    </li>
  );
}

export default ArtworkSelector;