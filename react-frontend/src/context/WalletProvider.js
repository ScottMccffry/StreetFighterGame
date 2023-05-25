import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletContext from './WalletContext';

const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUserId, setConnectedUserId] = useState('');

  useEffect(() => {
    async function checkConnection() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setIsConnected(true);
        setConnectedUserId(accounts[0]);
      }
    }

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setConnectedUserId(accounts[0]);
        } else {
          setIsConnected(false);
          setConnectedUserId('');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
      try {
        new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setIsConnected(true);
        setConnectedUserId(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  };

  return (
    <WalletContext.Provider value={{ isConnected, connectedUserId, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
