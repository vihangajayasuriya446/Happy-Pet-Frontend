import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SelectChangeEvent,
  Divider,
  CircularProgress,
  Chip,
  Tooltip,
  Alert,
  Grid,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import PetsIcon from "@mui/icons-material/Pets";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MessageIcon from "@mui/icons-material/Message";
import React from "react";

// First, let's create the InquiryService interfaces and class
export interface PetInquiryDTO {
  petId: number;
  name: string;
  category?: string;
  breed?: string;
  inquiryDate: string;
  message?: string;
  imageUrl?: string;
  status?: string;
}

export interface UserWithInquiriesDTO {
  userId: number;
  name: string;
  email: string;
  contactNo?: string;
  address?: string;
  registrationDate?: string;
  status?: string;
  interestedPets?: PetInquiryDTO[];
}

// InquiryService class
export class InquiryService {
  static async getDashboardData(): Promise<UserWithInquiriesDTO[]> {
    try {
      const response = await axios.get(`${INQUIRY_API_URL}/admin/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }

  static async updatePetInquiryStatus(
    userId: number,
    petId: number,
    status: "NEW" | "IN_PROGRESS" | "RESOLVED"
  ): Promise<boolean> {
    try {
      const response = await axios.patch(`${INQUIRY_API_URL}/${petId}/status`, {
        userId,
        petId,
        status,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      return false;
    }
  }
}

// API endpoints
const API_BASE_URL = "http://localhost:8080/api/v1/pets";
const USER_API_URL = "http://localhost:8080/api/v1/getusers";
const DELETE_USER_URL = "http://localhost:8080/api/v1/deleteuser";
const INQUIRY_API_URL = "http://localhost:8080/api/v1/inquiries";

// Interface for user data in admin dashboard
interface UserWithInquiries {
  user_id: string | number;
  userId?: string | number;
  name: string;
  email: string;
  phone: string;
  contactNo?: string;
  address: string;
  registered_date?: string;
  registrationDate?: string;
  registeredDate?: string;
  status?: string;
  interestedPets?: PetInquiryDTO[];
  inquiredPets?: {
    pet_id: string | number;
    petId?: number;
    name?: string;
    pet_name?: string;
    category?: string;
    breed?: string;
    inquiry_date?: string;
    inquiryDate?: string;
    message?: string;
    imageUrl?: string;
    status?: string;
  }[];
}

interface PetData {
  id: string | number;
  name: string;
  petType: string;
  price: string | number;
  breed: string;
  birthYear: string;
  gender: string;
  image: File | null;
  imageUrl?: string;
}

interface AddPetFormProps {
  onSnackbarMessage?: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ onSnackbarMessage }) => {
  const [formData, setFormData] = useState<PetData>({
    id: "",
    name: "",
    petType: "",
    price: "",
    breed: "",
    birthYear: "",
    gender: "",
    image: null,
  });

  const [pets, setPets] = useState<PetData[]>([]);
  const [users, setUsers] = useState<UserWithInquiries[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch pets and users on component mount
  useEffect(() => {
    fetchPets();
    fetchUsers();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setPets(response.data);
    } catch (err) {
      console.error("Error fetching pets:", err);
      showSnackbar("Error fetching pets", "error");
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use the actual InquiryService to fetch dashboard data
      try {
        const dashboardData = await InquiryService.getDashboardData();
        if (dashboardData && Array.isArray(dashboardData)) {
          console.log("Dashboard data received:", dashboardData);
          // Transform the dashboard data to match our component's expected format
          const transformedData = dashboardData.map(
            (user: UserWithInquiriesDTO) => ({
              user_id: user.userId,
              userId: user.userId,
              name: user.name || "N/A",
              email: user.email || "N/A",
              phone: user.contactNo || "N/A",
              contactNo: user.contactNo,
              address: user.address || "N/A",
              registrationDate: user.registrationDate,
              status: user.status,
              interestedPets: user.interestedPets,
              inquiredPets: user.interestedPets?.map((pet) => ({
                pet_id: pet.petId,
                petId: pet.petId,
                name: pet.name,
                pet_name: pet.name,
                category: pet.category,
                breed: pet.breed,
                inquiry_date: pet.inquiryDate,
                inquiryDate: pet.inquiryDate,
                message: pet.message,
                imageUrl: pet.imageUrl,
                status: pet.status,
              })),
            })
          );
          setUsers(transformedData);
          return;
        }
      } catch (err) {
        console.warn(
          "Could not fetch from dashboard endpoint, falling back to regular endpoint",
          err
        );
      }

      // Fallback to regular users endpoint
      const response = await axios.get(USER_API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshAll = () => {
    setRefreshing(true);
    Promise.all([fetchPets(), fetchUsers()])
      .then(() => {
        showSnackbar("Data refreshed successfully", "success");
      })
      .catch((err) => {
        console.error("Error refreshing data:", err);
        showSnackbar("Error refreshing data", "error");
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    if (onSnackbarMessage) {
      onSnackbarMessage(message, severity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("petType", formData.petType);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("breed", formData.breed);
      formDataToSend.append("birthYear", formData.birthYear);
      formDataToSend.append("gender", formData.gender);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (editMode && editIndex !== null) {
        // Update existing pet
        await axios.put(`${API_BASE_URL}/${formData.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showSnackbar("Pet updated successfully", "success");
      } else {
        // Add new pet
        await axios.post(API_BASE_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showSnackbar("Pet added successfully", "success");
      }

      // Refresh pets list
      fetchPets();

      // Reset form
      resetForm();
    } catch (err) {
      console.error("Error saving pet:", err);
      showSnackbar("Error saving pet", "error");
    }
  };

  const handleUpdate = async (index: number) => {
    const petToEdit = pets[index];
    setFormData({
      ...petToEdit,
      image: null,
    });
    setPreviewUrl(petToEdit.imageUrl || "");
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      showSnackbar("Pet deleted successfully", "success");
      fetchPets();
    } catch (err) {
      console.error("Error deleting pet:", err);
      showSnackbar("Error deleting pet", "error");
    }
  };

  const handleUserEdit = (user: UserWithInquiries) => {
    // This would typically open a modal or navigate to edit user page
    console.log("Edit user:", user);
    showSnackbar(
      "User edit functionality not implemented in this view",
      "info"
    );
  };

  const handleUserDelete = async (user: UserWithInquiries) => {
    try {
      await axios.delete(`${INQUIRY_API_URL}/${user.user_id}`);
      showSnackbar("User deleted successfully", "success");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      showSnackbar("Error deleting user", "error");
    }
  };

  // Handle status change for inquiries
  const handleStatusChange = async (
    userId: string | number,
    petId: string | number,
    newStatus: "NEW" | "IN_PROGRESS" | "RESOLVED"
  ) => {
    try {
      const success = await InquiryService.updatePetInquiryStatus(
        Number(userId),
        Number(petId),
        newStatus
      );

      if (success) {
        const updatedUsers = users.map((user) => {
          if (
            user.user_id?.toString() === userId.toString() ||
            user.userId?.toString() === userId.toString()
          ) {
            // Helper function to update pet status
            const updatePetStatus = (pet: any) => {
              if (
                pet.petId?.toString() === petId.toString() ||
                pet.pet_id?.toString() === petId.toString()
              ) {
                return { ...pet, status: newStatus };
              }
              return pet;
            };

            return {
              ...user,
              interestedPets: user.interestedPets?.map(updatePetStatus),
              inquiredPets: user.inquiredPets?.map(updatePetStatus),
            };
          }
          return user;
        });

        setUsers(updatedUsers);
        showSnackbar(`Status updated to ${newStatus}`, "success");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showSnackbar("Failed to update status", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      petType: "",
      price: "",
      breed: "",
      birthYear: "",
      gender: "",
      image: null,
    });
    setPreviewUrl("");
    setEditMode(false);
    setEditIndex(null);
  };

  const formatPrice = (price: string | number) => {
    if (!price) return "LKR 0/=";
    return `LKR ${price}/=`;
  };

  // Helper function to safely format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#003366",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#003366",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#003366",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#003366",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#003366",
    },
  };

