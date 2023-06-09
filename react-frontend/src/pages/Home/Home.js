import React from 'react';
import HomepageCenter from '../../components/homepageCenter/HomepageCenter';
import styles from "./Home.module.css"

const Home = () => {
  return  (<div className={styles.mainLayout}>
  <div className={styles.sidePadding} />
  <div className={styles.mainContent}>
    <HomepageCenter />
  </div>
</div>);
};

export default Home;