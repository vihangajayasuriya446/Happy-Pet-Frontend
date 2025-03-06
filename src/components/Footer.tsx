import React from "react";
import { Box, Typography, Link, TextField, Button, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { theme } from "../themes/themes";
import HappyPetLogo from '../assets/HappyPet.png';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        py: 2,
        px: 1,
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={4} maxWidth="lg" mx="auto" justifyContent="space-between">
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <img
            src={HappyPetLogo}
            alt="Happy Pet"
            style={{ height: 150, marginBottom:5, marginTop: 5, objectFit: "contain" }}
          />
          <Box sx={{ marginLeft: 8 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                onClick={() => handleNavigation("/about")}
                color="inherit"
              >
                About Us
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                onClick={() => handleNavigation("/contact")}
                color="inherit"
              >
                Contact Us
              </Link>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Information
          </Typography>
          {["More Search", "Pet Matchmaking", "Buy Pets", "Adopt Pets"].map((text) => (
            <Link key={text} href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1 }}>
              {text}
            </Link>
          ))}
        </Grid>

        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Helpful Links
          </Typography>
          {["Services", "Support", "Terms & Conditions", "Privacy Policy"].map((text) => (
            <Link key={text} href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1 }}>
              {text}
            </Link>
          ))}
        </Grid>

        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Subscribe for More
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} mt={1} gap={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter your email"
              sx={{
                bgcolor: "#fff",
                borderRadius: "5px",
                width: "100%",
                mb: { xs: 1, sm: 0 },
              }}
            />
            <Button variant="contained" sx={{ bgcolor: "#222", color: "white" }}>
              Subscribe
            </Button>
          </Box>

          <Box display="flex" justifyContent={{ xs: "center", sm: "left" }} mt={2} gap={2}>
            <Facebook sx={{ fontSize: 30, cursor: "pointer" }} />
            <Instagram sx={{ fontSize: 30, cursor: "pointer" }} />
            <Twitter sx={{ fontSize: 30, cursor: "pointer" }} />
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={5}>
        <Typography variant="body2" sx={{ color: "#000000" }}>
          © {new Date().getFullYear()} Happy Pet. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
