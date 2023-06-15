import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'https://cdn.skypack.dev/react-countdown';

function Items({ onBetClick }) {
  const [fights, setFights] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    axios.get('/api/fights')
      .then((response) => {
        setFights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fights:', error);
      });

    axios.get('/api/fighters')
      .then((response) => {
        setFighters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fighters:', error);
      });
  }, []);

  const handleBetClick = (bet) => {
    if (onBetClick) {
      onBetClick(bet);
    }
  };

  return (
    <ul className="p-1.5 flex flex-wrap">
      {fights.map(({ id, fighter1, fighter2, odd1, odd2, image, title, time_left }) => (
        <li className="w-full lg:w-1/2 xl:w-1/3 p-1.5" key={id}>
          <a
            className="block bg-zinc-800 rounded-md w-full overflow-hidden pb-4 shadow-lg transform transition-all duration-200 hover:scale-105"
            href="#items"
          >
            <div
              className="w-full h-40 bg-center bg-cover relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-5/6 bg-white rounded-md flex items-center bg-opacity-30 backdrop-blur-md justify-center py-2">
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
            </div>

            <div className="w-full grid grid-cols-3 items-center justify-center pl-4 pr-4 pt-2">
              <div className="flex flex-col items-center">
                <img
                  src={fighter1.image}
                  className="w-10 h-10 rounded-full mb-2"
                  alt="fighter1"
                />
                <h3 className="font-semibold text-m">{fighter1.name}</h3>
                <span className="text-zinc-400 text-sm mb-2">{fighter1.group}</span>
                <button
                  onClick={() => handleBetClick({ fighter: fighter1, odd: odd1 })}
                  className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-full rounded-md font-semibold h-12 p-px mt-2"
                >
                  {odd1}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-sm">VS</h3>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={fighter2.image}
                  className="w-10 h-10 rounded-full mb-2"
                  alt="fighter2"
                  />
                  <h3 className="font-semibold text-m">{fighter2.name}</h3>
                  <span className="text-zinc-400 text-sm mb-2">{fighter2.group}</span>
                  <button
                  onClick={() => handleBetClick({ fighter: fighter2, odd: odd2 })}
                  className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-full rounded-md font-semibold h-12 p-px mt-2"
                  >
                  {odd2}
                  </button>
                  </div>
                  </div>
                  </a>
                  </li>
                  ))}
                  </ul>
                  );
                  }
                  
                  export default Items;