import React, { useState, useEffect } from 'react';
import MFT from '../../artifacts/contracts/MetaFight.sol/MetaFight.json'
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import "./CharacterGenerator.module.css"


const CharacterGenerator = () => {

  //type of characteristics
  const [error, setError] = useState(null);
  const [nftName, setNftName] = useState('');
  const [fighter, setFighter] = useState('');
  const [weapon, setWeapon] = useState('');
  const [color, setColor] = useState('');
  useEffect(() => {
    updatePrice();
  }, [fighter, weapon, color]);
  const MFTaddress ='0x5FbDB2315678afecb367f032d93F642f64180aa3' 

  //json format for database characteristics
  const [characteristics, setCharacteristics] = useState({});



  const [price, setPrice] = useState(0);
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
  });

  const handleFighterChange = (event) => {
    setFighter(event.target.value);
    setCharacteristics((prevCharacteristics) => ({
      ...prevCharacteristics,
      fighter: event.target.value,
    }));
    updatePrice();
  };
  
  const handleWeaponChange = (event) => {
    setWeapon(event.target.value);
    setCharacteristics((prevCharacteristics) => ({
      ...prevCharacteristics,
      weapon: event.target.value,
    }));
    updatePrice();
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setCharacteristics((prevCharacteristics) => ({
      ...prevCharacteristics,
      color: event.target.value,
    }));
    updatePrice();
  };

  const handleNftNameChange = (event) => {
    setNftName(event.target.value);
  }; 

  const updatePrice = () => {
    const basePrice = 0.05;
    const fighterPrice = fighter === 'warrior' ? 0 : fighter === 'wizard' ? 0 : 0;
    const weaponPrice = weapon === 'bow' ? 3 : weapon === 'sword' ? 2 : 0;
    setPrice(basePrice + fighterPrice + weaponPrice);
  };

  const createCombinedImage = async (dna) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400; // Set the canvas width and height based on your image size
    canvas.height = 400;
  
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };
  
    if (fighter) {
      const fighterImg = await loadImage(`./static/images/character/${fighter}.png`);
      ctx.drawImage(fighterImg, 0, 0);
    }
    
    if (weapon) {
      const weaponImg = await loadImage(`./static/images/weapon/${weapon}.png`);
      ctx.drawImage(weaponImg, 0, 0);
    }
  
    const combinedImageUrl = canvas.toDataURL('images/${dna}.png');
    return combinedImageUrl;
  };

  // Asynchronous function to mint a new NFT
  const mintNFT = async () => {

    // Check if Ethereum is injected into the window object
    if (typeof window.ethereum !== 'undefined') {
      
      // Request access to the user's Ethereum accounts
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Initialize a provider using window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Get the signer that will be used to send transactions
      const signer = provider.getSigner();
      
      // Initialize our contract using the signer
      const contract = new ethers.Contract(MFTaddress, MFT.abi, signer);

      // Try-catch block to handle fetching of metadata and sending characteristics
      try {
        // Fetch the last minted token ID from the smart contract
        const lastTokenID = await contract.totalSupply();
        const nextTokenID = lastTokenID + 1;
        
        // Fetch metadata from IPFS
        const ipfsBase = 'https://ipfs.io/ipfs/QmcXnQK9GKqXE9X8kkGe7Sb5G9rBAAPw6oxeA4CrjdQmCu/';
        const response = await fetch(`${ipfsBase}${nextTokenID}.json`);
        const metadata = await response.json();

        // Combine image URL (functionality assumed to be implemented elsewhere)
        const combinedImageUrl = await createCombinedImage();

        console.log(`Minting NFT with fighter: ${fighter}, weapon: ${weapon}, name: ${nftName}, price: ${price}`);

        // Try-catch block to handle sending characteristics to server and minting NFT
        try {
          // Send characteristics and image to the server
          await sendCharacteristicsToServer(metadata.dna, combinedImageUrl);
          await sendImageToServer(metadata.dna, combinedImageUrl);

          // Try-catch block to handle the NFT minting process
          try {
            // Define transaction details
            let overrides = {
              from: accounts[0],
              value: ethers.utils.parseEther(price.toString())
            }
            
            // Mint the NFT with the specified price
            const transaction = await contract.mint(price, overrides);
            await transaction.wait();
            console.log(`Successfully minted NFT name: ${nftName}, price: ${price}`)

          // Handle errors during NFT minting
          } catch (err) {
            setError(`Failed to mint the NFT: ${err.message}`);

            // Try-catch block to handle deleting characteristics from server if minting fails
            try {
              await deleteCharacteristicsFromServer(metadata.dna);
              await deleteImagefromServer(metadata.dna, combinedImageUrl);
            } catch (err) {
              console.error('Failed to delete characteristics or image to the server:', err)
            }
          }

        // Handle errors during the sending of characteristics to server
        } catch (err) {
          console.error('Failed to send characteristics or image to the server:', err);
        }

      // Handle errors during the fetching of metadata
      } catch (error) {
        console.error('An error occurred while fetching the token ID or metadata:', error);
      }
        
    } else {
      // Ethereum is not detected, provide user feedback
      setError('Ethereum is not detected in the window object.');
    }
  };


  const sendCharacteristicsToServer = async (dna,combinedImageUrl ) => {
    const data = {
      name: nftName,
      group: "fighters",
      image: combinedImageUrl,
      nft_address: MFTaddress,
      game_characteristics: dna
    };
  
    const response = await fetch(`/api/upload_fighter_characteristics/${dna}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  
  const sendImageToServer = async (dna, imageData) => {
    const data = {
      imageData: imageData
    };
  
    const response = await fetch(`/api/upload_fighter_image/${dna}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  
  const deleteCharacteristicsFromServer = async (dna) => {
    const response = await fetch(`/api/delete_fighter_characteristics/${dna}`, {
      method: 'POST'
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  
  const deleteImagefromServer = async (dna) => {
    const response = await fetch(`/api/delete_fighter_image/${dna}`, {
      method: 'POST'
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  



  return (
    <div className="main-container">
  <h1 className="title-text">Character Generator</h1>
  <div className="input-field-container">
    <label htmlFor="nftName" className="input-field-label">NFT Name:</label>
    <input
      type="text"
      id="nftName"
      value={nftName}
      onChange={handleNftNameChange}
      className="nft-name-input-field"
    />
  </div>
  <div className="options-flex-container">
    <div className="option-container">
    <div className="radio-field">
        <p className="bold-text">Fighters</p>
        <label className="radio-label">
          <input
            type="radio"
            name="fighter"
            value="warrior"
            checked={fighter === 'warrior'}
            onChange={handleFighterChange}
          />
          <span className="radio-span">Warrior</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="fighter"
            value="wizard"
            checked={fighter === 'wizard'}
            onChange={handleFighterChange}
          />
          <span className="radio-span">Wizard</span>
        </label>
      </div>
      <div className="radio-field">
        <p className="bold-text">weapons</p>
        <label className="radio-label">
          <input
            type="radio"
            name="weapon"
            value="bow"
            checked={weapon === 'bow'}
            onChange={handleWeaponChange}
          />
          <span className="radio-span">Bow</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="weapon"
            value="sword"
            checked={weapon === 'sword'}
            onChange={handleWeaponChange}
          />
          <span className="radio-span">Sword</span>
        </label>
      </div>
      <div className="radio-field">
        <p className="bold-text">Colors</p>
        <label className="radio-label">
          <input
            type="radio"
            name="color"
            value="red"
            checked={color === 'red'}
            onChange={handleColorChange}
          />
          <span className="radio-span">Red</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="color"
            value="blue"
            checked={color === 'blue'}
            onChange={handleColorChange}
          />
          <span className="radio-span">Blue</span>
        </label>
      </div>
    </div>
    <div className="image-container">
      {fighter && <img className="character-image" src={`/static/images/character/${fighter}.png`} alt={fighter} />}
      {weapon && <img className="weapon-image" src={`/static/images/weapon/${weapon}.png`} alt={weapon} />}
    </div>
  </div>
  <div className="pricing-container">
    <p>Total Price: {price} ETH</p>
    <button className="mint-nft-button" onClick={mintNFT}>
      Mint NFT
    </button>
  </div>
</div>
  );
};

export default CharacterGenerator;
