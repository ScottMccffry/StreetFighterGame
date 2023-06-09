import React from 'react';
import styles from './LiveData.module.css';

const LiveData = () => {
  return (
    <div className={styles.liveDataContainer}>
      <div className={styles.liveDataCard}>
        <div className={styles.liveDataHeader}>
          <div className={styles.liveIndicator}>
            <div className={styles.liveIndicatorDot}></div>
            Live
          </div>
          <div className={styles.liveDataLeague}>
            English Premier League
          </div>
        </div>
        <div className={styles.teamsContainer}>
          <div className={styles.team}>
            <div className={styles.teamLogoContainer}>
              <img className={styles.teamLogo} src="https://assets.codepen.io/285131/whufc.svg" alt="team-logo" />
            </div>
            <h2 className={styles.teamName}>West Ham</h2>
          </div>
          <div className={styles.matchInfo}>
            <div className={styles.matchTime}>
              12 Aug at <strong>19:00</strong>
            </div>
            <div className={styles.matchScore}>
              <span className={styles.homeTeamScore}>2</span>
              <span className={styles.scoreSeparator}>:</span>
              <span className={styles.awayTeamScore}>0</span>
            </div>
            <div className={styles.odds}>
              <button className={styles.oddButton}>1.48</button>
              <button className={styles.oddButton}>8.24</button>
            </div>
            <button className={styles.placeBetButton}>Place a bet</button>
          </div>
          <div className={styles.team}>
            <div className={styles.teamLogoContainer}>
              <img className={styles.teamLogo} src="https://assets.codepen.io/285131/chelsea.svg" alt="team-logo" />
            </div>
            <h2 className={styles.teamName}>Chelsea</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
