import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BetsHistory = () => {
  const [betsHistory, setBetsHistory] = useState([]);

  useEffect(() => {
    const fetchBetsHistory = async () => {
      try {
        const response = await axios.get('/api/betshistory');
        setBetsHistory(response.data);
      } catch (error) {
        console.error('Error fetching bets history:', error);
      }
    };

    fetchBetsHistory();
  }, []);

  return (
    <div className="bg-[#160016] border border-gray-300 rounded-xl">
      <div className="flex justify-between items-center p-4">
        <ul className="flex items-center space-x-4">
          <li>
            <a className="text-indigo-600 font-semibold">All matches</a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-indigo-600">Live Play</a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-indigo-600">Completed</a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-indigo-600">Scheduled</a>
          </li>
        </ul>
        <a className="text-gray-500 p-1">
          <span className="sr-only">Agenda</span>
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
          </svg>
        </a>
      </div>
      <div className="p-4">
        <table className="w-full text-center">
          <thead className="bg-[#160016] border border-gray-300 rounded-xl text-gray-300">
            <tr>
              <th className="py-2 pl-8 text-left whitespace-nowrap">Date</th>
              <th className="py-2">Match</th>
              <th className="py-2">Odds</th>
              <th className="py-2">Bet</th>
              <th className="py-2">Stats</th>
              <th className="py-2 pr-8">
                <span className="sr-only">Stats</span>
              </th>
            </tr>
          </thead>

          <tbody>
          {betsHistory.map((bet, index) => (
            <tr key={index} className="border-b border-gray-300 text-white">
              <td className="py-4 pl-8 text-left whitespace-nowrap">
                <span className="text-gray-600 mr-2">8:00</span><span className="bg-red-200 text-red-600 inline-flex items-center rounded-md px-2 py-1 ml-2 mr-2"><svg width="6" height="6" viewBox="0 0 8 8"><circle fill="currentColor" cx="4" cy="4" r="4"/></svg>Live</span>
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <span>Real Valladolid</span><img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/HlIrXZRP96tv0H1uiiN0Jg_48x48.png" className="w-8" />
                  </div>
                  <p className="font-black">
                    <span className="mr-1">3</span><span className="text-gray-500">:</span>
                    <span className="ml-1">1</span>
                </p>
                <div className="flex items-center space-x-2">
                  <img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/uoxp9_c1LHfPFpOW_CKdJw_48x48.png" className="w-8" /><span>Atlético Madrid</span>
                </div>
              </div>
            </td>
            <td>
            <div className="py-4 bg-gray-500 border border-gray-300 inline-flex items-center rounded-md px-2 py-1 mt-1 mb-1 mr-2">1.50</div>
            <div  className="py-4 bg-gray-500 border border-gray-300 inline-flex items-center rounded-md px-2 py-1 mt-1 mb-1 mr-2">3.60</div>
            <div className="py-4 bg-gray-500 border border-gray-300 inline-flex items-center rounded-md px-2 py-1 mt-1 mb-1 mr-2">6.00</div>
            </td>
            <td className="py-4 bg-gray-500 border border-gray-300 inline-flex items-center rounded-md px-2 py-1 mt-1 mr-2">possible winings </td>
            <td className="py-4 pr-8">
              <a href="#" className="text-indigo-600">More stats</a>
            </td>
          </tr>
           ))}
        </tbody>
      </table>
    </div>
  </div>
);
  }
export default BetsHistory;