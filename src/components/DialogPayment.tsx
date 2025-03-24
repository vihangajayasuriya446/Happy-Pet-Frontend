import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amountToPay: number;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose, amountToPay }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchBalance = async (phone: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-balance?phone=${phone}`);
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    if (phone.length === 10) {
      fetchBalance(phone);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogTitle>Payment</DialogTitle>
        <Typography variant="body1" gutterBottom>
          Enter your phone number to check balance:
        </Typography>
        <TextField 
          fullWidth 
          label="Phone Number" 
          variant="outlined" 
          value={phoneNumber} 
          onChange={handlePhoneNumberChange} 
          inputProps={{ maxLength: 10 }}
        />
        <Typography variant="body2" color="textSecondary">
          {loading ? "Fetching balance..." : balance !== null ? `Balance: $${balance}` : "Enter phone number to check balance"}
        </Typography>
        <Typography variant="h6">Amount to Pay: ${amountToPay}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={!phoneNumber || balance === null || balance < amountToPay}
        >
          Proceed to Pay
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;