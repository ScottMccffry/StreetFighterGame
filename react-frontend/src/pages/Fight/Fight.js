import React from 'react';
import BetsHistory from '../../components/betsHistory/BetsHistory';
import LiveStream from '../../components/liveStream/LiveStream';
import TwitchChat from '../../components/twitchChat/TwitchChat';
import LiveData from '../../components/liveData/LiveData';
import styles from './Fight.module.css'

const Fight = () => {
  return (
    <div className={styles.fightLayout}>
      <div className={styles.sideSpace} />
      <div className={styles.contentArea}>
        <div className={styles.contentRow}>
          <div className="content-cell livestream-cell">
            <LiveStream />
          </div>
          <div className="content-cell livedata-cell">
            <LiveData />
          </div>
        </div>
        <div className={styles.betsHistoryContainer}>
          <BetsHistory />
        </div>
      </div>
      <TwitchChat />
    </div>
  );
};

export default Fight;

