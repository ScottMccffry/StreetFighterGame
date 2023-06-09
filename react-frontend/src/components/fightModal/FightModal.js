import React, { useState, useEffect, useContext } from 'react';
import WalletContext from '../../context/WalletContext';
import axios from 'axios';
import styles from './FightModal.module.css'

const FightModal = ({ isConnected, closeModal }) => {
  const { connectedUserId } = useContext(WalletContext);
  const [nftCollections, setNftCollections] = useState([]);
  const [selectedNft, setSelectedNft] = useState('');

  useEffect(() => {
    const fetchNftCollections = async () => {
      try {
        const response = await axios.get('/api/nft-collections');
        setNftCollections(response.data);
      } catch (error) {
        console.error('Error fetching NFT collections:', error);
      }
    };

    fetchNftCollections();
  }, []);

  const handleNftChange = (e) => {
    setSelectedNft(e.target.value);
  };

  const handleResearchOpponent = async () => {
    if (!isConnected) {
      alert('You need to connect your wallet before requesting a fight');
      return;
    }

    try {
      await axios.post('/api/request_fight', {
        player_id: connectedUserId,
        nft_id: selectedNft,
      });
    } catch (error) {
      console.error('Error while requesting a fight:', error);
    }
  };

  return (
    <div className={styles.fightModal} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Start a Fight</h2>
        <label htmlFor="nft-select" className={styles.modalLabel}>Choose your NFT</label>
        <select id="nft-select" className={styles.modalSelect} onChange={handleNftChange}>
          <option value="">Select an NFT</option>
          {nftCollections.map((nftCollection) => (
            <optgroup key={nftCollection.id} label={nftCollection.name}>
              {nftCollection.nfts.map((nft) => (
                <option key={nft.tokenId} value={nft.tokenId}>{`${nftCollection.name} #${nft.tokenId}`}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button className={styles.modalButton} onClick={handleResearchOpponent} disabled={!isConnected}>
          Research an Opponent
        </button>
      </div>
    </div>
  );
};

export default FightModal;