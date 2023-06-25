import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Countdown from 'https://cdn.skypack.dev/react-countdown';

const API_BASE_URL = 'http://127.0.0.1:5000';

function ItemsProfile() {
  const [fights, setFights] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
      console.log("Fetched fighters:", data);
    }

    fetchFighters();
  }, []);

  return (
    <div className="p-6 flex flex-wrap justify-center h-90 border-">
      {fighters.map(({ id, name, collection, image, rank, nft_address, game_characteristics, handler }) => (
        <div key={id} className="border-2 border-zinc-600 m-4 overflow-hidden rounded-lg shadow-lg relative transition-transform transform hover:-translate-y-2 h-96" style={{ width: 300 }}>
          <img alt="fighter" className="w-full" src={image} />
          <div className="absolute bottom-[-30%] left-0 right-0 bg-black bg-opacity-0 hover:-translate-y-[50%] hover:bg-opacity-50  transition-all duration-2500">
          <div className="px-6 py-4">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl mb-2 text-white">{name}</span>
                <img src="https://i.imgur.com/7D7I6dI.png" className="w-10 h-10 rounded-full" alt="" />
              </div>
              <p className="text-grey-darker text-base">
                      {/*{game_characteristics.map((characteristic, index) => (
                  <span key={index} className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{characteristic}</span>
                ))}*/}
                <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{game_characteristics}</span>
                
                
              </p>
              <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{collection}</span>
          </div>
            </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default ItemsProfile;


   
       

