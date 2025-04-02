import { Box, Typography, Link, Grid } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
        py: 6,
        px: { xs: 2, sm: 4 },
        mt: 8,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)", // Glass morphism effect
        minHeight: "300px", // Standard height for footer
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100vw", // Ensure full viewport width
        marginLeft: "calc(-50vw + 50%)", // Center the footer properly
        boxSizing: "border-box", // Include padding in width calculation
      }}
    >
      <Grid
        container
        spacing={4}
        maxWidth="lg"
        mx="auto"
        justifyContent="space-between"
        width="100%"
      >
        {/* Logo & Basic Links */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <img
            src="/logo512.png"
            alt="Happy Pet"
            style={{
              height: 120,
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
                href="/aboutus"
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
                href="/contactus"
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
            href="/matchmaking"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Pet Matchmaking
          </Link>
          <Link
            href="/buy"
            underline="hover"
            color="inherit"
            display="block"
            sx={{ mb: 1, color: "text.primary", transition: "color 0.3s ease" }}
          >
            Buy Pets
          </Link>
          <Link
            href="/adopt"
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
            href="/supportus"
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

        {/* Social Media Icons Section */}
        <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Follow Us
          </Typography>
          <Box
            display="flex"
            justifyContent={{ xs: "center", sm: "left" }}
            gap={2}
          >
            <Link
              href="https://www.facebook.com/share/1PZSnD5qyk/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
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
            </Link>
            <Link
              href="https://www.instagram.com/happypetlk?igsh=MW51MmI2OWJ3OHR5OA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "text.primary",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "primary.main" },
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/happy-pet-664b40352/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "text.primary",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "primary.main" },
                }}
              />
            </Link>
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