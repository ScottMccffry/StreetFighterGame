import React, { useState, useContext } from 'react';
import axios from 'axios';
import WalletContext from '../../context/WalletContext';
import FightModal from '../fightModal/FightModal';


function ContentFight() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isConnected } = useContext(WalletContext);

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold px-3 mt-3">Live Matches</h1>
      <h2 className="text-zinc-500 px-3">
       See all the live and programmed fights
      </h2>
      <div className="p-3">
        <div
          className="w-full h-44  rounded-md bg-center bg-cover flex flex-col justify-center px-4"
          style={{
            backgroundImage:
              'url(https://assets.codepen.io/3685267/nft-dashboard-art-6.jpg)',
          }}
        >
          <h2 className="font-bold text-3xl max-w-sm">
            Promotion
          </h2>
          <button className="py-2 bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-md w-44 mt-3">
            Profit from the discount
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between px-3 mt-3">
        <h2 className="text-xl font-semibold">Trending upcoming fights</h2>
        <button
          className="text-fuchsia-600 underline font-bold"
          onClick={handleButtonClick}
        >
          Start a fight
        </button>
        </div>

{isModalVisible && (
  <FightModal isConnected={isConnected} closeModal={closeModal} />
)}
</div>

  );
}

export default ContentFight;