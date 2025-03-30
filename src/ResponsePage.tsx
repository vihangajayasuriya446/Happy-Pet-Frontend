import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
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
  IconButton,
  Tooltip,
  List,
  ListItem,
  Divider,
  ListItemText,
  DialogContentText,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";
import axios from "axios";
import { 
  Delete, 
  Search, 
  KeyboardArrowRight,
  FiberNew
} from "@mui/icons-material";
import Sidebar from './Sidebar';

interface ContactFormResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const ResponsesPage: React.FC = () => {
  const [responses, setResponses] = useState<ContactFormResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<ContactFormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ContactFormResponse | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contact/responses");
        const sortedResponses = response.data.sort((a: ContactFormResponse, b: ContactFormResponse) => b.id - a.id);
        setResponses(sortedResponses);
        setFilteredResponses(sortedResponses);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch responses. Please try again.");
        setLoading(false);
        console.error("Error fetching responses:", err);
      }
    };

    fetchResponses();
  }, []);

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

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedResponseId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedResponseId !== null) {
      try {
        await axios.delete(`http://localhost:8080/api/contact/delete/${selectedResponseId}`);
        setResponses(responses.filter((response) => response.id !== selectedResponseId));
        setFilteredResponses(filteredResponses.filter((response) => response.id !== selectedResponseId));
        showSnackbar("Response deleted successfully!", "success");
      } catch (err) {
        showSnackbar("Failed to delete response. Please try again.", "error");
        console.error("Error deleting response:", err);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleResponseClick = async (response: ContactFormResponse) => {
    try {
      // If status is "New", update it to "Opened"
      if (response.status === "New") {
        // Create full response object with updated status
        const updatedResponse = {
          id: response.id,
          name: response.name,
          email: response.email,
          subject: response.subject,
          message: response.message,
          status: "Opened",
          createdAt: response.createdAt
        };
        
        const result = await axios.put(
          `http://localhost:8080/api/contact/update-status/${response.id}`,
          updatedResponse
        );
        
        // Update the response in state
        setResponses(responses.map(r => 
          r.id === response.id ? result.data : r
        ));
        
        setSelectedResponse(result.data);
      } else {
        setSelectedResponse(response);
      }
      
      setDetailDialogOpen(true);
    } catch (err) {
      showSnackbar("Failed to update response status.", "error");
      console.error("Error updating response status:", err);
      if (axios.isAxiosError(err)) {
        console.error("Error response:", err.response?.data);
      }
      setSelectedResponse(response);
      setDetailDialogOpen(true);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <Box sx={{ 
        flexGrow: 1, 
        p: 3, 
        ml: isSidebarOpen ? '240px' : 0, 
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }) 
      }}>
        <Tooltip title="Admin Dashboard">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              position: "fixed",
              left: isSidebarOpen ? 240 : 16,
              top: 16,
              zIndex: 1300,
              backgroundColor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              },
            }}
          >
            <KeyboardArrowRight sx={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'none' }} />
          </IconButton>
        </Tooltip>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="h4" component="h1" fontWeight="700" color="text.primary">
                Contact Responses
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search responses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
                  sx: { borderRadius: 4 }
                }}
                sx={{ width: isMobile ? '100%' : '350px' }}
              />
            </Stack>
          </Paper>

          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          )}

          {error && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
                {error}
              </Alert>
            </Box>
          )}

          {!loading && !error && (
            <Paper sx={{ borderRadius: 4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {filteredResponses.map((response, index) => (
                  <React.Fragment key={response.id}>
                    <ListItem 
                      alignItems="flex-start" 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => handleResponseClick(response)}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {response.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1" fontWeight="600">
                              {response.subject}
                            </Typography>
                            {response.status === 'New' && (
                              <Chip 
                                icon={<FiberNew />}
                                label="New"
                                color="primary"
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Stack>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.primary', display: 'block' }}
                            >
                              {response.name} • {response.email}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mt: 0.5
                              }}
                            >
                              {response.message}
                            </Typography>
                            
                          </React.Fragment>
                        }
                      />
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={(e) => handleDeleteClick(response.id, e)}
                        sx={{ ml: 2 }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                    {index < filteredResponses.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Response Detail Dialog */}
      <Dialog 
        open={detailDialogOpen} 
        onClose={handleCloseDetailDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selectedResponse && (
          <>
            <DialogTitle sx={{ 
              backgroundColor: 'primary.main', 
              color: 'primary.contrastText',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4
            }}>
              <Typography variant="h6" fontWeight="600">
                {selectedResponse.subject}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {selectedResponse.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Stack>
                    <Typography variant="subtitle1" fontWeight="600">
                      {selectedResponse.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedResponse.email}
                    </Typography>
                  </Stack>
                </Stack>

                

                <Box>
                  <Typography variant="body1" fontWeight="500" gutterBottom>
                    Message:
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      backgroundColor: 'background.default',
                      whiteSpace: 'pre-wrap',
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}
                  >
                    {selectedResponse.message}
                  </Paper>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button 
                onClick={handleCloseDetailDialog} 
                variant="contained"
                sx={{ borderRadius: 3 }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteDialogClose}
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this response? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleDeleteDialogClose} 
            sx={{ borderRadius: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            sx={{ borderRadius: 3 }}
          >
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
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ 
            borderRadius: 4,
            boxShadow: 4,
            width: '100%'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResponsesPage;