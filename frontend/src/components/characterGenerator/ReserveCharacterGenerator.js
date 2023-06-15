import React, { useState } from 'react';
import IPFS from 'ipfs-http-client';

const CharacterGenerator = () => {
  const [fighter, setFighter] = useState('');
  const [weapon, setWeapon] = useState('');
  const [nftName, setNftName] = useState('');
  const [price, setPrice] = useState(0);

  const handleFighterChange = (event) => {
    setFighter(event.target.value);
    updatePrice();
  };

  const handleWeaponChange = (event) => {
    setWeapon(event.target.value);
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

  const saveImageToIPFS = async (imageDataUrl) => {
    const data = imageDataUrl.split(',')[1];
    const buffer = Buffer.from(data, 'base64');
    const result = await ipfs.add(buffer);
    return result.path;
  };

  const createCombinedImage = async () => {
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
      const fighterImg = await loadImage(`./assets/character/${fighter}.png`);
      ctx.drawImage(fighterImg, 0, 0);
    }
    
    if (weapon) {
      const weaponImg = await loadImage(`./assets/weapon/${weapon}.png`);
      ctx.drawImage(weaponImg, 0, 0);
    }
  
    const combinedImageUrl = canvas.toDataURL('image/png');
    return combinedImageUrl;
  };
  

  const mintNFT = async () => {
  const combinedImageUrl = await createCombinedImage();
  const ipfsHash = await saveImageToIPFS(combinedImageUrl);
  const imageIPFSUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

  console.log(`Minting NFT with fighter: ${fighter}, weapon: ${weapon}, name: ${nftName}, price: ${price}, image: ${imageIPFSUrl}`);

  // Create NFT metadata
  const metadata = {
    name: nftName,
    description: `A unique character with ${fighter} and ${weapon}`,
    image: imageIPFSUrl,
  };

  // Interact with your smart contract to mint the NFT and include the metadata
};

  const dataURLToBuffer = (dataURL) => {
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
};




  return (
    <div className="text-white bg-transparent p-4">
      <h1 className="text-2xl mb-4">Character Generator</h1>
      <div className="mb-4">
        <label htmlFor="nftName" className="block mb-2">NFT Name:</label>
        <input
          type="text"
          id="nftName"
          value={nftName}
          onChange={handleNftNameChange}
          className="w-1/2 px-3 py-2 bg-gray-800 text-white border rounded"
        />
      </div>
      <div className="flex">
        <div className="w-1/2">
          <div className="mb-4">
            <p className="font-bold mb-2">Fighters</p>
            <label className="block mb-2">
              <input
                type="radio"
                name="fighter"
                value="warrior"
                checked={fighter === 'warrior'}
                onChange={handleFighterChange}
              />
              <span className="ml-2">Warrior</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="fighter"
                value="wizard"
                checked={fighter === 'wizard'}
                onChange={handleFighterChange}
              />
              <span className="ml-2">Wizard</span>
            </label>
          </div>
          <div className="mb-4">
            <p className="font-bold mb-2">weapons</p>
            <label className="block mb-2">
              <input
                type="radio"
                name="weapon"
                value="bow"
                checked={weapon === 'bow'}
                onChange={handleWeaponChange}
              />
              <span className="ml-2">Bow</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="weapon"
                value="sword"
                checked={weapon === 'sword'}
                onChange={handleWeaponChange}
              />
              <span className="ml-2">Sword</span>
            </label>
          </div>
        </div>
        <div className="w-1/2 relative">
          {/* Add the superposed layers here */}
          {fighter && <img className="absolute" src={`/static/images/character/${fighter}.png`} alt={fighter} />}
          {weapon && <img className="absolute" src={`/static/images/weapon/${weapon}.png`} alt={weapon} />}
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Total Price: {price} ETH</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={mintNFT}>
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default CharacterGenerator;
