import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/PaymentPage.module.css";

interface PaymentDetails {
  amount: number;
  phoneNumber?: string;
  cardNumber?: string;
  cvv?: string;
  expiryMonth?: string;
  expiryYear?: string;
  paymentMethod: "Card" | "EZ Cash";
}

const PaymentPage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: 0,
    phoneNumber: "",
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    paymentMethod: "Card",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      let response;
      
      if (paymentDetails.paymentMethod === "Card") {
        response = await axios.post("/api/payment/card", {
          amount: paymentDetails.amount,
          cardNumber: paymentDetails.cardNumber,
          cvv: paymentDetails.cvv,
          expiryMonth: paymentDetails.expiryMonth,
          expiryYear: paymentDetails.expiryYear,
        });
      } else {
        response = await axios.post("/api/payment/ezcash", {
          amount: paymentDetails.amount,
          phone: paymentDetails.phoneNumber,
        });
      }

      setShowSuccessMessage(true);
      setErrorMessage("");
      alert(response.data); // Show success message
    } catch (error) {
      console.error("Payment failed:", error);
      setShowSuccessMessage(false);
      setErrorMessage("Payment failed. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Page</h1>

      <div className={styles.formGroup}>
        <label className={styles.label}>Select Payment Method:</label>
        <select name="paymentMethod" value={paymentDetails.paymentMethod} onChange={handleInputChange} className={styles.input}>
          <option value="Card">Visa/MasterCard</option>
          <option value="EZ Cash">EZ Cash</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Amount:</label>
        <input type="number" name="amount" value={paymentDetails.amount} onChange={handleInputChange} className={styles.input} required />
      </div>

      {paymentDetails.paymentMethod === "Card" ? (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>Card Number:</label>
            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>CVV:</label>
            <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Expiry Month:</label>
            <input type="text" name="expiryMonth" value={paymentDetails.expiryMonth} onChange={handleInputChange} className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Expiry Year:</label>
            <input type="text" name="expiryYear" value={paymentDetails.expiryYear} onChange={handleInputChange} className={styles.input} required />
          </div>
        </>
      ) : (
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number:</label>
          <input type="text" name="phoneNumber" value={paymentDetails.phoneNumber} onChange={handleInputChange} className={styles.input} required />
        </div>
      )}

      <button className={styles.paymentButton} onClick={handlePayment}>
        Make Payment
      </button>

      {showSuccessMessage && <div className={styles.successMessage}>Payment was successful!</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default PaymentPage;
