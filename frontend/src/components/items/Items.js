import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'https://cdn.skypack.dev/react-countdown';

const API_BASE_URL = 'http://127.0.0.1:5000';

function Items({ onBetClick }) {
  const [fights, setFights] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    async function fetchFights() {
      const response = await fetch(`${API_BASE_URL}/api/fights`);
      const data = await response.json();
      setFights(data);
      console.log("Fetched items:", data);
    }

    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
      console.log("Fetched fighters:", data);
    }

    fetchFights();
    fetchFighters();
  }, []);

 
  const handleBetClick = (bet) => {
    if (onBetClick) {
      onBetClick(bet);
    }
  };

  return (
    <div className="p-1.5 flex flex-wrap">
  {fights.map(({ id, fighter1, fighter2, odd1, odd2, time_left }) => (
    <div className="w-full lg:w-1/2 xl:w-1/3 p-1.5 h-80" key={id}>
          <a
            className="block bg-zinc-800 rounded-md w-full h-full overflow-hidden pb-4 shadow-lg transform transition-all duration-200 hover:scale-105 relative"
            href="#items"
          >
            <div className="flex md:flex-row mt-2">
              <div
                className="w-full h-40 bg-center bg-cover relative  md:w-1/2 ml-2 rounded-sm"
                style={{ backgroundImage: `url(${fighter1.image})` }}>
                  </div>
                  
              <div
                className="w-full h-40 bg-center bg-cover relative  md:w-1/2 mr-2 rounded-sm"
                style={{ backgroundImage: `url(${fighter2.image})` }}
                >
              </div>

              </div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 bg-white rounded-md flex items-center bg-opacity-30 backdrop-blur-md justify-center py-2">
          <Countdown
            date={Date.now() + time_left}
            renderer={({ hours, minutes, seconds, completed }) => (
              <div className="">
                {completed ? (
                  <div className="text-red-500 font-semibold">LIVE</div>
                ) : (
                  <>
                    <h3 className="font-semibold">Starting in</h3>
                    <div>{`${hours}h: ${minutes}m: ${seconds}s`}</div>
                  </>
                )}
              </div>
            )}
          />
        </div>

        <div className="w-full flex justify-around items-end pb-4 h-1/2">
  <div className="w-2/5 text-center ml-2">
    <div className="flex flex-col items-center">
      <h3 className="font-semibold text-m">{fighter1.name}</h3>
      <span className="text-zinc-400 text-sm mb-2">{fighter1.collection}</span>
      <button
        onClick={() => handleBetClick({ fighter: fighter1, odd: odd1 })}
        className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-4/5 rounded-md font-semibold h-12 p-px mt-2"
      >
        {odd1}
      </button>
    </div>
  </div>

  <div className="w-1/5 flex flex-col items-center h-1/2">
    <h3 className="font-semibold text-sm">VS</h3>
  </div>

  <div className="w-2/5 text-center mr-2">
    <div className="flex flex-col items-center">
      <h3 className="font-semibold text-m">{fighter2.name}</h3>
      <span className="text-zinc-400 text-sm mb-2">{fighter2.collection}</span>
      <button
        onClick={() => handleBetClick({ fighter: fighter2, odd: odd2 })}
        className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-4/5 rounded-md font-semibold h-12 p-px mt-2 mr-1"
      >
          <div className="bg-zinc-800 w-full h-full rounded-md grid place-items-center">
          {odd2}
                    </div>
        
      </button>
    </div>
  </div>
</div>
</a>
</div>
))}
</div>
);
}

export default Items;