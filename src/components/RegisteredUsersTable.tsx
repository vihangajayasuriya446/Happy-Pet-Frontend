// RegisteredUsersTable.tsx
import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Chip,
    TablePagination,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Collapse,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';

// Define the User interface to include all required fields
interface User {
    userId: string;
    name: string;
    email: string;
    contactNo: string;
    address: string;
    message: string;
    interestedPets?: Pet[];
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected';
}

// Define the Pet interface
interface Pet {
    petId: string;
    name: string;
    breed: string;
    age: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
}

interface RegisteredUsersTableProps {
    onSnackbarMessage: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

// Sample data - replace with actual API call
const sampleUsers: User[] = [
    {
        userId: 'USR001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        contactNo: '555-123-4567',
        address: '123 Main St, Anytown, USA',
        message: 'I am interested in adopting a pet for my family.',
        interestedPets: [
            {
                petId: 'PET001',
                name: 'Max',
                breed: 'Golden Retriever',
                age: '2 years',
                price: 800,
                category: 'Dog',
                description: 'Friendly and energetic golden retriever',
                imageUrl: 'https://example.com/max.jpg'
            }
        ],
        registrationDate: '2025-02-15',
        status: 'approved'
    },
    {
        userId: 'USR002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        contactNo: '555-987-6543',
        address: '456 Oak Ave, Somewhere, USA',
        message: 'Looking for a cat that is good with children.',
        interestedPets: [
            {
                petId: 'PET003',
                name: 'Whiskers',
                breed: 'Maine Coon',
                age: '1 year',
                price: 650,
                category: 'Cat',
                description: 'Gentle and playful Maine Coon',
                imageUrl: 'https://example.com/whiskers.jpg'
            }
        ],
        registrationDate: '2025-02-20',
        status: 'pending'
    },
    {
        userId: 'USR003',
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        contactNo: '555-456-7890',
        address: '789 Pine St, Elsewhere, USA',
        message: 'Interested in small pets that are low maintenance.',
        interestedPets: [
            {
                petId: 'PET005',
                name: 'Hammy',
                breed: 'Syrian Hamster',
                age: '6 months',
                price: 50,
                category: 'Small Pet',
                description: 'Cute and active Syrian hamster',
                imageUrl: 'https://example.com/hammy.jpg'
            },
            {
                petId: 'PET006',
                name: 'Tweety',
                breed: 'Canary',
                age: '1 year',
                price: 75,
                category: 'Bird',
                description: 'Beautiful singing canary',
                imageUrl: 'https://example.com/tweety.jpg'
            }
        ],
        registrationDate: '2025-03-01',
        status: 'rejected'
    }
];

const RegisteredUsersTable: React.FC<RegisteredUsersTableProps> = ({ onSnackbarMessage }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        // Simulate API call
        const fetchUsers = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/users');
                // const data = await response.json();
                // setUsers(data);

                // Using sample data for now
                setUsers(sampleUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                onSnackbarMessage('Failed to load user data', 'error');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [onSnackbarMessage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const toggleRow = (userId: string) => {
        setOpenRows(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contactNo.includes(searchTerm)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'warning';
        }
    };

    if (loading) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography>Loading user data...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#003366' }}>
                    Registered Users & Inquiries
                </Typography>

                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: { xs: '100%', sm: '300px' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
                <Table aria-label="registered users table">
                    <TableHead sx={{ backgroundColor: '#e8eaf6' }}>
                        <TableRow>
                            <TableCell width="50px" />
                            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Contact No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Registration Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <React.Fragment key={user.userId}>
                                    <TableRow
                                        hover
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                            },
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => toggleRow(user.userId)}
                                    >
                                        <TableCell>
                                            <IconButton size="small" aria-label="expand row">
                                                {openRows[user.userId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{user.userId}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.contactNo}</TableCell>
                                        <TableCell>{user.registrationDate}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                color={getStatusColor(user.status) as "success" | "error" | "warning"}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                            <Collapse in={openRows[user.userId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ py: 3, px: 2 }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <Card variant="outlined" sx={{ height: '100%' }}>
                                                                <CardContent>
                                                                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <PersonIcon color="primary" /> User Details
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2 }} />

                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                <EmailIcon fontSize="small" color="action" />
                                                                                <Box>
                                                                                    <Typography variant="caption" color="text.secondary">Email</Typography>
                                                                                    <Typography variant="body2">{user.email}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>

                                                                        <Grid item xs={12}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                <PhoneIcon fontSize="small" color="action" />
                                                                                <Box>
                                                                                    <Typography variant="caption" color="text.secondary">Contact No</Typography>
                                                                                    <Typography variant="body2">{user.contactNo}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>

                                                                        <Grid item xs={12}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                <HomeIcon fontSize="small" color="action" />
                                                                                <Box>
                                                                                    <Typography variant="caption" color="text.secondary">Address</Typography>
                                                                                    <Typography variant="body2">{user.address}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>

                                                                        <Grid item xs={12}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                <MessageIcon fontSize="small" color="action" />
                                                                                <Box>
                                                                                    <Typography variant="caption" color="text.secondary">Message</Typography>
                                                                                    <Typography variant="body2">{user.message}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <Card variant="outlined" sx={{ height: '100%' }}>
                                                                <CardContent>
                                                                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <PetsIcon color="primary" /> Interested Pets
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2 }} />

