import React, { useEffect, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Paper,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { 
  Delete, 
  Search, 
  KeyboardArrowRight,
 
  Refresh
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  

  const fetchResponses = async () => {
    try {
      const response = await axios.get("http://51.21.197.93:8080/api/contact/responses");
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

  useEffect(() => {
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchResponses();
      showSnackbar("Responses refreshed successfully!", "success");
    } catch (err) {
      showSnackbar("Failed to refresh responses", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedResponseId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedResponseId !== null) {
      try {
        await axios.delete(`http://51.21.197.93:8080/api/contact/delete/${selectedResponseId}`);
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
      if (response.status === "New") {
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
          `http://51.21.197.93:8080/api/contact/update-status/${response.id}`,
          updatedResponse
        );
        
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

  return (
    <Box
      sx={{
        py: 1,
        paddingTop: "5px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          margin: "80px auto 20px",
          position: "relative",
          bgcolor: "rgba(255, 255, 255, 0.7)"
        }}
      >
        {/* Sidebar */}
        <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3, position: "relative", marginLeft: isSidebarOpen ? "240px" : 0 }}>
          <Tooltip title="Admin Dashboard">
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{
                position: "fixed",
                left: isSidebarOpen ? 240 : 16,
                top: 90,
                zIndex: 1300,
                backgroundColor: 'background.paper,0.8',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                },
              }}
            >
              <KeyboardArrowRight sx={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'none', color: "black" }} />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#003366",
              p: 2,
              borderRadius: "8px",
              mb: 3,
              textAlign: "center",
              width: "98%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontFamily: "'Nunito', sans-serif",
            }}
          ><PetsIcon sx={{ fontSize: 32 }} />
            Contact Messages
          </Typography>

          {/* Content */}
          <Box sx={{ flex: 1, padding: 2 }}>
            {loading && <CircularProgress />}
            {error && (
              <Typography color="error" sx={{ textAlign: "center" }}>
                {error}
              </Typography>
            )}

            {/* Search Bar and Refresh Button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <TextField
                label="Search Messages"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: { xs: "100%", sm: "300px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
  variant="contained"
  sx={{
    backgroundColor: '#003366',
    '&:hover': {
      backgroundColor: '#002855', // Slightly darker shade for hover
    },
    borderRadius: "8px",
    minWidth: "40px",
    width: "40px",
    height: "40px",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& .MuiButton-startIcon': {
      margin: 0,
    }
  }}
  onClick={handleRefresh}
  disabled={isRefreshing}
  startIcon={isRefreshing ? <CircularProgress size={20} /> : <Refresh />}
/>
            </Box>

            {!loading && !error && (
              <Paper elevation={3} sx={{ marginTop: "40px", width: "100%", overflowX: "auto" }}>
                {filteredResponses.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="body1">No messages found</Typography>
                  </Box>
                ) : (
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
                                <Typography 
                                  variant="subtitle1" 
                                  fontWeight={response.status === 'New' ? "600" : "400"}
                                  sx={{
                                    fontFamily: response.status === 'New' ? "'Nunito', sans-serif" : "inherit",
                                    color: response.status === 'New' ? 'text.primary' : 'text.secondary'
                                  }}
                                >
                                  {response.subject}
                                </Typography>
                                {response.status === 'New' && (
                                  <Chip 
                                    
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
                                  sx={{ 
                                    color: 'text.primary', 
                                    display: 'block',
                                    fontWeight: response.status === 'New' ? "600" : "400"
                                  }}
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
                                    mt: 0.5,
                                    fontWeight: response.status === 'New' ? "600" : "400"
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
                )}
              </Paper>
            )}
          </Box>
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
              Are you sure you want to delete this message? This action cannot be undone.
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
    </Box>
  );
};

export default ResponsesPage;