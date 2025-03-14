import { Box, Typography, Link, TextField, Button, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
        py: 6,
        px: { xs: 2, sm: 4 },
        mt: 8,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)", // Glass morphism effect
      }}
    >
      <Grid
        container
        spacing={4}
        maxWidth="lg"
        mx="auto"
        justifyContent="space-between"
      >
        {/* Logo & Basic Links */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <img
            src="/src/assets/logo512.png"
            alt="Happy Pet"
            style={{
              height: 180,
              marginBottom: 20,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
            >
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": { color: "primary.main" },
                }}
              >
                About Us
              </Link>
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
            >
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact Us
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Information
          </Typography>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            More Search
          </Link>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Pet Matchmaking
          </Link>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Buy Pets
          </Link>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ color: "text.primary", transition: "color 0.3s ease" }}
          >
            Adopt Pets
          </Link>
        </Grid>

        {/* Helpful Links Section */}
        <Grid item xs={6} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Helpful Links
          </Typography>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Services
          </Link>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Support
          </Link>
          <Link
            href="/terms"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ color: "text.primary", transition: "color 0.3s ease" }}
          >
            Privacy Policy
          </Link>
        </Grid>

        {/* Subscription Section */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Subscribe for More
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            mt={1}
            gap={1}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter your email"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                width: "100%",
                mb: { xs: 1, sm: 0 },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>

          {/* Social Icons */}
          <Box
            display="flex"
            justifyContent={{ xs: "center", sm: "left" }}
            mt={2}
            gap={2}
          >
            <Facebook
              sx={{
                fontSize: 30,
                cursor: "pointer",
                color: "text.primary",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            />
            <Instagram
              sx={{
                fontSize: 30,
                cursor: "pointer",
                color: "text.primary",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            />
            <Twitter
              sx={{
                fontSize: 30,
                cursor: "pointer",
                color: "text.primary",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box textAlign="center" mt={5}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "0.875rem" }}
        >
          © {new Date().getFullYear()} Happy Pet. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;