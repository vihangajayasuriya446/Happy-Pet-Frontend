import { Box, Typography, Link as MuiLink, Grid } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.8)",
        py: 6,
        px: { xs: 2, sm: 4 },
        mt: 8,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%", // Changed from 100vw
        overflowX: "hidden",
        marginLeft: "calc(-50vw + 50%)",
        boxSizing: "border-box",
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
          <RouterLink to="/">
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
          </RouterLink>
          <Box>
            <RouterLink 
              to="/aboutus" 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="body1"
                sx={{ 
                  mb: 1, 
                  color: "text.primary", 
                  transition: "color 0.3s ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                About Us
              </Typography>
            </RouterLink>
            <RouterLink 
              to="/contactus" 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="body1"
                sx={{ 
                  mb: 1, 
                  color: "text.primary", 
                  transition: "color 0.3s ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact Us
              </Typography>
            </RouterLink>
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
          <RouterLink 
            to="/matchmaking" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                mb: 1, 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Pet Matchmaking
            </Typography>
          </RouterLink>
          <RouterLink 
            to="/buy" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                mb: 1, 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Buy Pets
            </Typography>
          </RouterLink>
          <RouterLink 
            to="/adopt" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Adopt Pets
            </Typography>
          </RouterLink>
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
          <RouterLink 
            to="/supportus" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                mb: 1, 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Support
            </Typography>
          </RouterLink>
          <RouterLink 
            to="/terms" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                mb: 1, 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms & Conditions
            </Typography>
          </RouterLink>
          <RouterLink 
            to="/privacy" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ 
                color: "text.primary", 
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </Typography>
          </RouterLink>
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
            <MuiLink
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
            </MuiLink>
            <MuiLink
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
            </MuiLink>
            <MuiLink
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
            </MuiLink>
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