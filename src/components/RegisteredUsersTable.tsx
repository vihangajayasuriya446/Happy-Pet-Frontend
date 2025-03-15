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
import { InquiryService } from '../services/InquiryService';

// Import only the types we actually use
import { UserWithInquiriesDTO as ServiceUserWithInquiriesDTO } from '../services/InquiryService';

// Unified interface for display in the UI
interface UserInquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId: number;
    submissionDate: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
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
}

// Interface for raw inquiry data from API to match InquiryService
interface RawInquiryData {
    id?: number;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    address?: string;
    userMessage?: string;
    petId?: number;
    petName?: string;
    petType?: string;
    petBreed?: string;
    inquiryDate?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
    pet?: {
        id?: number;
        name?: string;
        category?: string;
        breed?: string;
        price?: number | string;
        birthYear?: string;
        gender?: string;
        imageUrl?: string;
    };
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
    const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try the dashboard endpoint first
            try {
                const dashboardData = await InquiryService.getDashboardData();
                console.log('Dashboard data:', dashboardData);

                if (dashboardData && Array.isArray(dashboardData) && dashboardData.length > 0) {
                    // Process dashboard data format
                    const processedInquiries = processDashboardData(dashboardData);
                    if (processedInquiries.length > 0) {
                        setInquiries(processedInquiries);
                        setLastFetchTime(new Date());
                        setLoading(false);
                        return;
                    }
                }
            } catch (dashboardErr) {
                console.warn('Could not fetch from dashboard endpoint, falling back to regular endpoint', dashboardErr);
            }

            // Fallback to regular inquiries endpoint
            const inquiriesData = await InquiryService.getAllInquiries();
            console.log('Regular API Response:', inquiriesData);

