import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
// import Footer from "../components/Footer";
import { theme } from "../themes/themes";

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.backgroundColor, // Dark navy
        color: theme.textColor,                // White text
        // minHeight: "100vh",
        pt: 10, // top padding to accommodate fixed Navbar
      }}
    >
      {/* Content Container */}
      {/* <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      > */}
        <Grid
          container
          spacing={2}
          sx={{
            // backgroundColor: theme.accentColor, // Light gray (#ecf0f1)
            color: "#2c3e50",
            // borderRadius: 2,
            p: { xs: 3, md: 5 },
          }}
        >
          {/* Title Section */}
          <Grid item xs={12}>
            <Typography color={theme.textColorSecondary} variant="h3" gutterBottom>
              About Us
            </Typography>
            <Typography color={theme.textColorSecondary} variant="h5" gutterBottom>
              Welcome to Our Page
            </Typography>
            <Typography color={theme.textColorSecondary} variant="body1" paragraph>
              At HappyPet, we aim to create a world where pets are cherished and
              well-cared for. Whether you're looking to adopt a new furry friend,
              find high-quality pet supplies, or support animal welfare, our
              platform has it all.
            </Typography>
          </Grid>

          {/* Mission Section */}
          <Grid item xs={12}>
            <Typography color={theme.textColorSecondary} variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography color={theme.textColorSecondary} variant="body1" paragraph>
              We strive to:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              <li>
                <Typography color={theme.textColorSecondary} variant="body1">
                  Provide a safe and efficient platform for pet adoption and sales.
                </Typography>
              </li>
              <li>
                <Typography color={theme.textColorSecondary} variant="body1">
                  Ensure homeless and stray animals find loving homes.
                </Typography>
              </li>
              <li>
                <Typography color={theme.textColorSecondary} variant="body1">
                  Offer pet owners easy access to reliable supplies, medicine, and
                  community connections.
                </Typography>
              </li>
              <li>
                <Typography color={theme.textColorSecondary} variant="body1">
                  Partner with animal welfare organizations to promote responsible
                  pet care and awareness.
                </Typography>
              </li>
            </ul>
            <Typography color={theme.textColorSecondary} variant="body1" paragraph sx={{ mt: 2 }}>
              Join us in building a better world for pets and pet lovers. Let's
              make a difference—one paw at a time!
            </Typography>
          </Grid>
        </Grid>
      {/* </Box> */}

      {/* <Footer /> */}
    </Box>
  );
};

export default AboutUs;
