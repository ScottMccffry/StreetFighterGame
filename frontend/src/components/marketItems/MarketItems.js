import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const API_BASE_URL = 'http://127.0.0.1:5000';

function MarketItems() {
  const [items, setItems] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(`${API_BASE_URL}/api/marketItems`);
      const data = await response.json();
      setItems(data);
      console.log("Fetched items:", data);
    }

    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
      console.log("Fetched fighters:", data);
    }

    fetchItems();
    fetchFighters();
  }, []);

  return (
    <ul className="p-1.5 flex flex-wrap">
      {items.length > 0 && fighters.length > 0 ? (
        items.map(({ owner, image, price, title, timeLeft }, index) => (
          <li className="w-full lg:w-1/2 xl:w-1/3 p-1.5" key={index}>
            <a
              className="block bg-zinc-800 rounded-md w-full overflow-hidden pb-4 shadow-lg"
              href="#items"
            >
              <div
                className="w-full h-40 bg-center bg-cover relative"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-5/6 bg-white rounded-md flex items-center bg-opacity-30 backdrop-blur-md">
                  <div className="w-1/2 p-3">
                    <h3 className="font-semibold">Current Bid</h3>
                    <div className="">{price} ETH</div>
                  </div>
                  <div className="w-1/2 p-3">
                    <h3 className="font-semibold">Ending in</h3>
                    <Countdown
                      date={Date.now() + timeLeft}
                      renderer={({ hours, minutes, seconds }) => (
                        <div className="">{`${hours}h: ${minutes}m: ${seconds}s`}</div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg px-3 mt-2">{title}</h3>
              <div className="flex items-center px-3 mt-2">
                <img
                  src={fighters[owner].image}
                  className="w-10 h-10 rounded-full"
                  alt="item-owner"
                />
                <span className="ml-2 text-zinc-400">
                  {fighters[owner].handler}
                </span>
              </div>
              <div className="flex mt-2">
                <div className="p-3 w-1/2">
                  <button className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-full h-12 rounded-md font-semibold">
                    Place a bid
                  </button>
                </div>
                <div className="p-3 w-1/2">
                  <button className="bg-gradient-to-tr from-fuchsia-600 to-violet-600 w-full rounded-md font-semibold h-12 p-px">
                    <div className="bg-zinc-800 w-full h-full rounded-md grid place-items-center">
                      View artwork
                    </div>
              </button>
              </div>
              </div>
            </a>
          </li>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </ul>
  );
}

export default MarketItems;