            if (inquiriesData && Array.isArray(inquiriesData)) {
                const processedInquiries = processRegularInquiriesData(inquiriesData);
                setInquiries(processedInquiries);
                setLastFetchTime(new Date());
            } else {
                throw new Error('Invalid data format received from API');
            }
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            setError('Failed to load user inquiries. Please try again.');
            onSnackbarMessage('Failed to load inquiry data', 'error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Define an interface that matches the actual structure of pet inquiries in your API response
    interface ApiPetInquiry {
        petId: number;
        name?: string;
        category?: string;
        breed?: string;
        price?: number | string;
        age?: string;
        imageUrl?: string;
        message?: string;
        inquiryDate?: string;
        status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
        // Add other fields that might be present
    }

// Process dashboard data format
    const processDashboardData = (dashboardData: ServiceUserWithInquiriesDTO[]): UserInquiry[] => {
        const processedInquiries: UserInquiry[] = [];
        let uniqueId = 1;

        dashboardData.forEach((userWithInquiries) => {
            if (userWithInquiries.interestedPets && Array.isArray(userWithInquiries.interestedPets)) {
                userWithInquiries.interestedPets.forEach((rawPetInquiry) => {
                    // Cast to our known interface to avoid TypeScript errors
                    const petInquiry = rawPetInquiry as unknown as ApiPetInquiry;

                    // Use a unique ID counter for all inquiries
                    const inquiryId = uniqueId++;

                    processedInquiries.push({
                        id: inquiryId,
                        name: userWithInquiries.name || 'N/A',
                        email: userWithInquiries.email || 'N/A',
                        phone: userWithInquiries.contactNo || 'N/A',
                        address: userWithInquiries.address || 'N/A',
                        message: petInquiry.message || userWithInquiries.message || 'N/A',
                        petId: petInquiry.petId,
                        submissionDate: petInquiry.inquiryDate || userWithInquiries.registrationDate || new Date().toISOString(),
                        status: petInquiry.status || 'NEW',
                        petDetails: {
                            id: petInquiry.petId,
                            name: petInquiry.name || 'N/A',
                            petType: petInquiry.category || 'Pet',
                            breed: petInquiry.breed || 'N/A',
                            price: petInquiry.price ? petInquiry.price.toString() : 'N/A',
                            birthYear: petInquiry.age || 'N/A',
                            gender: 'N/A', // Default value
                            imageUrl: petInquiry.imageUrl || ''
                        }
                    });
                });
            }
        });

        return processedInquiries;
    };



    // Process regular inquiries data format
    const processRegularInquiriesData = (inquiriesData: RawInquiryData[]): UserInquiry[] => {
        return inquiriesData.map((inquiry: RawInquiryData, index) => {
            // Use the actual inquiry ID if available, otherwise use the index
            const inquiryId = inquiry.id || index + 1;

            return {
                id: inquiryId,
                name: inquiry.userName || 'N/A',
                email: inquiry.userEmail || 'N/A',
                phone: inquiry.userPhone || 'N/A',
                address: inquiry.address || 'N/A',
                message: inquiry.userMessage || 'N/A',
                petId: inquiry.petId || 0,
                submissionDate: inquiry.inquiryDate || new Date().toISOString(),
                status: inquiry.status || 'NEW',
                petDetails: inquiry.pet ? {
                    id: inquiry.pet.id || inquiry.petId || 0,
                    name: inquiry.pet.name || inquiry.petName || 'N/A',
                    petType: inquiry.pet.category || inquiry.petType || 'Pet',
                    breed: inquiry.pet.breed || inquiry.petBreed || 'N/A',
                    price: typeof inquiry.pet.price === 'number'
                        ? inquiry.pet.price.toString()
                        : inquiry.pet.price?.toString() || 'N/A',
                    birthYear: inquiry.pet.birthYear || 'N/A',
                    gender: inquiry.pet.gender || 'N/A',
                    imageUrl: inquiry.pet.imageUrl || ''
                } : inquiry.petId ? {
                    // Fallback to use fields from the inquiry itself when pet object is not available
                    id: inquiry.petId,
                    name: inquiry.petName || 'N/A',
                    petType: inquiry.petType || 'Pet',
                    breed: inquiry.petBreed || 'N/A',
                    price: 'N/A',
                    birthYear: 'N/A',
                    gender: 'N/A',
                    imageUrl: ''
                } : undefined
            };
        });
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
        (inquiry.petDetails?.breed && inquiry.petDetails.breed.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.status && inquiry.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRetry = () => {
        fetchInquiries();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString;
            }
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

    // Format price in LKR
    const formatPrice = (price: string | number | undefined): string => {
        if (!price) return 'N/A';

        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numericPrice)) return 'N/A';

        return `LKR ${numericPrice.toLocaleString()}/=`;
    };

    // Get status chip color based on status
    const getStatusChipColor = (status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED') => {
        switch (status) {
            case 'NEW':
                return 'primary';
            case 'IN_PROGRESS':
                return 'warning';
            case 'RESOLVED':
                return 'success';
            default:
                return 'default';
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
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Pet Details</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Submission Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
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

            {lastFetchTime && (
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Last updated: {lastFetchTime.toLocaleTimeString()}
                </Typography>
            )}

            <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
                <Table aria-label="registered users table">
                    <TableHead sx={{ backgroundColor: '#e8eaf6' }}>
                        <TableRow>
                            <TableCell width="50px" />
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
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
                                                <Chip
                                                    label={inquiry.status || 'NEW'}
                                                    size="small"
                                                    color={getStatusChipColor(inquiry.status)}
                                                    sx={{ fontWeight: 'medium' }}
                                                />
                                            </TableCell>
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
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
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
                                                                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                                                                            {inquiry.message || 'N/A'}
                                                                                        </Typography>
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
                                                                                        {formatPrice(inquiry.petDetails.price)}
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
                                                                                <Grid item xs={12}>
                                                                                    <Typography variant="caption" color="text.secondary">Status</Typography>
                                                                                    <Box sx={{ mt: 0.5 }}>
                                                                                        <Chip
                                                                                            label={inquiry.status || 'NEW'}
                                                                                            size="small"
                                                                                            color={getStatusChipColor(inquiry.status)}
                                                                                        />
                                                                                    </Box>
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
                                                                                <Box sx={{ mt: 2 }}>
                                                                                    <Typography variant="caption" color="text.secondary">Status</Typography>
                                                                                    <Box sx={{ mt: 0.5 }}>
                                                                                        <Chip
                                                                                            label={inquiry.status || 'NEW'}
                                                                                            size="small"
                                                                                            color={getStatusChipColor(inquiry.status)}
                                                                                        />
                                                                                    </Box>
                                                                                </Box>
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
                                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        {searchTerm ? 'No inquiries found matching your search criteria' : 'No inquiries available'}
                                    </Typography>
                                    {searchTerm && (
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => setSearchTerm('')}
                                            sx={{ mt: 1 }}
                                        >
                                            Clear Search
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {filteredInquiries.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredInquiries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                    labelRowsPerPage="Rows per page:"
                />
            )}

            {filteredInquiries.length > 0 && inquiries.length !== filteredInquiries.length && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'right' }}>
                    Showing {filteredInquiries.length} of {inquiries.length} total inquiries
                </Typography>
            )}

            {/* Summary section */}
            {inquiries.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#003366' }}>
                        Summary
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        Total Inquiries
                                    </Typography>
                                    <Typography variant="h4" sx={{ mt: 1, color: '#003366' }}>
                                        {inquiries.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        New Inquiries
                                    </Typography>
                                    <Typography variant="h4" sx={{ mt: 1, color: '#2e7d32' }}>
                                        {inquiries.filter(inq => inq.status === 'NEW').length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ bgcolor: '#fff8e1', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        In Progress
                                    </Typography>
                                    <Typography variant="h4" sx={{ mt: 1, color: '#ed6c02' }}>
                                        {inquiries.filter(inq => inq.status === 'IN_PROGRESS').length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ bgcolor: '#e8eaf6', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        Resolved
                                    </Typography>
                                    <Typography variant="h4" sx={{ mt: 1, color: '#1976d2' }}>
                                        {inquiries.filter(inq => inq.status === 'RESOLVED').length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Pet type distribution */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Pet Type Distribution
                        </Typography>
                        <Grid container spacing={1}>
                            {Object.entries(
                                inquiries.reduce((acc, inquiry) => {
                                    const petType = inquiry.petDetails?.petType || 'Unknown';
                                    acc[petType] = (acc[petType] || 0) + 1;
                                    return acc;
                                }, {} as Record<string, number>)
                            ).map(([petType, count]) => (
                                <Grid item key={petType}>
                                    <Chip
                                        icon={<PetsIcon />}
                                        label={`${petType}: ${count}`}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        sx={{ m: 0.5 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default RegisteredUsersTable;