  // Theme color for user table
  const themeColor = "#002855";

  // Get pet name by ID (for displaying in inquiry details)
  const getPetNameById = (petId: string | number): string => {
    const pet = pets.find((p) => p.id.toString() === petId.toString());
    return pet ? pet.name : `Pet #${petId}`;
  };

  // Get status color based on status string
  const getStatusColor = (status: string = ""): string => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
      case "new":
        return "#4caf50";
      case "pending":
      case "in_progress":
        return "#ff9800";
      case "inactive":
      case "resolved":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  // Format status text for display
  const formatStatusText = (status: string = ""): string => {
    if (!status) return "New";

    switch (status.toUpperCase()) {
      case "NEW":
        return "New";
      case "IN_PROGRESS":
        return "In Progress";
      case "RESOLVED":
        return "Resolved";
      default:
        return status;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        margin: "-30px auto 20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={
            refreshing ? <CircularProgress size={20} /> : <RefreshIcon />
          }
          onClick={handleRefreshAll}
          disabled={refreshing}
          sx={{
            borderColor: themeColor,
            color: themeColor,
            "&:hover": {
              borderColor: "#001c3d",
              backgroundColor: "rgba(0, 40, 85, 0.04)",
            },
          }}
        >
          {refreshing ? "Refreshing..." : "Refresh All Data"}
        </Button>
      </Box>

      {/* Enhanced Card with better styling */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Form Heading */}
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#003366",
              mb: 3,
            }}
          >
            {editMode ? "Update Pet" : "Add A New Pet"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* Pet Name Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Pet Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={inputStyle}
            />

            {/* Pet Type Select */}
            <FormControl fullWidth margin="normal" required sx={inputStyle}>
              <InputLabel>Pet Type</InputLabel>
              <Select
                value={formData.petType}
                label="Pet Type"
                name="petType"
                onChange={handleSelectChange}
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Cat">Bird</MenuItem>
              </Select>
            </FormControl>

            {/* Price Field*/}
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              helperText="Will be displayed as LKR [amount]/="
              sx={inputStyle}
            />

            {/* Breed Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              sx={inputStyle}
            />

            {/* Birth Year Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Birth Year"
              name="birthYear"
              type="number"
              value={formData.birthYear}
              onChange={handleChange}
              required
              sx={inputStyle}
            />

            {/* Gender Select */}
            <FormControl fullWidth margin="normal" required sx={inputStyle}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender}
                label="Gender"
                name="gender"
                onChange={handleSelectChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            {/* Image Upload with Preview */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<ImageIcon />}
                  sx={{
                    borderColor: "#003366",
                    color: "#003366",
                    padding: "10px 0",
                    "&:hover": {
                      borderColor: "#002244",
                      backgroundColor: "rgba(0, 51, 102, 0.04)",
                    },
                    "&:focus": {
                      borderColor: "#003366",
                      boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.2)",
                    },
                  }}
                >
                  {previewUrl ? "Change Pet Image" : "Upload Pet Image"}
                </Button>
              </label>
              {previewUrl && (
                <Box
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Form Buttons */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#003366",
                  "&:hover": {
                    backgroundColor: "#002244",
                  },
                  "&:focus": {
                    boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.3)",
                  },
                  minWidth: "120px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                {editMode ? "Update Pet" : "Add Pet"}
              </Button>
              {editMode && (
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  sx={{
                    borderColor: "#003366",
                    color: "#003366",
                    "&:hover": {
                      borderColor: "#002244",
                      backgroundColor: "rgba(0, 51, 102, 0.04)",
                    },
                    "&:focus": {
                      borderColor: "#003366",
                      boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.2)",
                    },
                    minWidth: "120px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Section Title for Pets Table */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          width: "100%",
          mt: 4,
          mb: 2,
          color: "#003366",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Pets Inventory
      </Typography>

      {/* Enhanced Pets Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003366" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Pet Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Pet Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Breed
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Birth Year
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Gender
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <TableRow
                  key={pet.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#f0f7ff" },
                  }}
                >
                  <TableCell>{pet.id}</TableCell>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.petType}</TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {formatPrice(pet.price)}
                  </TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>{pet.birthYear}</TableCell>
                  <TableCell>{pet.gender}</TableCell>
                  <TableCell>
                    {pet.imageUrl && (
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#003366",
                          "&:hover": {
                            backgroundColor: "#002244",
                          },
                          "&:focus": {
                            boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.3)",
                          },
                          borderRadius: "6px",
                        }}
                        onClick={() => handleUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#DC3545",
                          "&:hover": {
                            backgroundColor: "#BB2D3B",
                          },
                          "&:focus": {
                            boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.3)",
                          },
                          borderRadius: "6px",
                        }}
                        onClick={() => handleDelete(pet.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No pets found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Section Title for Users Table */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          width: "100%",
          mt: 4,
          mb: 2,
          color: themeColor,
          fontWeight: "bold",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Registered Users & Pet Inquiries
        <Chip
          label={`${users.length} users`}
          size="small"
          sx={{
            bgcolor: themeColor,
            color: "white",
            fontWeight: "medium",
          }}
        />
      </Typography>

      {/* Users Table with Pet Inquiry Information */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", boxShadow: 3, width: "100%" }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography color="error">{error}</Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: themeColor,
                "&:hover": {
                  bgcolor: "#001c3d",
                },
              }}
              onClick={() => fetchUsers()}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Phone
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Registered Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Inquired Pets
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user.user_id || user.userId}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell>{user.user_id || user.userId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.phone || user.contactNo || "N/A"}
                    </TableCell>

                    <TableCell>
                      <Tooltip title={user.address || "N/A"}>
                        <Typography
                          sx={{
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.address || "N/A"}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {formatDate(
                        user.registered_date ||
                          user.registrationDate ||
                          user.registeredDate
                      )}
                    </TableCell>
                    <TableCell>
                      {user.status ? (
                        <Chip
                          label={formatStatusText(user.status)}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(user.status),
                            color: "white",
                            fontWeight: "medium",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {(user.interestedPets || user.inquiredPets) && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {Array.from(
                            new Map(
                              [
                                ...(user.interestedPets || []).map((pet) => ({
                                  key: pet.petId,
                                  pet: { ...pet, source: "interested" },
                                })),
                                ...(user.inquiredPets || []).map((pet) => ({
                                  key: pet.petId || pet.pet_id,
                                  pet: { ...pet, source: "inquired" },
                                })),
                              ].map((item) => [item.key, item.pet])
                            ).values()
                          ).map((pet, idx) => (
                            <Box
                              key={`pet-${idx}`}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Tooltip
                                title={
                                  <React.Fragment>
                                    <Typography variant="body2">
                                      <strong>Inquiry Date:</strong>{" "}
                                      {formatDate(
                                        pet.inquiryDate || pet.inquiry_date
                                      )}
                                    </Typography>
                                    {pet.message && (
                                      <Typography variant="body2">
                                        <strong>Message:</strong> {pet.message}
                                      </Typography>
                                    )}
                                    {pet.breed && (
                                      <Typography variant="body2">
                                        <strong>Breed:</strong> {pet.breed}
                                      </Typography>
                                    )}
                                  </React.Fragment>
                                }
                                arrow
                              >
                                <Chip
                                  icon={<PetsIcon fontSize="small" />}
                                  label={`${pet.name || pet.pet_name} (ID: ${
                                    pet.petId || pet.pet_id
                                  })`}
                                  size="small"
                                  sx={{
                                    bgcolor: "#e3f2fd",
                                    border: "1px solid #90caf9",
                                    "& .MuiChip-label": {
                                      px: 1,
                                      fontSize: "0.75rem",
                                    },
                                  }}
                                />
                              </Tooltip>

                              {/* Status dropdown */}
                              <FormControl
                                size="small"
                                variant="outlined"
                                sx={{ minWidth: 120 }}
                              >
                                <Select
                                  value={pet.status || "NEW"}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      user.user_id || user.userId || 0,
                                      pet.petId || pet.pet_id || 0,
                                      e.target.value as
                                        | "NEW"
                                        | "IN_PROGRESS"
                                        | "RESOLVED"
                                    )
                                  }
                                  sx={{
                                    height: 32,
                                    bgcolor: getStatusColor(
                                      pet.status || "NEW"
                                    ),
                                    color: "white",
                                    "& .MuiSelect-icon": { color: "white" },
                                    "&:hover": {
                                      bgcolor: `${getStatusColor(
                                        pet.status || "NEW"
                                      )}dd`,
                                    },
                                  }}
                                >
                                  <MenuItem
                                    value="NEW"
                                    sx={{ color: getStatusColor("NEW") }}
                                  >
                                    <Typography variant="body2">New</Typography>
                                  </MenuItem>
                                  <MenuItem
                                    value="IN_PROGRESS"
                                    sx={{
                                      color: getStatusColor("IN_PROGRESS"),
                                    }}
                                  >
                                    <Typography variant="body2">
                                      In Progress
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    value="RESOLVED"
                                    sx={{ color: getStatusColor("RESOLVED") }}
                                  >
                                    <Typography variant="body2">
                                      Resolved
                                    </Typography>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {/* <Button
                          variant="contained"
                          size="small"
                          sx={{
                            textTransform: "none",
                            borderRadius: "4px",
                            bgcolor: themeColor,
                            "&:hover": {
                              bgcolor: "#001c3d",
                            },
                          }}
                          onClick={() => handleUserEdit(user)}
                        >
                          Edit
                        </Button> */}
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{ textTransform: "none", borderRadius: "4px" }}
                          onClick={() => handleUserDelete(user)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No users found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Additional information section */}
      {users.length > 0 && (
        <Box sx={{ width: "100%", mt: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Tip:</strong> Hover over pet chips to see inquiry details.
              Click on status chips to change inquiry status.
            </Typography>
          </Alert>

          <Paper sx={{ p: 2, borderRadius: "8px" }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: themeColor,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
              Summary of Inquiries
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f9f9f9",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: themeColor, fontWeight: "bold" }}
                  >
                    {users.length}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f9f9f9",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total Pet Inquiries
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: themeColor, fontWeight: "bold" }}
                  >
                    {users.reduce((total, user) => {
                      const interestedCount = user.interestedPets?.length || 0;
                      const inquiredCount = user.inquiredPets?.length || 0;
                      return total + interestedCount + inquiredCount;
                    }, 0)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f9f9f9",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Most Popular Pet Type
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: themeColor, fontWeight: "bold" }}
                  >
                    {(() => {
                      const petTypes: Record<string, number> = {};

                      // Count from interestedPets
                      users.forEach((user) => {
                        user.interestedPets?.forEach((pet: PetInquiryDTO) => {
                          const type = pet.category || "Unknown";
                          petTypes[type] = (petTypes[type] || 0) + 1;
                        });
                      });

                      // Count from inquiredPets
                      users.forEach((user) => {
                        user.inquiredPets?.forEach(
                          (pet: {
                            pet_id?: string | number;
                            petId?: number;
                            category?: string;
                            name?: string;
                            pet_name?: string;
                          }) => {
                            const type = pet.category || "Unknown";
                            petTypes[type] = (petTypes[type] || 0) + 1;
                          }
                        );
                      });

                      // Find the most popular type
                      let mostPopular = "None";
                      let highestCount = 0;

                      Object.entries(petTypes).forEach(([type, count]) => {
                        if (count > highestCount) {
                          mostPopular = type;
                          highestCount = count;
                        }
                      });

                      return mostPopular !== "None" ? mostPopular : "No data";
                    })()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Message for when no users are found */}
      {!isLoading && !error && users.length === 0 && (
        <Paper
          sx={{ p: 3, width: "100%", textAlign: "center", borderRadius: "8px" }}
        >
          <MessageIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No User Inquiries Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When users submit inquiries about pets, they will appear here.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefreshAll}
            sx={{
              borderColor: themeColor,
              color: themeColor,
              "&:hover": {
                borderColor: "#001c3d",
                backgroundColor: "rgba(0, 40, 85, 0.04)",
              },
            }}
          >
            Refresh Data
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default AddPetForm;
