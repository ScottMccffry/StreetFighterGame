import React from 'react';
import ArtworkSelector from '../artworkSelector/ArtworkSelector';
import styles from "./Content.module.css"
function Content() {
  return (
    <div className={styles.marketplaceContainer}>
    <h1 className={styles.marketplaceTitle}>Marketplace</h1>
    <h2 className={styles.marketplaceDescription}>
     See all the fighters that are available for trading
    </h2>
    <div className={styles.promotionalContainer}>
      <div
        className={styles.promotionalBanner}
        style={{
          backgroundImage:
            'url(https://assets.codepen.io/3685267/nft-dashboard-art-6.jpg)',
        }}
      >
        <h2 className={styles.promotionalBannerTitle}>
          Discount
        </h2>
        <button className={styles.promotionalBannerButton}>
          get 2.5% off on your first purchase
        </button>
      </div>
    </div>

    <div className={styles.trendingContainer}>
      <h2 className={styles.trendingTitle}>Trending Artworks</h2>
      <ul className={styles.trendingArtworkSelector}>
        {['Art', 'Collectables', 'Music', 'Sport'].map((text, index) => (
          <ArtworkSelector key={text} text={text} index={index} />
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Content;

