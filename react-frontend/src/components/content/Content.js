import React from 'react';
import ArtworkSelector from '../artworkSelector/ArtworkSelector';
import "./Content.module.css"
function Content() {
  return (
    <div className="marketplace-container">
    <h1 className="marketplace-title">Marketplace</h1>
    <h2 className="marketplace-description">
     See all the fighters that are available for trading
    </h2>
    <div className="promotional-container">
      <div
        className="promotional-banner"
        style={{
          backgroundImage:
            'url(https://assets.codepen.io/3685267/nft-dashboard-art-6.jpg)',
        }}
      >
        <h2 className="promotional-banner-title">
          Discount
        </h2>
        <button className="promotional-banner-button">
          get 2.5% off on your first purchase
        </button>
      </div>
    </div>

    <div className="trending-container">
      <h2 className="trending-title">Trending Artworks</h2>
      <ul className="trending-artwork-selector">
        {['Art', 'Collectables', 'Music', 'Sport'].map((text, index) => (
          <ArtworkSelector key={text} text={text} index={index} />
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Content;

