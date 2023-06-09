import React from 'react';
import SideBarRight from '../../components/sideBarRight/SideBarRight';
import Content from '../../components/content/Content';
import MarketItems from '../../components/marketItems/MarketItems';
import styles from './Marketplace.module.css'


const Marketplace = () => {
  return (
    <div className={styles.customFlex}>
      <div className={styles.sidebarSpace} />
      <div className={styles.contentGrow}>
        <Content />
        <MarketItems />
      </div>
      <SideBarRight />
    </div>
  );  
};

export default Marketplace;