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
    Button,
    Tooltip,
    Collapse,
    Grid,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Avatar
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
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

// Updated interface to match the UserInquiryResponse from the backend
interface UserInquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId: number;
    petDetails?: {
        id: number;
        name: string;
        petType: string;
        price: string;
        breed: string;
        birthYear: string;
        gender: string;
        imageUrl?: string;
    };
    submissionDate: string;
}

// Interface for dashboard items
interface DashboardInquiryItem {
    inquiries?: UserInquiry[];
    [key: string]: unknown;
}

interface RegisteredUsersTableProps {
    onSnackbarMessage: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const RegisteredUsersTable: React.FC<RegisteredUsersTableProps> = ({ onSnackbarMessage }) => {
    const [inquiries, setInquiries] = useState<UserInquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        setError(null);
        try {
            // First try the admin dashboard endpoint which might have more complete data
            try {
                const response = await axios.get('http://localhost:8080/api/v1/inquiries/admin/dashboard');
                if (response.data && Array.isArray(response.data)) {
                    // Process the dashboard data which might have a different structure
                    const processedData = response.data.flatMap((item: DashboardInquiryItem) => {
                        // If the dashboard returns UserWithInquiriesDTO format
                        if (item.inquiries && Array.isArray(item.inquiries)) {
                            return item.inquiries;
                        }
                        // Ensure each item is treated as a UserInquiry
                        return item as unknown as UserInquiry;
                    });
                    // Explicitly cast the result to UserInquiry[]
                    setInquiries(processedData as UserInquiry[]);
                    setLoading(false);
                    return;
                }
            } catch (dashboardErr) {
                console.warn('Could not fetch from dashboard endpoint, falling back to regular endpoint', dashboardErr);
            }

            // Fallback to regular inquiries endpoint
            const response = await axios.get('http://localhost:8080/api/v1/inquiries');
            console.log('API Response:', response.data);

            if (response.data && Array.isArray(response.data)) {
                setInquiries(response.data as UserInquiry[]);
            } else {
                throw new Error('Unexpected response format');
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            setError('Failed to load user inquiries. Please try again.');
            setLoading(false);
            onSnackbarMessage('Failed to load inquiry data', 'error');
        } finally {
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchInquiries();
        onSnackbarMessage('Refreshing inquiry data...', 'info');
    };

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

    const toggleRow = (userId: number) => {
        setOpenRows(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const filteredInquiries = inquiries.filter(inquiry =>
        inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.phone?.includes(searchTerm) ||
        (inquiry.petDetails?.name && inquiry.petDetails.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.petDetails?.breed && inquiry.petDetails.breed.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRetry = () => {
        fetchInquiries();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    if (loading) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <CircularProgress size={40} />
                <Typography sx={{ mt: 2 }}>Loading user inquiry data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#003366' }}>
                        Registered Users & Pet Inquiries
                    </Typography>
                </Box>

                <Box sx={{ p: 3, textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: 1, mb: 3 }}>
                    <Typography color="error" gutterBottom>{error}</Typography>
                    <Button
                        variant="contained"
                        onClick={handleRetry}
                        sx={{ mt: 2 }}
                    >
                        Try Again
                    </Button>
                </Box>

                {/* Show empty table structure even when there's an error */}
                <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
                    <Table aria-label="registered users table">
                        <TableHead sx={{ backgroundColor: '#e8eaf6' }}>
                            <TableRow>
                                <TableCell width="50px" />
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Pet Details</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Submission Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No data available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#003366' }}>
                    Registered Users & Pet Inquiries
                    <Chip
                        label={`${inquiries.length} total`}
                        size="small"
                        color="primary"
                        sx={{ ml: 1, fontWeight: 'normal' }}
                    />
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search inquiries..."
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
                    <Tooltip title="Refresh data">
                        <IconButton
                            onClick={handleRefresh}
                            disabled={refreshing}
                            color="primary"
                        >
                            {refreshing ? <CircularProgress size={24} /> : <RefreshIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
                <Table aria-label="registered users table">
                    <TableHead sx={{ backgroundColor: '#e8eaf6' }}>
                        <TableRow>
                            <TableCell width="50px" />
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Pet Details</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Submission Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((inquiry) => (
                                    <React.Fragment key={inquiry.id}>
                                        <TableRow
                                            hover
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                                },
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => toggleRow(inquiry.id)}
                                        >
                                            <TableCell>
                                                <IconButton size="small" aria-label="expand row">
                                                    {openRows[inquiry.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{inquiry.id}</TableCell>
                                            <TableCell>{inquiry.name || 'N/A'}</TableCell>
                                            <TableCell>{inquiry.email || 'N/A'}</TableCell>
                                            <TableCell>{inquiry.phone || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Tooltip title={inquiry.address || 'N/A'} arrow>
                                                    <Typography
                                                        sx={{
                                                            maxWidth: 150,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {inquiry.address || 'N/A'}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={inquiry.message || 'N/A'} arrow>
                                                    <Typography
                                                        sx={{
                                                            maxWidth: 150,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {inquiry.message || 'N/A'}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.petDetails ? (
                                                    <Chip
                                                        icon={<PetsIcon />}
                                                        label={`${inquiry.petDetails.name} (${inquiry.petDetails.breed})`}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Pet ID: {inquiry.petId || 'N/A'}
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(inquiry.submissionDate)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                                <Collapse in={openRows[inquiry.id]} timeout="auto" unmountOnExit>
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
                                                                                        <Typography variant="body2">{inquiry.email || 'N/A'}</Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                    <PhoneIcon fontSize="small" color="action" />
                                                                                    <Box>
                                                                                        <Typography variant="caption" color="text.secondary">Phone</Typography>
                                                                                        <Typography variant="body2">{inquiry.phone || 'N/A'}</Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                    <HomeIcon fontSize="small" color="action" />
                                                                                    <Box>
                                                                                        <Typography variant="caption" color="text.secondary">Address</Typography>
                                                                                        <Typography variant="body2">{inquiry.address || 'N/A'}</Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                                    <MessageIcon fontSize="small" color="action" />
                                                                                    <Box>
                                                                                        <Typography variant="caption" color="text.secondary">Message</Typography>
                                                                                        <Typography variant="body2">{inquiry.message || 'N/A'}</Typography>
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
                                                                            <PetsIcon color="primary" /> Pet Details
                                                                        </Typography>
                                                                        <Divider sx={{ mb: 2 }} />

                                                                        {inquiry.petDetails ? (
                                                                            <Grid container spacing={2}>
                                                                                {inquiry.petDetails.imageUrl && (
                                                                                    <Grid item xs={12} sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                                                                                        <Avatar
                                                                                            src={inquiry.petDetails.imageUrl}
                                                                                            alt={inquiry.petDetails.name}
                                                                                            variant="rounded"
                                                                                            sx={{ width: 120, height: 120 }}
                                                                                        />
                                                                                    </Grid>
                                                                                )}
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Pet ID</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.id}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Pet Name</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.name}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Type</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.petType}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Breed</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.breed}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Price</Typography>
                                                                                    <Typography variant="body2">
                                                                                        {inquiry.petDetails.price ? `LKR ${inquiry.petDetails.price}/=` : 'N/A'}
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Birth Year</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.birthYear || 'N/A'}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Typography variant="caption" color="text.secondary">Gender</Typography>
                                                                                    <Typography variant="body2">{inquiry.petDetails.gender || 'N/A'}</Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        ) : (
                                                                            <Box>
                                                                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                                                                                    Limited pet information available
                                                                                </Typography>
                                                                                <Typography variant="body2">
                                                                                    Pet ID: {inquiry.petId || 'N/A'}
                                                                                </Typography>
                                                                            </Box>
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
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        {searchTerm ? 'No inquiries found matching your search criteria' : 'No inquiries available'}
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
                count={filteredInquiries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default RegisteredUsersTable;
