// LiveFeed.js

import React, { useState } from 'react';
import SideBarRight from '../../components/sideBarRight/SideBarRight';
import SideBarRightBet from '../../components/sideBarRightBet/SideBarRightBet';
import ContentFight from '../../components/contentFight/ContentFight';
import Items from '../../components/items/Items';

const LiveFeed = () => {
  const [showBetSidebar, setShowBetSidebar] = useState(false);
  const [selectedFight, setSelectedFight] = useState(null);

  const handleBetClick = (fight) => {
    setSelectedFight(fight);
    setShowBetSidebar(true);
  };

  const closeBetSidebar = () => {
    setShowBetSidebar(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-48 hidden lg:block shrink-0" />
      <div className="grow ">
        <ContentFight />
        <Items onBetClick={handleBetClick} />
      </div>
      {showBetSidebar ? <SideBarRightBet fight={selectedFight} closeBetSidebar={closeBetSidebar} /> : <SideBarRight />}
    </div>
  );
};

export default LiveFeed;