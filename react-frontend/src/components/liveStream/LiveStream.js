import React from 'react';
import styles from './LiveStream.module.css';

const LiveStream = () => {
  return (
    <div className={styles.streamContainer}>
      <iframe
        title="Twitch Stream"
        src="https://player.twitch.tv/?channel=your_channel_name&parent=your_website_domain"
        allowFullScreen="true"
        scrolling="no"
        className={styles.streamFrame}
      ></iframe>
    </div>
  );
};

export default LiveStream;
