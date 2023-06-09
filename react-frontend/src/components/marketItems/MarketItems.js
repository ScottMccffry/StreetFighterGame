import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import styles from './MarketItems.module.css';

const API_BASE_URL = 'http://127.0.0.1:5000';

function MarketItems() {
  const [items, setItems] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(`${API_BASE_URL}/api/marketItems`);
      const data = await response.json();
      setItems(data);
      console.log("Fetched items:", data);
    }

    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
      console.log("Fetched fighters:", data);
    }

    fetchItems();
    fetchFighters();
  }, []);

  return (
    <ul className={styles.marketItems}>
      {items.length > 0 && fighters.length > 0 ? (
        items.map(({ owner, image, price, title, timeLeft }, index) => (
          <li className={styles.itemContainer} key={index}>
            <a className={styles.itemLink} href="#items">
              <div
                className={styles.itemImage}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className={styles.itemInfoContainer}>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemInfoHeader}>Current Bid</h3>
                    <div className={styles.itemInfoPrice}>{price} ETH</div>
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemInfoHeader}>Ending in</h3>
                    <Countdown
                      date={Date.now() + timeLeft}
                      renderer={({ hours, minutes, seconds }) => (
                        <div className={styles.itemInfoTime}>{`${hours}h: ${minutes}m: ${seconds}s`}</div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <h3 className={styles.itemTitle}>{title}</h3>
              <div className={styles.ownerContainer}>
                <img
                  src={fighters[owner].image}
                  className={styles.ownerImage}
                  alt="item-owner"
                />
                <span className={styles.ownerName}>
                  {fighters[owner].handler}
                </span>
              </div>
              <div className={styles.buttonsContainer}>
                <div className={styles.buttonContainer}>
                  <button className={styles.button}>Place a bid</button>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.button}>
                    <div className={styles.buttonInner}>View artwork</div>
              </button>
              </div>
              </div>
            </a>
          </li>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </ul>
  );
}

export default MarketItems;
