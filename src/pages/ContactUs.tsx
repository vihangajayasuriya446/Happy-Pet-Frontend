import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Container,
  Paper,
} from "@mui/material";

import {
  Facebook,
  Instagram,
  LinkedIn,
  ChatBubbleOutline,
  Phone,
  Send,
} from "@mui/icons-material";

const ContactUs: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = { email, message };

    try {
      const response = await fetch("http://localhost:8080/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setEmail(""); 
        setMessage("");
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#00274D",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: "white",
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Left Side - Contact Details */}
            <Grid item xs={12} md={5} sx={{ textAlign: "left" }}>
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{ fontSize: "2rem", mb: 2 }}
              >
                Contact Us
              </Typography>

              {/* Chat With Us Section */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                mb={2}
              >
                <ChatBubbleOutline sx={{ fontSize: 20 }} />
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ fontSize: "1.2rem", ml: 1 }}
                >
                  Chat with us
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                Our friendly team is here to help
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ fontSize: "1rem", mb: 3 }}
              >
                happypet@gmail.com
              </Typography>

              {/* Call Us Section */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Phone sx={{ fontSize: 20 }} />
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ fontSize: "1.2rem", ml: 1 }}
                >
                  Call us
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                Mon-Fri from 9.00 am to 4.00 pm
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ fontSize: "1rem" }}
              >
                +94 708956128
              </Typography>

              {/* Social Media Icons */}
              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}
              >
                <IconButton href="#" sx={{ color: "black" }}>
                  <Facebook />
                </IconButton>
                <IconButton href="#" sx={{ color: "black" }}>
                  <Instagram />
                </IconButton>
                <IconButton href="#" sx={{ color: "black" }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>

            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.3rem" }, 
                    marginRight: { xs: "0px", sm: "40px", md: "100px" },
                    textAlign: { xs: "center", md: "left" }, 
                  }}
                >
                  Any comments, ideas or suggestions?
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.3rem" },
                    marginBottom: { xs: "10px", sm: "15px", md: "20px" }, 
                    marginRight: { xs: "0px", sm: "50px", md: "120px" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  We love to hear what you think of us
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" }, 
                    marginBottom: { xs: "5px", sm: "10px", md: "15px" }, 
                    marginRight: { xs: "0px", sm: "50px", md: "170px" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Tell us more about what you have got in mind.
                </Typography>

                {/* Email Input */}
                <TextField
                  fullWidth
                  placeholder="Your Email"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{ my: 2, borderBottom: "2px solid #000", pb: 1 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Message Input */}
                <TextField
                  fullWidth
                  placeholder="Tell us little about what you think of our services and site"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  multiline
                  rows={3}
                  sx={{ mb: 3, borderBottom: "2px solid #000", pb: 1 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    px: 5,
                    borderRadius: "20px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  endIcon={<Send />}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
