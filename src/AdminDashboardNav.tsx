import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const AdminDashboardNav: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Glass morphism effect
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)", // Soft shadow
          p: 4,
          transition: "transform 0.3s ease, box-shadow 0.1s ease",
          "&:hover": {
            transform: "scale(1.02)", // Slight scale on hover
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#002855",
            mb: 4,
            fontSize: isMobile ? "1.75rem" : "2rem",
            fontFamily: "'Poppins', sans-serif", // Modern font
          }}
        >
          Admin Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[
            { label: "Pet Adopt Admin Dashboard", path: "/dashboard1" },
            { label: "Pet Buy Admin Dashboard", path: "/admin/pets" },
            { label: "Matchmaking Admin Dashboard", path: "/dashboard" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#002855",
                color: "white",
                fontWeight: "bold",
                borderRadius: "12px",
                py: 1.5,
                fontSize: isMobile ? "0.875rem" : "1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#001f4d",
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboardNav;