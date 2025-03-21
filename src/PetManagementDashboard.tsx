import { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Chip,
    Tooltip,
    SelectChangeEvent,
    TextField,
    InputAdornment,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import RefreshIcon from "@mui/icons-material/Refresh";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import AddPetForm, { PetData } from "./AddPetForm";

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

// API endpoints
const API_BASE_URL = "http://localhost:8080/api/v1/pets";
const USER_API_URL = "http://localhost:8080/api/v1/getusers";
const INQUIRY_API_URL = "http://localhost:8080/api/v1/inquiries";

// InquiryService class
export class InquiryService {
    static async getDashboardData(): Promise<UserWithInquiriesDTO[]> {
        try {
            const response = await axios.get(`${INQUIRY_API_URL}/admin/dashboard`);
            return response.data as UserWithInquiriesDTO[];
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

// Interface for pet inquiry with combined properties
interface PetInquiry {
    pet_id?: string | number;
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
    source?: string;
}

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
    inquiredPets?: PetInquiry[];
}

interface PetManagementDashboardProps {
    onSnackbarMessage?: (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => void;
}

const PetManagementDashboard: React.FC<PetManagementDashboardProps> = ({ onSnackbarMessage }) => {
    const [pets, setPets] = useState<PetData[]>([]);
    const [filteredPets, setFilteredPets] = useState<PetData[]>([]);
    const [users, setUsers] = useState<UserWithInquiries[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserWithInquiries[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editPet, setEditPet] = useState<PetData | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Fetch pets and users on component mount
    useEffect(() => {
        fetchPets();
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Filter pets and users based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredPets(pets);
            setFilteredUsers(users);
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();

            // Filter pets by name
            const filteredPetsData = pets.filter(pet =>
                pet.name.toLowerCase().includes(lowerSearchTerm)
            );
            setFilteredPets(filteredPetsData);

            // Filter users who have inquired about the filtered pets
            const filteredPetIds = filteredPetsData.map(pet => pet.id.toString());

            const filteredUsersData = users.filter(user => {
                // Check if user has inquired about any of the filtered pets
                const hasInquiredFilteredPet = user.inquiredPets?.some(pet =>
                    filteredPetIds.includes((pet.petId || pet.pet_id || "").toString())
                ) || user.interestedPets?.some(pet =>
                    filteredPetIds.includes(pet.petId.toString())
                );

                return hasInquiredFilteredPet;
            });

            setFilteredUsers(filteredUsersData);
        }
    }, [searchTerm, pets, users]);

    const fetchPets = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            const petsData = response.data as PetData[];
            setPets(petsData);
            setFilteredPets(petsData); // Initialize filtered pets with all pets
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
                    const transformedData: UserWithInquiries[] = dashboardData.map(
                        (user: UserWithInquiriesDTO): UserWithInquiries => ({
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
                            inquiredPets: user.interestedPets?.map((pet): PetInquiry => ({
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
                    setFilteredUsers(transformedData);
                    setIsLoading(false);
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
            const userData = response.data as UserWithInquiries[];
            setUsers(userData);
            setFilteredUsers(userData);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users. Please try again.");
            setIsLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRefreshAll = () => {
        setIsRefreshing(true);
        Promise.all([fetchPets(), fetchUsers()])
            .then(() => {
                showSnackbar("Data refreshed successfully", "success");
            })
            .catch((err) => {
                console.error("Error refreshing data:", err);
                showSnackbar("Error refreshing data", "error");
            })
            .finally(() => {
                setIsRefreshing(false);
            });
    };

    const showSnackbar = (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => {
        if (onSnackbarMessage) {
            onSnackbarMessage(message, severity);
        }
    };

    const handleUpdate = (index: number) => {
        const petToEdit = pets[index];
        setEditPet({
            ...petToEdit,
            image: null,
        });
        setDrawerOpen(true);
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
                // Create a new array with updated users to avoid type issues
                const updatedUsers: UserWithInquiries[] = users.map((user) => {
                    if (
                        user.user_id?.toString() === userId.toString() ||
                        user.userId?.toString() === userId.toString()
                    ) {
                        // Helper function to update pet status for both pet types
                        const updatePetStatusInquiry = (pet: PetInquiry): PetInquiry => {
                            if (
                                pet.petId?.toString() === petId.toString() ||
                                pet.pet_id?.toString() === petId.toString()
                            ) {
                                return { ...pet, status: newStatus };
                            }
                            return pet;
                        };

                        const updatePetStatusDTO = (pet: PetInquiryDTO): PetInquiryDTO => {
                            if (pet.petId.toString() === petId.toString()) {
                                return { ...pet, status: newStatus };
                            }
                            return pet;
                        };

                        return {
                            ...user,
                            interestedPets: user.interestedPets?.map(updatePetStatusDTO),
                            inquiredPets: user.inquiredPets?.map(updatePetStatusInquiry),
                        };
                    }
                    return user;
                });

                setUsers(updatedUsers);
                // Update filtered users as well
                if (searchTerm.trim() === "") {
                    setFilteredUsers(updatedUsers);
                } else {
                    // Re-apply the filter
                    const lowerSearchTerm = searchTerm.toLowerCase();
                    const filteredPetsData = pets.filter(pet =>
                        pet.name.toLowerCase().includes(lowerSearchTerm)
                    );
                    const filteredPetIds = filteredPetsData.map(pet => pet.id.toString());

                    const filteredUsersData = updatedUsers.filter(user => {
                        const hasInquiredFilteredPet = user.inquiredPets?.some(pet =>
                            filteredPetIds.includes((pet.petId || pet.pet_id || "").toString())
                        ) || user.interestedPets?.some(pet =>
                            filteredPetIds.includes(pet.petId.toString())
                        );

                        return hasInquiredFilteredPet;
                    });

                    setFilteredUsers(filteredUsersData);
                }

                showSnackbar(`Status updated to ${newStatus}`, "success");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            showSnackbar("Failed to update status", "error");
        }
    };

    const handleAddNewClick = () => {
        setEditPet(null);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setEditPet(null);
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

    // Theme color for user table
    const themeColor = "#002855";

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

    // Type guard to determine if a pet has inquiryDate or inquiry_date
    const getInquiryDate = (pet: PetInquiry | PetInquiryDTO): string | undefined => {
        return (pet as PetInquiry).inquiryDate || (pet as PetInquiry).inquiry_date;
    };

    // Type guard to determine if a pet has name or pet_name
    const getPetName = (pet: PetInquiry | PetInquiryDTO): string => {
        return (pet as PetInquiry).name || (pet as PetInquiry).pet_name || "Unknown";
    };

    // Type guard to determine if a pet has petId or pet_id
    const getPetId = (pet: PetInquiry | PetInquiryDTO): string | number => {
        return (pet as PetInquiry).petId || (pet as PetInquiry).pet_id || 0;
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
                position: "relative",
            }}
        >
            {/* Main Dashboard Title with Paw Icon */}
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
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    fontFamily: "'Nunito', sans-serif",
                }}
            >
                <PetsIcon sx={{ fontSize: 32 }} />
                Pet Buy Management Dashboard
            </Typography>

            {/* Search Bar and Add Pet Button */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TextField
                    placeholder="Search for pet's name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        width: "300px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            "&:hover fieldset": {
                                borderColor: "#003366",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#003366",
                            },
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#003366" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNewClick}
                    sx={{
                        backgroundColor: "white",
                        color: "#003366",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        padding: "8px 16px",
                        textTransform: "none",
                        fontWeight: "500",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                        "& .MuiButton-startIcon": {
                            marginRight: "4px",
                        },
                    }}
                >
                    Add A Pet
                </Button>
            </Box>

            {/* Section Title for Pets Table - Styled like Pet Inquiries */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    width: "100%",
                    mt: 1,
                    mb: 0,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: themeColor,
                    padding: "10px 15px",
                    borderRadius: "4px 4px 0 0",
                }}
            >
                Pet Inventory
                <Chip
                    label={`${filteredPets.length} pets`}
                    size="small"
                    sx={{
                        bgcolor: "white",
                        color: themeColor,
                        fontWeight: "medium",
                    }}
                />
            </Typography>

            {/* Enhanced Pets Table */}
            <TableContainer
                component={Paper}
                sx={{
                    width: "100%",
                    maxWidth: "1200px",
                    borderRadius: "0 0 12px 12px",
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
                        {filteredPets.length > 0 ? (
                            filteredPets.map((pet) => {
                                // Find the original index in the full pets array
                                const originalIndex = pets.findIndex(p => p.id === pet.id);
                                return (
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
                                                    onClick={() => handleUpdate(originalIndex)}
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
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                    {searchTerm ? (
                                        <Typography variant="body1" color="textSecondary">
                                            No pets found matching "{searchTerm}".
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography variant="body1" color="textSecondary">
                                                No pets found.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor: "#003366",
                                                    "&:hover": {
                                                        backgroundColor: "#002244",
                                                    },
                                                }}
                                                onClick={handleAddNewClick}
                                            >
                                                Add Your First Pet
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Section Title for Users Table - Now white */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    width: "100%",
                    mt: 4,
                    mb: 0,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: themeColor,
                    padding: "10px 15px",
                    borderRadius: "4px 4px 0 0",
                }}
            >
                Pet Inquiries
                <Chip
                    label={`${filteredUsers.length} users`}
                    size="small"
                    sx={{
                        bgcolor: "white",
                        color: themeColor,
                        fontWeight: "medium",
                    }}
                />
            </Typography>

            {/* Users Table with Pet Inquiry Information */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: "0 0 8px 8px",
                    boxShadow: 3,
                    width: "100%"
                }}
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
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
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
                                                                    key: getPetId(pet),
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
                                                                            {formatDate(getInquiryDate(pet))}
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
                                                                    label={`${getPetName(pet)} (ID: ${getPetId(pet)})`}
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
                                                                    onChange={(e: SelectChangeEvent) =>
                                                                        handleStatusChange(
                                                                            user.user_id || user.userId || 0,
                                                                            getPetId(pet),
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
                                        {searchTerm ? (
                                            <Typography variant="body1" color="textSecondary">
                                                No users found with inquiries matching "{searchTerm}".
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" color="textSecondary">
                                                No users found.
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>

            {/* Message for when no users are found */}
            {!isLoading && !error && filteredUsers.length === 0 && !searchTerm && (
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
                        {isRefreshing && (
                            <CircularProgress size={16} sx={{ ml: 1, color: themeColor }} />
                        )}
                    </Button>
                </Paper>
            )}

            {/* Add Pet Form */}
            {drawerOpen && (
                <AddPetForm
                    onSnackbarMessage={onSnackbarMessage}
                    onPetAdded={fetchPets}
                    onPetUpdated={fetchPets}
                    isOpen={drawerOpen}
                    onClose={handleDrawerClose}
                    petToEdit={editPet}
                />
            )}
        </Box>
    );
};

export default PetManagementDashboard;