                                                                    {user.interestedPets && user.interestedPets.length > 0 ? (
                                                                        <Grid container spacing={2}>
                                                                            {user.interestedPets.map((pet) => (
                                                                                <Grid item xs={12} key={pet.petId}>
                                                                                    <Card variant="outlined" sx={{ mb: 1 }}>
                                                                                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                                                                            <Grid container spacing={2}>
                                                                                                <Grid item xs={4} sm={3}>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            width: '100%',
                                                                                                            height: '80px',
                                                                                                            backgroundImage: `url(${pet.imageUrl})`,
                                                                                                            backgroundSize: 'cover',
                                                                                                            backgroundPosition: 'center',
                                                                                                            borderRadius: 1,
                                                                                                            backgroundColor: '#f0f0f0',
                                                                                                            display: 'flex',
                                                                                                            alignItems: 'center',
                                                                                                            justifyContent: 'center'
                                                                                                        }}
                                                                                                    >
                                                                                                        {!pet.imageUrl && <PetsIcon sx={{ opacity: 0.5 }} />}
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                                <Grid item xs={8} sm={9}>
                                                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                                                                        {pet.name} ({pet.category})
                                                                                                    </Typography>
                                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                                        {pet.breed}, {pet.age}
                                                                                                    </Typography>
                                                                                                    <Typography variant="body2">
                                                                                                        ${pet.price.toFixed(2)}
                                                                                                    </Typography>
                                                                                                    <Tooltip title={pet.description} arrow>
                                                                                                        <Typography
                                                                                                            variant="body2"
                                                                                                            sx={{
                                                                                                                mt: 0.5,
                                                                                                                overflow: 'hidden',
                                                                                                                textOverflow: 'ellipsis',
                                                                                                                display: '-webkit-box',
                                                                                                                WebkitLineClamp: 2,
                                                                                                                WebkitBoxOrient: 'vertical',
                                                                                                                cursor: 'help'
                                                                                                            }}
                                                                                                        >
                                                                                                            {pet.description}
                                                                                                        </Typography>
                                                                                                    </Tooltip>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </CardContent>
                                                                                    </Card>
                                                                                </Grid>
                                                                            ))}
                                                                        </Grid>
                                                                    ) : (
                                                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                                            No specific pets selected
                                                                        </Typography>
                                                                    )}
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No users found matching your search criteria
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default RegisteredUsersTable;
