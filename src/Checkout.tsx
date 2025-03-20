import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose Your Payment Method</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.paymentButton} onClick={() => navigate("/payment")}>
            Pay with Visa/MasterCard
          </button>
          <button className={styles.paymentButton} onClick={() => navigate("/dialog-payment")}>
            Pay with EZ Cash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
