import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Link,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ContactUsPage: React.FC = () => {
  // Standard CSS Styling
  const styles = {
    formInput: {
      backgroundColor: "#f9f9f9",
      borderRadius: "4px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ddd",
        },
        "&:hover fieldset": {
          borderColor: "#bbb",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#3f51b5",
        },
      },
    },
    button: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "4px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#303f9f",
      },
    },
    accordion: {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginBottom: "8px",
    },
    link: {
      color: "#3f51b5",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  return (
    <Box>
      

      {/* Main Content Container */}
      <Container
        maxWidth="md"
        sx={{
          py: 8,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          mt: { xs: "64px", sm: "72px", md: "80px" },
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="600"
          align="center"
          color="primary"
          sx={{ mb: 4 }}
        >
          Contact Us
        </Typography>

        {/* Note Section */}
        <Typography
          variant="body2"
          paragraph
          sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}
        >
          <strong>Note:</strong> If you have a question about a specific pet or
          policies at a shelter, please contact them directly. Asking HappyPet
          will delay your search for a pet, since each shelter manages its own
          pet list and information on HappyPet.com. Read on for more answers.
        </Typography>

        {/* Contact Form Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: "background.paper",
            borderTop: "3px solid",
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="600"
            align="center"
            color="primary"
            sx={{ mb: 3 }}
          >
            Contact Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                required
                size="small"
                sx={styles.formInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                type="email"
                required
                size="small"
                sx={styles.formInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
                size="small"
                sx={styles.formInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
                size="small"
                sx={styles.formInput}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" sx={styles.button}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Frequently Asked Questions Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="600"
            align="center"
            color="primary"
            sx={{ mb: 3 }}
          >
            Frequently Asked Questions
          </Typography>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500"> How do I adopt a pet on HappyPet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                To adopt a pet, please visit the shelter's page on HappyPet.com
                and follow their adoption process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">
                Can I return a pet after adoption?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Each shelter has its own return policy. Please contact the
                shelter directly for more information.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">
                How do I update my account information?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                You can update your account information by logging into your
                HappyPet account and navigating to the account settings page.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I adopt a pet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                To adopt a pet, please visit the shelter's page on HappyPet.com
                and follow their adoption process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I adopt a pet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                To adopt a pet, please visit the shelter's page on HappyPet.com
                and follow their adoption process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I adopt a pet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                To adopt a pet, please visit the shelter's page on HappyPet.com
                and follow their adoption process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Typography variant="body2" paragraph align="center" sx={{ mt: 2 }}>
            If you have a general question, you might find the answer in our{" "}
            <Link href="/faq" sx={styles.link}>
              FAQ
            </Link>{" "}
            section.
          </Typography>
        </Box>

        {/* Shelter and Placement Group Assistance Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="600"
            align="center"
            color="primary"
            sx={{ mb: 3 }}
          >
            Shelter and Placement Group Assistance
          </Typography>
          <Typography variant="body2" paragraph align="center">
            If you are a <strong>shelter</strong> or{" "}
            <strong>placement group</strong> and need assistance with your
            HappyPet account, please visit our{" "}
            <Link href="/shelter-support" sx={styles.link}>
              Shelter Support
            </Link>{" "}
            page.
          </Typography>
        </Box>

        {/* Additional Contact Information */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="600"
            align="center"
            color="primary"
            sx={{ mb: 3 }}
          >
            Additional Contact Information
          </Typography>
          <Typography variant="body2" paragraph align="center">
            For other inquiries, you can reach us at:
          </Typography>
          <Typography variant="body2" paragraph align="center">
            <strong>Email:</strong> happypetlk@gmail.com
          </Typography>
          <Typography variant="body2" paragraph align="center">
            <strong>Phone:</strong> +94 77 009 2167
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUsPage;
