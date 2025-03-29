// CHANGES - This is a file of payment component intergration
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
} from "@mui/material";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    bgcolor: "rgba(255, 255, 255, 0.7)",
    // p: 4,
    borderRadius: 4,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    mt: 15,
    mx: 3,
  }}
>
  <Box sx={{ textAlign: "center", width: "100%", maxWidth: 400 }}>
    <Typography variant="h4" fontWeight="bold" color="#002855" gutterBottom>
      Choose Your Payment Method
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
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
        onClick={() => navigate("/card-payment")}
      >
        Pay with Visa/MasterCard
      </Button>

      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#004d40",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          py: 1.5,
          "&:hover": { bgcolor: "#00332a" },
        }}
        onClick={() => navigate("/dialog-payment")}
      >
        Pay with EZ Cash
      </Button>
    </Box>
  </Box>
</Box>

  );
};

export default HomePage;
