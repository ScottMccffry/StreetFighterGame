import React from 'react';
import CharacterGenerator from './CharacterGenerator';

const MintingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full pr-4">
          <CharacterGenerator />
        </div>
    </div>
  );
};

export default MintingPage;
