import React, { useState } from 'react';
import SideBarRight from '../../components/sideBarRight/SideBarRight';
import SideBarRightBet from '../../components/sideBarRightBet/SideBarRightBet';
import ContentFight from '../../components/contentFight/ContentFight';
import Items from '../../components/items/Items';
import WalletProvider from '../../context/WalletProvider';
import styles from './LiveFeed.module.css';

const LiveFeed = () => {
  const [showBetSidebar, setShowBetSidebar] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const handleBetClick = (bet) => {
    setSelectedBet(bet);
    setShowBetSidebar(true);
  };
  return (
    <div className={styles.liveFeedLayout}>
      <div className={styles.sideSpace} />
      <div className={styles.contentGrow}>
        <ContentFight />
        <Items onBetClick={handleBetClick} />
      </div>
      {showBetSidebar ? <SideBarRightBet /> : <SideBarRight />}
    </div>
  );
};

export default LiveFeed;
