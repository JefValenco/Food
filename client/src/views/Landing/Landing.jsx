import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { food } from "../.././images/images";

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#cce85d", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        style={{
          backgroundColor: "#cce85d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.content}>
          <div>
            <p className={styles.p}>Welcome to</p>
            <h1 className={styles.h1}>Spoonacular!</h1>
          </div>
          <div className={styles.contentButton}>
            <Link to="/recipes">
              <button className={styles.btnPrimary}>Get in</button>
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={food}
            alt="Food"
            className={styles.image}
            style={{ width: "920px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
