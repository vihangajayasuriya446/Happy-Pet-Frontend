import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const ContactUsPage: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "New", // Added status field with default value
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State for Snackbar (success/error messages)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors when the user starts typing
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  // Handle status change (for admin use)
  const handleStatusChange = (e: any) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      setSnackbarMessage("Please fix the errors in the form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:8080/api/contact/submit", formData);

      // Show success message
      setSnackbarMessage("Message sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Clear the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        status: "New", // Reset status to default
      });
    } catch (error) {
      // Show error message
      setSnackbarMessage("Failed to send message. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error submitting form:", error);
    }
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
    statusSelect: {
      minWidth: 120,
      marginBottom: 2,
      display: "none", // Hidden by default, can be shown for admin users
    },
  };

  return (
    <Box>
      {/* Main Content Container */}
      <Container
        maxWidth="md"
        sx={{
          py: 8,
          px: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          mt: { xs: "64px", sm: "72px", md: "80px" },
          border: "1px solid rgba(255, 255, 255, 0.3)",
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
          sx={{ mb: 4, textAlign: "center", color: "black" }}
        >
          <strong>Note:</strong> Have questions, need assistance, or want to know more about adopting a pet?
          The Happy Pet team is here to help! Reach out to us, and let's make a difference—one paw at a time!
        </Typography>

        {/* Contact Form Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderTop: "3px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Status Select (hidden by default, can be shown for admin users) */}
              <Grid item xs={12}>
                <FormControl sx={styles.statusSelect}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  size="small"
                  sx={styles.formInput}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  size="small"
                  sx={styles.formInput}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  size="small"
                  sx={styles.formInput}
                  error={!!formErrors.subject}
                  helperText={formErrors.subject}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                  size="small"
                  sx={styles.formInput}
                  error={!!formErrors.message}
                  helperText={formErrors.message}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained" sx={styles.button}>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
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

          {/* FAQ 1: How do I adopt a pet on HappyPet? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I adopt a pet on HappyPet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                To adopt a pet, visit the Adopt page on HappyPet, browse the available pets, and follow the adoption process.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 2: Can I purchase a pet on HappyPet? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">Can I purchase a pet on HappyPet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes, HappyPet allows you to purchase pets from verified pet owners and organizations. You can filter pets by various preferences.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 3: What is the Smart Pet Matchmaking System? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">What is the Pet Matchmaking System?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                The Pet Matchmaking System helps you find the perfect pet breed on your preferences, You can filter pets by breed, age, size, and other preferences.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 4: How do I update my account information? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I update my account information?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                You can update your account information by logging into your HappyPet account.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 5: Can I return a pet after adoption? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">Can I return a pet after adoption?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Each shelter has its own return policy. Please contact the shelter directly for more information.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 6: How does HappyPet support stray animal welfare? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How does HappyPet support stray animal welfare?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                HappyPet collaborates with animal welfare organizations to ensure stray animals receive proper care. You can also contribute to these initiatives through the platform.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 7: Is HappyPet available on mobile devices? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">Is HappyPet available on mobile devices?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes, HappyPet is optimized for both mobile and desktop users, providing a seamless experience across devices.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 8: How do I contact a shelter or breeder? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">How do I contact a shelter or breeder?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Each pet listing includes contact information for the shelter or breeder. You can reach out to them directly through the platform.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 9: What should I do if I encounter an issue with the platform? */}
          <Accordion sx={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">What should I do if I encounter an issue with the platform?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                If you encounter any issues, please visit our support page or contact our customer service team for assistance.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
            <strong>Email:</strong> happypetlk.com@gmail.com
          </Typography>
          <Typography variant="body2" paragraph align="center">
            <strong>Phone:</strong> +94 77 009 2167
          </Typography>
        </Box>
      </Container>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUsPage;