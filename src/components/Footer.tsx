import { Box, Typography, Link, TextField, Button, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        py: 5,
        px: 3,
        mt: 5,
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={4} maxWidth="lg" mx="auto" justifyContent="space-between">
        {/* Logo & Basic Links */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <img
            src="/src/assets/logo.png"
            alt="Happy Pet"
            style={{ height: 180, marginBottom: 20, objectFit: "contain" }}
          />
          <Box>
            <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
              <Link href="#" underline="hover" color="inherit">
                About Us
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
              <Link href="#" underline="hover" color="inherit">
                Contact Us
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "black" }}>
            Information
          </Typography>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            More Search
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            Pet Matchmaking
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            Buy Pets
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ color: "black" }}>
            Adopt Pets
          </Link>
        </Grid>

        {/* Helpful Links Section */}
        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "black" }}>
            Helpful Links
          </Typography>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            Services
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            Support
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ mb: 1, color: "black" }}>
            Terms & Conditions
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block" sx={{ color: "black" }}>
            Privacy Policy
          </Link>
        </Grid>

        {/* Subscription Section */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "black" }}>
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

          {/* Social Icons */}
          <Box display="flex" justifyContent={{ xs: "center", sm: "left" }} mt={2} gap={2}>
            <Facebook sx={{ fontSize: 30, cursor: "pointer", color: "black" }} />
            <Instagram sx={{ fontSize: 30, cursor: "pointer", color: "black" }} />
            <Twitter sx={{ fontSize: 30, cursor: "pointer", color: "black" }} />
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box textAlign="center" mt={5}>
        <Typography variant="body2" sx={{ color: "black" }}>
          © {new Date().getFullYear()} Happy Pet. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;