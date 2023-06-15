import React, { useState } from 'react';
import SideBarRight from '../../components/sideBarRight/SideBarRight';
import SideBarRightBet from '../../components/sideBarRightBet/SideBarRightBet';
import ContentFight from '../../components/contentFight/ContentFight';
import Items from '../../components/items/Items';
import WalletProvider from '../../context/WalletProvider';


const LiveFeed = () => {
  const [showBetSidebar, setShowBetSidebar] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const handleBetClick = (bet) => {
    setSelectedBet(bet);
    setShowBetSidebar(true);
  };
  return <div className="flex flex-col md:flex-row">
  <div className="w-48 hidden lg:block shrink-0" />
  <div className=" grow ">

    <ContentFight />

    <Items onBetClick={handleBetClick} />
    </div>
    {showBetSidebar ? <SideBarRightBet /> : <SideBarRight />}
    
  
</div>;
};

export default LiveFeed;