import React from 'react';

const LiveData = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-[#160016] border border-gray-300 flex flex-col min-w-[200px] rounded-lg shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="bg-red-100 text-red-600 flex items-center px-3 py-2 rounded text-sm font-semibold">
            <div className="bg-red-600 w-1.5 h-1.5 rounded-full mr-2"></div>
            Live
          </div>
          <div className="flex items-center font-semibold">
            English Premier League
          </div>
        </div>
        <div className="flex relative">
          <div className="flex items-center justify-center w-1/3 p-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                <img className="w-12" src="https://assets.codepen.io/285131/whufc.svg" />
              </div>
              <h2 className="mt-6 text-m font-semibold">West Ham</h2>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/3 p-8">
            <div className="text-sm text-gray-500">
              12 Aug at <strong className="text-gray-900">19:00</strong>
            </div>
            <div className="flex items-center mt-3">
              <span className="text-4xl font-semibold text-indigo-600">2</span>
              <span className="text-2xl font-extrabold text-gray-300 mx-2">:</span>
              <span className="text-4xl font-semibold">0</span>
            </div>
            <div className="flex mt-2">
              <button className="text-sm font-semibold text-gray-500 border border-gray-300 bg-gray-100 px-2 py-1 mx-1">
                1.48
              </button>
              <button className="text-sm font-semibold text-gray-500 border border-gray-300 bg-gray-100 px-2 py-1 mx-1">
                8.24
              </button>
            </div>
            <button className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white py-2 px-12 rounded shadow-md text-sm">
              Place a bet
            </button>
          </div>
          <div className="flex items-center justify-center w-1/3 p-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                <img className="w-12" src="https://assets.codepen.io/285131/chelsea.svg" />
              </div>
              <h2 className="mt-6 text-m font-semibold">Chelsea</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;