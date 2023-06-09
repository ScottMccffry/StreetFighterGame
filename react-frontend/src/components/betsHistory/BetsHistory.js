import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BetsHistory.module.css'


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
    <div className={styles.matchesContainer}>
    <div className={styles.matchesHeader}>
      <ul className={styles.matchesNavList}>
        <li>
          <a className={styles.navLink}>All matches</a>
        </li>
        <li>
          <a className={styles.navLinkDefault}>Live Play</a>
        </li>
        <li>
          <a className={styles.navLinkDefault}>Completed</a>
        </li>
        <li>
          <a className={styles.navLinkDefault}>Scheduled</a>
        </li>
      </ul>
      <a className={styles.agendaLink}>
        <span className={styles.srOnly}>Agenda</span>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
        </svg>
      </a>
    </div>
    <div className={styles.matchesTableContainer}>
      <table className={styles.matchesTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableCellDefault}>Date</th>
            <th className={styles.tableCellDefault}>Match</th>
            <th className={styles.tableCellDefault}>Odds</th>
            <th className={styles.tableCellDefault}>Bet</th>
            <th className={styles.tableCellDefault}>Stats</th>
            <th className={styles.tableCellDefault}>
              <span className={styles.srOnly}>Stats</span>
            </th>
          </tr>
        </thead>

        <tbody>
        {betsHistory.map((bet, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.timeContainer}>
              <span className="text-gray-600 mr-2">8:00</span><span className={styles.liveIndicator}><svg width="6" height="6" viewBox="0 0 8 8"><circle fill="currentColor" cx="4" cy="4" r="4"/></svg>Live</span>
            </td>
            <td>
              <div className={styles.teamDisplay}>
                <div className={styles.teamName}>
                  <span>Real Valladolid</span><img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/HlIrXZRP96tv0H1uiiN0Jg_48x48.png" className={styles.teamLogo} />
                </div>
                <p className={styles.scoreDisplay}>
                  <span className="mr-1">3</span><span className="text-gray-500">:</span>
                  <span className="ml-1">1</span>
                </p>
                <div className={styles.teamName}>
                  <img alt="" src="https://ssl.gstatic.com/onebox/media/sports/logos/uoxp9_c1LHfPFpOW_CKdJw_48x48.png" className={styles.teamLogo} /><span>Atlético Madrid</span>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.oddsIndicator}>1.50</div>
              <div className={styles.oddsIndicator}>3.60</div>
              <div className={styles.oddsIndicator}>6.00</div>
            </td>
            <td className={styles.possibleWinningsIndicator}>possible winnings </td>
            <td className={styles.statsLinkContainer}>
              <a href="#" className={styles.statsLink}>More stats</a>
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