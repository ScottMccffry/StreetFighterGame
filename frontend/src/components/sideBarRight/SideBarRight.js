import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:5000';

function SideBarRight({ showBetSidebar, selectedBet }) {
  const [fighters, setFighters] = useState([]);
  useEffect(() => {
    async function fetchFighters() {
      const response = await fetch(`${API_BASE_URL}/api/fighters`);
      const data = await response.json();
      setFighters(data);
    }

    fetchFighters();
  }, []);


return (
  <div className="p-3 md:w-72 shrink-0 md:sticky md:top-16 shrink-0 h-full">
    <h2 className="text-xl font-semibold">Ranking</h2>
    <ul className="mt-3 space-y-3">
    {fighters.length > 0 && fighters
  .sort((a, b) => a.rank - b.rank)
  .map(({ name, handler, image, rank }) => (
    <li className="bg-zinc-800 rounded-md p-2 flex shadow-lg" key={handler}>
      <h1 className="font-semibold text-lg">#{rank} </h1>
      <img
        src={image}
        className="w-12 h-12 rounded-md"
        alt={`top artist ${name}`}
      />
      <div className="ml-3">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-zinc-400">{handler}</p>
      </div>
    </li>
  ))}
    </ul>
    <div className="w-full rounded-md bg-gradient-to-tr from-fuchsia-600 to-violet-600 mt-3 p-3 relative overflow-hidden">
      <div className="z-10 relative">
        <h2 className="text-white font-semibold">
          Buy a collection with ethereum
        </h2>
        <p className="text-white/50 text-sm mt-1 ">
          you can buy a collection of artwork with ethereum very easy and
          simple
        </p>
        <button className="bg-white w-full rounded-md h-12 text-gray-900 font-semibold mt-2">
          Get Started
        </button>
      </div>
      </div>
  </div>
  
);
}

export default SideBarRight;