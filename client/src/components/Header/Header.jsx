import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        alcoho-rhythm
      </div>
      <div className={styles.linkContainer}>
        <Link to="/signup" className={styles.link}>Signup</Link>
        <Link to="/signin" className={styles.link}>Signin</Link>
        <Link to="/dashboard" className={styles.link}>Dashboard</Link>
        <Link to="/Register" className={styles.link}>Register</Link>
      </div>
    </div>
  );
}

export default Header;
