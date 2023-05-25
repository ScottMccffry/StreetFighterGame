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
    <div className="matches-container">
    <div className="matches-header">
      <ul className="matches-nav-list">
        <li>
          <a className="nav-link">All matches</a>
        </li>
        <li>
          <a className="nav-link-default">Live Play</a>
        </li>
        <li>
          <a className="nav-link-default">Completed</a>
        </li>
        <li>
          <a className="nav-link-default">Scheduled</a>
        </li>
      </ul>
      <a className="agenda-link">
        <span className="sr-only">Agenda</span>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
        </svg>
      </a>
    </div>
    <div className="matches-table-container">
      <table className="matches-table">
        <thead className="table-header">
          <tr>
            <th className="table-cell-default">Date</th>
            <th className="table-cell-default">Match</th>
            <th className="table-cell-default">Odds</th>
            <th className="table-cell-default">Bet</th>
            <th className="table-cell-default">Stats</th>
            <th className="table-cell-default">
              <span className="sr-only">Stats</span>
            </th>
          </tr>
        </thead>

        <tbody>
        {betsHistory.map((bet, index) => (
          <tr key={index} className="table-row">
            <td className="time-container">
              <span className="text-gray-600 mr-2">8:00</span><span className="live-indicator"><svg width="6" height="6" viewBox="0 0 8 8"><circle fill="currentColor" cx="4" cy="4" r="4"/></svg>Live</span>
            </td>
            <td>
              <div className="team-display">
                <div className="team-name">
                  <span>Real Valladolid</span><img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/HlIrXZRP96tv0H1uiiN0Jg_48x48.png" className="team-logo" />
                </div>
                <p className="score-display">
                  <span className="mr-1">3</span><span className="text-gray-500">:</span>
                  <span className="ml-1">1</span>
                </p>
                <div className="team-name">
                  <img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/uoxp9_c1LHfPFpOW_CKdJw_48x48.png" className="team-logo" /><span>Atlético Madrid</span>
                </div>
              </div>
            </td>
            <td>
              <div className="odds-indicator">1.50</div>
              <div className="odds-indicator">3.60</div>
              <div className="odds-indicator">6.00</div>
            </td>
            <td className="possible-winnings-indicator">possible winnings </td>
            <td className="stats-link-container">
              <a href="#" className="stats-link">More stats</a>
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