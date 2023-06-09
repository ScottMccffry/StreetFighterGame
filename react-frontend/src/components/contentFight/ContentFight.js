import React, { useState, useContext } from 'react';
import axios from 'axios';
import WalletContext from '../../context/WalletContext';
import FightModal from '../fightModal/FightModal';
import styles from './ContentFight.module.css';

function ContentFight() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isConnected } = useContext(WalletContext);

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.contentFight}>
      <h1 className={styles.contentTitle}>Live Matches</h1>
      <h2 className={styles.contentSubtitle}>See all the live and programmed fights</h2>
      <div className={styles.contentPromo}>
        <div
          className={styles.promoBanner}
          style={{
            backgroundImage:
              'url(https://assets.codepen.io/3685267/nft-dashboard-art-6.jpg)',
          }}
        >
          <h2 className={styles.promoTitle}>Promotion</h2>
          <button className={styles.promoButton}>Profit from the discount</button>
        </div>
      </div>

      <div className={styles.contentTrending}>
        <h2 className={styles.trendingTitle}>Trending upcoming fights</h2>
        <button
          className={styles.trendingButton}
          onClick={handleButtonClick}
        >
          Start a fight
        </button>
      </div>

      {isModalVisible && (
        <FightModal isConnected={isConnected} closeModal={closeModal} />
      )}
    </div>
  );
}

export default ContentFight;
