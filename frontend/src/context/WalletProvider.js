import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletContext from './WalletContext';

const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUserId, setConnectedUserId] = useState('');

  useEffect(() => {
    async function checkConnection() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          provider = new ethers.BrowserProvider(window.ethereum)
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          if (account) {
            setIsConnected(true);
            setConnectedUserId(account);
          }
        } catch (error) {
          console.error("An error occurred while fetching the account: ", error);
        }
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
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.BrowserProvider(window.ethereum)
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setIsConnected(true);
        setConnectedUserId(account);
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
