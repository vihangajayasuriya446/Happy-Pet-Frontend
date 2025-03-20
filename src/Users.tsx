import React, { useState, Suspense } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sidebar from './Sidebar'; 
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  Paper,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import Axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

// Lazy load components for better performance
const UserForm = React.lazy(() => import("./UserForm"));
const UserTable = React.lazy(() => import("./UserTable"));

interface User {
  id: number;
  name: string;
  type: string;
  age: string; // Age is a string
  gender: string;
  breed: string;
  location: string;
  photo?: string | File | null; // Allow string, File, or null
}

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const token = localStorage.getItem('token');

  const { data: users = [], refetch, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Axios.get("http://localhost:8080/api/v1/getusers").then((res) => res.data),
    retry: false, // Prevent automatic retries on error
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const addUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      Axios.post("http://localhost:8080/api/v1/adduser", data, {
        headers: { "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Include the token
         },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      resetForm();
      setSubmitted(true);
      setIsDrawerOpen(false);
      showSnackbar("Pet added successfully!", "success");
    },
    onError: (error) => {
      console.error("Error adding user:", error);
      showSnackbar("Error adding pet. Please try again.", "error");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      Axios.put("http://localhost:8080/api/v1/updateuser", data, {
        headers: { "Content-Type": "multipart/form-data", 
          "Authorization": `Bearer ${token}`, // Include the token
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      resetForm();
      setSubmitted(true);
      setIsDrawerOpen(false);
      showSnackbar("Pet updated successfully!", "success");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      showSnackbar("Error updating pet. Please try again.", "error");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) =>
      Axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      showSnackbar("Pet deleted successfully!", "success");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      showSnackbar("Error deleting pet. Please try again.", "error");
    },
  });

  const createFormData = (data: User) => {
    const formData = new FormData();
    formData.append("id", data.id.toString()); // Ensure ID is included
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "photo" && typeof value === "string") {
          return; // Skip appending photo if it's just a string (URL)
        }
        formData.append(key, value as string | Blob);
      }
    });
    return formData;
  };

  const addUser = (data: User) => {
    addUserMutation.mutate(createFormData(data));
  };

  const updateUser = (data: User) => {
    updateUserMutation.mutate(createFormData(data));
  };

  const deleteUser = (user: User) => {
    deleteUserMutation.mutate(user.id);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsEdit(true);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setSubmitted(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" , p: 3 }}>
      <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
       <Tooltip title="Admin Dashboard"> 
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{
                mb: 2,
                '& svg': { // Target the SVG icon inside the button
                  fontSize: '1.8rem', // Increase icon size 
                },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Tooltip> 
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
        Matchmaking Pets Management
      </Typography>


      <Box sx={{ flex: 1, padding: 2 }}>
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            Error fetching pet details. Please check your backend connection.
          </Typography>
        )}
        
        {/* Always render the search bar and add new pet button */}
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
            label="Search Pet Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: "100%", sm: "300px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(true)}
            sx={{ width: { xs: "100%", sm: "auto" },textTransform: "none", borderRadius: "8px" }}
          >
            Add New Pet
          </Button>
        </Box>

        {/* Drawer for User Form */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 400, padding: 2 }}>
            <IconButton onClick={toggleDrawer(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <Suspense fallback={<CircularProgress />}>
              <UserForm
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser || undefined}
                isEdit={isEdit}
                resetForm={resetForm}
                users={users}
              />
            </Suspense>
          </Box>
        </Drawer>

        {/* User Table */}
        <Paper elevation={3} sx={{ marginTop: "40px", width: "100%", overflowX: "auto" }}>
          <Suspense fallback={<CircularProgress />}>
            <UserTable rows={filteredUsers} selectedUser={handleSelectUser} deleteUser={deleteUser} />
          </Suspense>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;