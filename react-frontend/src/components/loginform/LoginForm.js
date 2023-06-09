import React from "react";
import styles from './LoginForm.css';

const LoginForm = () => {
    return (
        <div className={styles.relativeContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.header}>Sign in</h1>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.formInnerContainer}>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel} htmlFor="username">Email address</label>
                            <input className={styles.inputElement} id="username" type="text" placeholder="user@example.com" />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel} htmlFor="password">Password</label>
                            <input className={styles.inputElement} id="password" type="password" placeholder="***************" />
                        </div>
                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxItem}>
                                <label>
                                    <input type="checkbox" className={styles.checkbox}/>
                                    <span className={styles.checkboxLabel}>Remember me</span>
                                </label>
                            </div>
                            <div className={styles.forgotPasswordContainer}>
                                <a href="#" className={styles.forgotPasswordLink}>Forgot your password?</a>
                            </div>
                        </div>
                        <div className={styles.submitButtonContainer}>
                            <button type="button" className={styles.submitButton}>Sign in</button>
                        </div>
                        <div className={styles.socialContainer}>
                            <hr className={styles.line}/>
                            <span className={styles.socialText}>Or continue with</span>
                            <hr className={styles.line}/>
                        </div>
                        <div className={styles.socialButtonContainer}>
                            <button type="button" className={styles.socialButton}>
                                <i className="fab fa-google social-icon"></i>
                            </button>
                            <button type="button" className={styles.socialButton}>
                                <i className="fab fa-twitter social-icon"></i>
                            </button>
                            <button type="button" className={styles.socialButton}>
                                <i className="fab fa-linkedin social-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;