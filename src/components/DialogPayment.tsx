// CHANGES - This file is modified to display the total amount in the cart and clear the cart after payment
// CHANGES - This is a file of payment component intergration
import { useState, useEffect } from "react";
import { PaymentService } from '../services/PaymentService'; 
import { petService } from '../services/PetService'; 
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import ezCashLogo from '../../src/assets/ezcash-logo.png';


interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PaymentDetails {
  amount: number;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}


const PaymentDialog: React.FC<PaymentDialogProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<String>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { getCartTotal, clearCart , getCartPetIds } = useCart();
  const navigate = useNavigate();
  const [amountToPay  ] = useState(getCartTotal())
  const [paymentSuccess , setPaymentSuccess] = useState(false)

  useEffect(() => {
    // If the dialog is open, reset state
    if (amountToPay && phoneNumber.length === 10) {
      fetchBalance(phoneNumber);
    }
  }, [amountToPay, phoneNumber]);

  // Fetch balance using the PaymentService
  const fetchBalance = async (phone: string): Promise<void> => {
    setLoading(true);
    try {
      const balance = await PaymentService.fetchBalance(phone);
      setBalance(balance);
    } catch (error) {
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment submission using PaymentService
  const handlePayment = async (): Promise<boolean> => {
    try {
      const paymentSuccess = await PaymentService.handleEZCashPayment(phoneNumber, amountToPay);
      if (paymentSuccess) {
        clearCart() // CHANGES - clears the cart after payment
        setPaymentSuccess(true)
        let petIds = getCartPetIds(); 
        petIds.forEach((petId) => {
          petService.buyPet(petId);
        });

        setTimeout(() => {
          navigate('/buy');
        }, 3000); // CHANGES - navigates to the pet buy after payment

        setResultMessage("Payment successful!");
        setShowSuccessMessage(true);
        // Update balance after payment
        fetchBalance(phoneNumber);
        return true;
      } else {
        throw new Error("Payment failed.");
      }
    } catch (error) {
      setResultMessage("Payment failed. Please try again.");
      setShowSuccessMessage(true);
      console.error('Payment error:', error);
      return false;
    } finally {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  };

  // Handle phone number change and fetch balance if the length is 10
  const handlePhoneNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setBalance(null);
    setPhoneNumber(phone);
    if (phone.length === 10) {
      fetchBalance(phone);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center",
        py: 0, // Keep some padding at top and bottom
        // Remove the excessive mt: 15
      }}
  >
    <Container maxWidth="sm">
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
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#002855"
              textAlign="center"
            >
                EZ Cash Payment
          </Typography>
            <Box 
              component="img"
              src={ezCashLogo}
              alt="Accepted payment cards"
              sx={{ 
                height: 50,
                objectFit: 'contain'
              }}
            />
        </Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your phone number to check balance:
        </Typography>

        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          inputProps={{ maxLength: 10 }}
          sx={{ mb: 3, borderRadius: "8px" }}
        />

        <Typography variant="body2" color="textPrimary" gutterBottom>
          {loading ? "Fetching balance..." : balance !== null ? `Balance: $${balance}` : "Please enter a valid phone number"}
        </Typography>

        <Typography variant="h6" fontWeight="bold" color="#002855" gutterBottom>
          Amount to Pay: ${getCartTotal()}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#002855",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            py: 1.5,
            "&:hover": { bgcolor: "#001f4d" },
          }}
          onClick={async () => {
            await handlePayment();
          }}
          disabled={!phoneNumber || balance === null || balance < getCartTotal() || paymentSuccess || getCartTotal() === 0}
        >
          Proceed to Pay
        </Button>

        {showSuccessMessage && (
          <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={2} textAlign="center">
            <Typography variant="body1" color="green">
              {resultMessage}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  </Box>
  );
};

export default PaymentDialog;
