import React, { useState, useEffect, useContext } from 'react';
import WalletContext from '../../context/WalletContext';
import axios from 'axios';

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
      onClick={closeModal}
    >
      <div
        className="bg-zinc-900 p-6 rounded-md w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Start a Fight</h2>
        <label htmlFor="nft-select" className="block mb-2">
          Choose your NFT
        </label>
        <select
          name="nft"
          id="nft-select"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={handleNftChange}
        >
          <option value="">Select an NFT</option>
          {nftCollections.map((nftCollection) => (
            <optgroup key={nftCollection.id} label={nftCollection.name}>
              {nftCollection.nfts.map((nft) => (
                <option
                  key={nft.tokenId}
                  value={nft.tokenId}
                >{`${nftCollection.name} #${nft.tokenId}`}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          className="mt-4 py-2 bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-md w-full"
          onClick={handleResearchOpponent}
          disabled={!isConnected}
        >
          Research an Opponent
        </button>
      </div>
    </div>
  );
};

export default FightModal;