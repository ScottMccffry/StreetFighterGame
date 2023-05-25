import React from 'react';
import SideBarRight from '../../components/sideBarRight/SideBarRight';
import Content from '../../components/content/Content';
import MarketItems from '../../components/marketItems/MarketItems';


const Marketplace = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-48 hidden lg:block shrink-0" />
      <div className="grow">
        <Content />
        <MarketItems />
      </div>
      <SideBarRight />
    </div>
  );
};

export default Marketplace;