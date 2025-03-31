import React, { useState, useEffect } from 'react';
import { PaymentService } from '../services/PaymentService';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/PetService'; 
import {
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  Box,
  Grid,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import cardLogo from '../../src/assets/visa-master-logo.png';


interface PaymentDetails {
  amount: number;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}

interface ValidationErrors {
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  [key: string]: string; // Index signature for dynamic access
}

const PaymentPage: React.FC = () => {
  const { getCartTotal, clearCart, getCartPetIds } = useCart();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: getCartTotal(),
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState<String>("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Validation rules
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'cardNumber':
        if (!value.trim()) return 'Card number is required';
        if (!/^\d+$/.test(value)) return 'Card number must contain only digits';
        if (value.length !== 16) return 'Card number must be 16 digits';
        return '';
      
      case 'cvv':
        if (!value.trim()) return 'CVV is required';
        if (!/^\d+$/.test(value)) return 'CVV must contain only digits';
        if (value.length < 3 || value.length > 4) return 'CVV must be 3 or 4 digits';
        return '';
      
      case 'expiryMonth':
        if (!value.trim()) return 'Expiry month is required';
        if (!/^\d+$/.test(value)) return 'Expiry month must contain only digits';
        const month = parseInt(value, 10);
        if (isNaN(month) || month < 1 || month > 12) return 'Expiry month must be between 1 and 12';
        return '';
      
      case 'expiryYear':
        if (!value.trim()) return 'Expiry year is required';
        if (!/^\d+$/.test(value)) return 'Expiry year must contain only digits';
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < currentYear) return 'Expiry year must be current or future year';
        return '';
      
      default:
        return '';
    }
  };

  // Validate form whenever payment details change
  useEffect(() => {
    const newErrors: ValidationErrors = {
      cardNumber: validateField('cardNumber', paymentDetails.cardNumber),
      cvv: validateField('cvv', paymentDetails.cvv),
      expiryMonth: validateField('expiryMonth', paymentDetails.expiryMonth),
      expiryYear: validateField('expiryYear', paymentDetails.expiryYear),
    };
    setErrors(newErrors);
    
    // Check if form is valid (all fields filled and no errors)
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    const allFieldsFilled = Object.entries(paymentDetails)
      .filter(([key]) => key !== 'amount')
      .every(([_, value]) => value.trim() !== '');
    
    setFormValid(allFieldsFilled && !hasErrors);
  }, [paymentDetails]);

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
      
      // Validate the field on change
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handlePayment = async (): Promise<void> => {
    // Validate all fields before submission
    const newErrors: ValidationErrors = {
      cardNumber: validateField('cardNumber', paymentDetails.cardNumber),
      cvv: validateField('cvv', paymentDetails.cvv),
      expiryMonth: validateField('expiryMonth', paymentDetails.expiryMonth),
      expiryYear: validateField('expiryYear', paymentDetails.expiryYear),
    };
    
    setErrors(newErrors);
    
    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setResultMessage('Please fix the errors in the form');
      setShowSuccessMessage(true);
      return;
    }
    
    try {
      // Use the PaymentService to handle the card payment
      const { success, message } = await PaymentService.handleCardPayment(paymentDetails);

      // Sets result message and show success message
      setResultMessage(message);
      setShowSuccessMessage(true);
  
      if (success) {
        setPaymentSuccess(true)
        let petIds = getCartPetIds(); 
        petIds.forEach((petId) => {
          petService.buyPet(petId);
        });
        clearCart(); // CHANGES - clears the cart after payment
        setTimeout(() => {
          navigate('/buy');
        }, 3000); // CHANGES - navigates to the pet buy after payment
        // setPaymentDetails({ // CHANGES - resets the payment details
        //   amount: 0,
        //   cardNumber: '',
        //   cvv: '',
        //   expiryMonth: '',
        //   expiryYear: '',
        // });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setResultMessage('Payment failed. Please try again.');
      setShowSuccessMessage(true);
    } finally {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        paddingTop: "15px",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Box
              bgcolor="rgba(255, 255, 255, 0.9)"
              p={4}
              borderRadius={4}
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              sx={{ backdropFilter: "blur(10px)" }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="#002855"  sx={{ ml: 2 }}>
                  Secure Card Payment
                </Typography>
                <Box 
                  component="img"
                  src={cardLogo}
                  alt="Accepted payment cards"
                  sx={{ 
                    height: 40,
                    objectFit: 'contain',
                    borderRadius: 3,
                  }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom textAlign="center">
                Enter your payment details below
              </Typography>

              {/* Amount */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel>Amount (LKR)</InputLabel>
                <OutlinedInput
                  value={getCartTotal()}
                  disabled
                  label="Amount"
                  sx={{ borderRadius: "8px" }}
                />
              </FormControl>

              {/* Card Number */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined" error={!!errors.cardNumber}>
                <InputLabel>Card Number</InputLabel>
                <OutlinedInput
                  disabled={paymentSuccess}
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  label="Card Number"
                  sx={{ borderRadius: "8px" }}
                  placeholder="Enter 16 digit card number"
                />
                {errors.cardNumber && <FormHelperText error>{errors.cardNumber}</FormHelperText>}
              </FormControl>

              {/* CVV */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined" error={!!errors.cvv}>
                <InputLabel>CVV</InputLabel>
                <OutlinedInput
                  disabled={paymentSuccess}
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  label="CVV"
                  sx={{ borderRadius: "8px" }}
                  placeholder="Enter 3-4 digit security code"
                />
                {errors.cvv && <FormHelperText error>{errors.cvv}</FormHelperText>}
              </FormControl>

              {/* Expiry Month */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined" error={!!errors.expiryMonth}>
                <InputLabel>Expiry Month</InputLabel>
                <OutlinedInput
                  disabled={paymentSuccess}
                  name="expiryMonth"
                  value={paymentDetails.expiryMonth}
                  onChange={handleInputChange}
                  label="Expiry Month"
                  sx={{ borderRadius: "8px" }}
                  placeholder="MM (1-12)"
                />
                {errors.expiryMonth && <FormHelperText error>{errors.expiryMonth}</FormHelperText>}
              </FormControl>

              {/* Expiry Year */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined" error={!!errors.expiryYear}>
                <InputLabel>Expiry Year</InputLabel>
                <OutlinedInput
                  disabled={paymentSuccess}
                  name="expiryYear"
                  value={paymentDetails.expiryYear}
                  onChange={handleInputChange}
                  label="Expiry Year"
                  sx={{ borderRadius: "8px" }}
                  placeholder="YYYY"
                />
                {errors.expiryYear && <FormHelperText error>{errors.expiryYear}</FormHelperText>}
              </FormControl>

              {/* Payment Button */}
              <Button
                disabled={paymentSuccess || !formValid || getCartTotal() === 0}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#002855",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  py: 1.5,
                  "&:hover": { bgcolor: "#001f4d" },
                  "&.Mui-disabled": {
                    bgcolor: "#cccccc",
                    color: "#666666"
                  }
                }}
                onClick={handlePayment}
              >
                Make Payment
              </Button>

              {showSuccessMessage && (
                <Box mt={2} p={2} bgcolor={resultMessage.includes("failed") || resultMessage.includes("fix") ? "#ffebee" : "#e8f5e9"} 
                     borderRadius={2} textAlign="center">
                  <Typography variant="body1" color={resultMessage.includes("failed") || resultMessage.includes("fix") ? "error" : "green"}>
                    {resultMessage}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentPage;