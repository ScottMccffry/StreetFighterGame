import React, { useState, useEffect } from 'react';
import styles from './SideBarRIght.module.css'

const API_BASE_URL = 'http://127.0.0.1:5000';

function SideBarRight({ showBetSidebar, selectedBet }) {
  const [fighters, setFighters] = useState([]);
  useEffect(() => {
    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
    }

    fetchFighters();
  }, []);


return (
    <div className={styles.sidebarRight}>
      <h2 className={styles.title}>Ranking</h2>
      <ul className={styles.fighterList}>
        {fighters.length > 0 &&
          fighters
            .sort((a, b) => a.rank - b.rank)
            .map(({ name, handler, image, rank }) => (
              <li className={styles.fighterItem} key={handler}>
                <h1 className={styles.fighterRank}>#{rank} </h1>
                <img
                  src={image}
                  className={styles.fighterImage}
                  alt={`top artist ${name}`}
                />
                <div className={styles.fighterInfo}>
                  <h3 className={styles.fighterName}>{name}</h3>
                  <p className={styles.fighterHandler}>{handler}</p>
                </div>
              </li>
            ))}
      </ul>
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Buy a collection with ethereum</h2>
          <p className={styles.ctaDescription}>
            You can buy a collection of artwork with ethereum very easy and
            simple.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default SideBarRight;