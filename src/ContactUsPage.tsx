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
      const response = await axios.post("http://51.21.197.93:8080/api/contact/submit", formData);

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
          borderColor: "#003366",
        },
      },
    },
    button: {
      backgroundColor: "#003366",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "4px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#002244",
      },
    },
    accordion: {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginBottom: "8px",
    },
    link: {
      color: "#003366",
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
          mt: { xs: "80px", sm: "100px", md: "120px" }, // Increased top padding
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
          sx={{ mb: 4, color: "#003366" }} // Changed to #003366
        >
          Contact Us
        </Typography>

        {/* Note Section */}
        <Typography
          variant="body1"
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
            borderColor: "#003366", // Changed to #003366
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
            sx={{ mb: 3, color: "#003366" }} // Changed to #003366
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


        {/* Additional Contact Information */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="600"
            align="center"
            sx={{ mb: 3, color: "#003366" }} // Changed to #003366
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