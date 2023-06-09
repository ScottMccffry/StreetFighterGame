import React from 'react';
import CharacterGenerator from '../../components/characterGenerator/CharacterGenerator.js';
import styles from './MintingPage.module.css'

const MintingPage = () => {
  return (
    <div className={styles.customFlex}>
      <div className={styles.sidebarSpace} />
      <div className={styles.contentGrow}>
        <CharacterGenerator />
      </div>
    </div>
  );
  
};

export default MintingPage;
