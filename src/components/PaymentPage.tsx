import React, { useState } from 'react';
import styles from '../styles/PaymentPage.module.css';

interface PaymentDetails {
  amount: number;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}

const PaymentPage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: 0,
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    if (name === 'amount') {
      setPaymentDetails((prevState) => ({
        ...prevState,
        amount: parseInt(value, 10) || 0,
      }));
    } else {
      setPaymentDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePayment = (): void => {
    // Implement your payment logic here
    console.log('Payment Details:', paymentDetails);
    setShowSuccessMessage(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Page</h1>
      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.label}>
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={paymentDetails.amount}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Enter the Amount"
          required
          min="0"
          step="1"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cardNumber" className={styles.label}>
          Card Number:
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Enter card number"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cvv" className={styles.label}>
          CVV:
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Enter CVV"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expiryMonth" className={styles.label}>
          Expiry Month:
        </label>
        <input
          type="text"
          id="expiryMonth"
          name="expiryMonth"
          value={paymentDetails.expiryMonth}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="MM"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expiryYear" className={styles.label}>
          Expiry Year:
        </label>
        <input
          type="text"
          id="expiryYear"
          name="expiryYear"
          value={paymentDetails.expiryYear}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="YY"
          required
        />
      </div>
      <button className={styles.paymentButton} onClick={handlePayment}>
        Make Payment
      </button>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          Purchase was successful!
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
