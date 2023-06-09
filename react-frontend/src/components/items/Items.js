import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'https://cdn.skypack.dev/react-countdown';
import styles from './Items.module.css'

function Items({ onBetClick }) {
  const [fights, setFights] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    axios.get('/api/fights')
      .then((response) => {
        setFights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fights:', error);
      });

    axios.get('/api/fighters')
      .then((response) => {
        setFighters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fighters:', error);
      });
  }, []);

  const handleBetClick = (bet) => {
    if (onBetClick) {
      onBetClick(bet);
    }
  };

  return (
    <ul className={styles.itemsContainer}>
    {fights.map(({ id, fighter1, fighter2, odd1, odd2, image, title, time_left }) => (
      <li className={styles.itemCard} key={id}>
        <a className={styles.itemLink} href="#items">
          <div className={styles.imageContainer} style={{ backgroundImage: `url(${image})` }}>
            <div className={styles.countdownContainer}>
              <Countdown
                  date={Date.now() + time_left}
                  renderer={({ hours, minutes, seconds, completed }) => (
                    <div className="">
                      {completed ? (
                        <div className="text-red-500 font-semibold">LIVE</div>
                      ) : (
                        <>
                          <h3 className={styles.fontSemibold}>Starting in</h3>
                          <div>{`${hours}h: ${minutes}m: ${seconds}s`}</div>
                        </>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className={styles.fighterInfo}>
              <div className="fighter fighter1">
                <img src={fighter1.image} className={styles.fighterImg} alt="fighter1" />
                <h3 className={styles.fighterName}>{fighter1.name}</h3>
                <span className={styles.fighterGroup}>{fighter1.group}</span>
                <button onClick={() => handleBetClick({ fighter: fighter1, odd: odd1 })} className={styles.betButton}>
                  {odd1}
                </button>
              </div>

              <div className={styles.vsContainer}>
                <h3 className={styles.vs}>VS</h3>
              </div>

              <div className="fighter fighter2">
                <img src={fighter2.image} className={styles.fighterImg} alt="fighter2" />
                <h3 className={styles.fighterName}>{fighter2.name}</h3>
                <span className={styles.fighterGroup}>{fighter2.group}</span>
                <button onClick={() => handleBetClick({ fighter: fighter2, odd: odd2 })} className={styles.betButton}>
                  {odd2}
                </button>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
                  );
                  }
                  
                  export default Items;