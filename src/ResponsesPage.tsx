import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Delete, Search } from "@mui/icons-material";

interface ContactFormResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ResponsesPage: React.FC = () => {
  // State for storing responses
  const [responses, setResponses] = useState<ContactFormResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<ContactFormResponse[]>([]);

  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for Snackbar (success/error messages)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState<number | null>(null);

  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all responses from the backend
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contact/responses");
        console.log("Fetched responses:", response.data); // Debugging line
        setResponses(response.data);
        setFilteredResponses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch responses. Please try again.");
        setLoading(false);
        console.error("Error fetching responses:", err);
      }
    };

    fetchResponses();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = responses.filter(
      (response) =>
        response.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResponses(filtered);
  }, [searchQuery, responses]);

  // Handle delete confirmation dialog open
  const handleDeleteClick = (id: number) => {
    setSelectedResponseId(id);
    setDeleteDialogOpen(true);
  };

  // Handle delete response
  const handleDeleteConfirm = async () => {
    if (selectedResponseId !== null) {
      try {
        await axios.delete(`http://localhost:8080/api/contact/delete/${selectedResponseId}`);
        setResponses(responses.filter((response) => response.id !== selectedResponseId));
        setFilteredResponses(filteredResponses.filter((response) => response.id !== selectedResponseId));
        setSnackbarMessage("Response deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (err) {
        setSnackbarMessage("Failed to delete response. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error deleting response:", err);
      }
    }
    setDeleteDialogOpen(false);
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Close delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  // Responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600" align="center">
          Contact Us Responses
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
          <TextField
            variant="outlined"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
            }}
            sx={{ width: isMobile ? "100%" : "300px" }}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {/* Responses Table */}
        {!loading && !error && (
          <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
                  <TableCell sx={{ color: "white" }}>Subject</TableCell>
                  <TableCell sx={{ color: "white" }}>Message</TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResponses.map((response) => (
                  <TableRow key={response.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>{response.name}</TableCell>
                    <TableCell>{response.email}</TableCell>
                    <TableCell>{response.subject}</TableCell>
                    <TableCell>{response.message}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteClick(response.id)}
                        sx={{ borderRadius: 2 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Response</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this response?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default ResponsesPage;