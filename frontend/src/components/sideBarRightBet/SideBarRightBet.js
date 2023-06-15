import React from 'react';
import styles from './SideBarRightBet.module.css';

function SideBarRightBet({ showBetSidebar, selectedBet }) {
    return (
      <div className={styles.layout} id="app">
 
    
 <div className={styles.invoice} id={styles.Invoicediv}>
  <div className={styles.invoice__wrapper}>
    <h2 className={styles.invoice__title}>
      Invoice for payment
      <a className={styles.close} href="#">
        <span className={styles['sr-only']}>Close</span>
        <svg
          id={styles.Closebtn}
          style={{ width: '24px', height: '24px' }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </a>
    </h2>
    <article>
      <section className={styles.invoice__section + ' ' + styles.invoice__type}>
        <label className={styles['switch__label']}>
          <input
            className={styles['switch__input'] + ' ' + styles['sr-only']}
            name="simple"
            type="checkbox"
          />
          <span className={styles['switch__option']}>Simple</span>
          <div className={styles.switch}></div>
          <span className={styles['switch__option']}>Combo</span>
        </label>
      </section>
      <section className={styles.invoice__section + ' ' + styles.invoice__bet + ' ' + styles.bet}>
        <p className={styles['bet__match']}>
          <span className={styles['bet__team']}>Barcelona</span>
          <span className={styles['bet__team__separator']}>vs</span>
          <span className={styles['bet__team'] + ' ' + styles['bet__team--loser']}>Chelsea</span>
          <button className={styles.btn + ' ' + styles['btn--round']}>
            <span className={styles['sr-only']}>Delete</span>
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
              />
            </svg>
          </button>
        </p>
        <div className={styles['bet__outcome']}>
          <small className={styles['bet__outcome__state']}>Winner</small>
          <p className={styles['bet__outcome__rating']}>
            <span>Barcelona</span>
            <span className={styles['tag'] + ' ' + styles['rating'] + ' ' + styles['rating--primary']}>
              1.22
            </span>
          </p>
        </div>
      </section>
      <section className={styles.invoice__section + ' ' + styles.invoice__payment + ' ' + styles.payment} >
              <div className={`${styles.invoice__payment__amount} toggle-buttons`}>
  <input className={`${styles.toggle} ${styles["toggle--button"]} sr-only`} id="toggle-1" name="amount" type="radio" value="1" />
  <label className={`${styles.btn} ${styles["btn--toggle"]}`} htmlFor="toggle-1">1$</label>
  <input checked="checked" className={`${styles.toggle} ${styles["toggle--button"]} sr-only`} id="toggle-2" name="amount" type="radio" value="2" />
  <label className={`${styles.btn} ${styles["btn--toggle"]}`} htmlFor="toggle-2">2$</label>
  <input className={`${styles.toggle} ${styles["toggle--button"]} sr-only`} id="toggle-5" name="amount" type="radio" value="5" />
  <label className={`${styles.btn} ${styles["btn--toggle"]}`} htmlFor="toggle-5">5$</label>
  <label className={styles["sr-only"]}>Any amount</label>
  <input placeholder="20$" type="text" />
</div>
<div className={styles.invoice__payment__options}>
  <h4 className={styles.invoice__payment__options__title}>
    More options
    <button className={`${styles.btn} ${styles["btn--round"]}`}>
      <span className={styles["sr-only"]}>More information</span>
      <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z" />
      </svg>
    </button>
  </h4>
  <input checked="checked" className={styles["sr-only"]} id="rules-agreement" type="checkbox" />
<label className={styles.checkbox} htmlFor="rules-agreement">Accept rules of the agreement</label>
<input className={styles["sr-only"]} id="odds-agreement" type="checkbox" />
<label className={styles.checkbox} htmlFor="odds-agreement">Accept any odds changes</label>

</div>
<div className={styles.invoice__payment__recap}>
  <div className={styles.invoice__payment__recap__rating}>
    <h4 className={styles.invoice__payment__recap__title}>
      Total Rate
    </h4>
    <span className={`${styles.tag} ${styles["rating--primary"]}`}>1.22</span>
  </div>
  <div className={styles.invoice__payment__recap__winnings}>
    <h4 className={styles.invoice__payment__recap__title}>
      Possible winnings
    </h4>
    <p className={styles.invoice__payment__recap__winnings__amount}>
      735, 38$
    </p>
  </div>
</div>
</section>
<section className={`${styles.invoice__section} ${styles.invoice__submit}`}>
  <button className={`${styles.btn} ${styles["btn--primary"]}`}>Place a bet</button>
</section>
</article>
</div>
<div className={styles.invoice__assistance}>
  <button className={`${styles.invoice__assistance__button} ${styles.btn} ${styles["btn--secondary"]} ${styles["btn--icon"]}`} type="button">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H19V21H12V23H18A3,3 0 0,0 21,20V10C21,5 16.97,1 12,1Z" />
    </svg>
    Technical Support 24/7
  </button>
</div>
</div>
</div>

); 
}
export default SideBarRightBet;