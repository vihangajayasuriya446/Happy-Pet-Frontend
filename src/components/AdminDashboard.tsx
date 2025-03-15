import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Divider,
    Chip,
    Button,
    CircularProgress,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Alert,
    TextField,
    InputAdornment
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { InquiryService, ContactInquiry, UserWithInquiriesDTO } from '../services/InquiryService';

interface AdminDashboardProps {
    onSnackbarMessage: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`dashboard-tabpanel-${index}`}
            aria-labelledby={`dashboard-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Helper function to get pet icon based on pet category
const getPetTypeIcon = () => {
    return <PetsIcon fontSize="small" />;
};

// Helper function to get color for pet category chip
const getPetTypeColor = (category?: string) => {
    if (!category) return "default";

    const type = category.toLowerCase();
    if (type.includes('cat')) return "secondary";
    if (type.includes('dog')) return "primary";
    return "default"; // Other pet types
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSnackbarMessage }) => {
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userInquiries, setUserInquiries] = useState<UserWithInquiriesDTO[]>([]);
    const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedContactInquiry, setSelectedContactInquiry] = useState<ContactInquiry | null>(null);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<'NEW' | 'IN_PROGRESS' | 'RESOLVED'>('NEW');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [petTypeFilter, setPetTypeFilter] = useState<string>('ALL');
    const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch pet inquiries
            const userInquiriesData = await InquiryService.getDashboardData();
            setUserInquiries(userInquiriesData);

            // Fetch contact inquiries
            const contactInquiriesData = await InquiryService.getAllContactInquiries();
            setContactInquiries(contactInquiriesData);

            setLastFetchTime(new Date());
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
            onSnackbarMessage('Failed to load dashboard data', 'error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        onSnackbarMessage('Refreshing dashboard data...', 'info');
        fetchDashboardData();
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenStatusDialog = (inquiry: ContactInquiry) => {
        setSelectedContactInquiry(inquiry);
        setNewStatus(inquiry.status || 'NEW');
        setStatusDialogOpen(true);
    };

    const handleOpenViewDialog = (inquiry: ContactInquiry) => {
        setSelectedContactInquiry(inquiry);
        setViewDialogOpen(true);
    };

    const handleOpenDeleteDialog = (inquiry: ContactInquiry) => {
        setSelectedContactInquiry(inquiry);
        setDeleteDialogOpen(true);
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setNewStatus(event.target.value as 'NEW' | 'IN_PROGRESS' | 'RESOLVED');
    };

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
    };

    const handlePetTypeFilterChange = (event: SelectChangeEvent) => {
        setPetTypeFilter(event.target.value);
    };

    const handleUpdateStatus = async () => {
        if (!selectedContactInquiry || !selectedContactInquiry.id) return;

        try {
            const success = await InquiryService.updateContactInquiryStatus(
                selectedContactInquiry.id,
                newStatus
            );

            if (success) {
                // Update local state
                setContactInquiries(prevInquiries =>
                    prevInquiries.map(inquiry =>
                        inquiry.id === selectedContactInquiry.id
                            ? { ...inquiry, status: newStatus }
                            : inquiry
                    )
                );
                onSnackbarMessage(`Status updated to ${formatStatusText(newStatus)}`, 'success');
            } else {
                onSnackbarMessage('Failed to update status', 'error');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            onSnackbarMessage('Failed to update status', 'error');
        } finally {
            setStatusDialogOpen(false);
        }
    };

    const handleDeleteInquiry = async () => {
        if (!selectedContactInquiry || !selectedContactInquiry.id) return;

        try {
            await InquiryService.deleteInquiry(selectedContactInquiry.id);

            // Remove from local state - don't check for success since method returns void
            setContactInquiries(prevInquiries =>
                prevInquiries.filter(inquiry => inquiry.id !== selectedContactInquiry.id)
            );
            onSnackbarMessage('Inquiry deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            onSnackbarMessage('Failed to delete inquiry', 'error');
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    // Helper function to format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;

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

    // Get status chip color based on status
    const getStatusChipColor = (status?: string) => {
        switch (status?.toUpperCase()) {
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

    // Get status icon based on status
    const getStatusIcon = (status?: string) => {
        switch (status?.toUpperCase()) {
            case 'NEW':
                return <NewReleasesIcon />;
            case 'IN_PROGRESS':
                return <PendingIcon />;
            case 'RESOLVED':
                return <CheckCircleIcon />;
            default:
                return <NewReleasesIcon />;
        }
    };

    // Format status text for display
    const formatStatusText = (status?: string): string => {
        if (!status) return 'New';

        switch (status.toUpperCase()) {
            case 'NEW':
                return 'New';
            case 'IN_PROGRESS':
                return 'In Progress';
            case 'RESOLVED':
                return 'Resolved';
            default:
                return status;
        }
    };

    // Apply filters to contact inquiries
    const filteredContactInquiries = useMemo(() => {
        return contactInquiries.filter(inquiry => {
            // Search term filter
            const matchesSearch =
                searchTerm === '' ||
                inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.petType?.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            const matchesStatus =
                statusFilter === 'ALL' ||
                inquiry.status?.toUpperCase() === statusFilter;

            // Pet type filter
            const matchesPetType =
                petTypeFilter === 'ALL' ||
                (inquiry.petType && inquiry.petType.toLowerCase().includes(petTypeFilter.toLowerCase()));

            return matchesSearch && matchesStatus && matchesPetType;
        });
    }, [contactInquiries, searchTerm, statusFilter, petTypeFilter]);

    // Calculate summary statistics
    const totalPetInquiries = userInquiries.reduce(
        (total, user) => total + (user.interestedPets?.length || 0),
        0
    );

    const totalContactInquiries = contactInquiries.length;

    const newPetInquiries = userInquiries.reduce(
        (total, user) => total + (user.interestedPets?.filter(pet =>
            pet.status?.toUpperCase() === 'NEW').length || 0),
        0
    );

    const newContactInquiries = contactInquiries.filter(
        inquiry => inquiry.status?.toUpperCase() === 'NEW'
    ).length;

    const inProgressContactInquiries = contactInquiries.filter(
        inquiry => inquiry.status?.toUpperCase() === 'IN_PROGRESS'
    ).length;

    const resolvedContactInquiries = contactInquiries.filter(
        inquiry => inquiry.status?.toUpperCase() === 'RESOLVED'
    ).length;

    // Extract unique pet types for filter dropdown
    const uniquePetTypes = useMemo(() => {
        const types = new Set<string>();
        contactInquiries.forEach(inquiry => {
            if (inquiry.petType) {
                types.add(inquiry.petType);
            }
        });
        return Array.from(types);
    }, [contactInquiries]);

    // Count dog and cat inquiries
    const dogInquiries = contactInquiries.filter(
        inquiry => inquiry.petType?.toLowerCase().includes('dog')
    ).length;

    const catInquiries = contactInquiries.filter(
        inquiry => inquiry.petType?.toLowerCase().includes('cat')
    ).length;

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={fetchDashboardData}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Dashboard Header with Refresh Button */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#003366' }}>
                    Admin Dashboard
                    {lastFetchTime && (
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2, fontWeight: 'normal' }}>
                            Last updated: {lastFetchTime.toLocaleTimeString()}
                        </Typography>
                    )}
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{
                        borderColor: '#003366',
                        color: '#003366',
                        '&:hover': {
                            borderColor: '#002244',
                            backgroundColor: 'rgba(0, 51, 102, 0.04)'
                        }
                    }}
                >
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '100%',
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #003366 0%, #004080 100%)',
                        color: 'white'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Users
                            </Typography>
                            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                                {userInquiries.length}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                Registered users with inquiries
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '100%',
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                        color: 'white'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pet Inquiries
                            </Typography>
                            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                                {totalPetInquiries}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                {newPetInquiries} new inquiries
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '100%',
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)',
                        color: 'white'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Contact Inquiries
                            </Typography>
                            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                                {totalContactInquiries}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, opacity: 0.8 }}>
                                <Typography variant="body2">
                                    Dogs: {dogInquiries}
                                </Typography>
                                <Typography variant="body2">
                                    Cats: {catInquiries}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '100%',
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                        color: 'white'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Inquiries
                            </Typography>
                            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                                {totalPetInquiries + totalContactInquiries}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                {newPetInquiries + newContactInquiries} pending responses
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Status Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <NewReleasesIcon color="primary" sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="primary.main">New</Typography>
                                <Typography variant="h4">{newContactInquiries}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: '#fff8e1', height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PendingIcon color="warning" sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="warning.main">In Progress</Typography>
                                <Typography variant="h4">{inProgressContactInquiries}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="success.main">Resolved</Typography>
                                <Typography variant="h4">{resolvedContactInquiries}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs for different inquiry types */}
            <Paper sx={{ mb: 4 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            fontWeight: 'medium',
                            color: '#003366',
                            '&.Mui-selected': {
                                color: '#001a33',
                                fontWeight: 'bold'
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#003366'
                        }
                    }}
                >
                    <Tab label="Pet Inquiries" icon={<PetsIcon />} iconPosition="start" />
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                Contact Inquiries
                                {newContactInquiries > 0 && (
                                    <Chip
                                        label={newContactInquiries}
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
                                    />
                                )}
                            </Box>
                        }
                        icon={<MessageIcon />}
                        iconPosition="start"
                    />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    {userInquiries.length > 0 ? (
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Contact Info</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Inquired Pets</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Registration Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userInquiries.map((user) => (
                                        <TableRow key={user.userId} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar sx={{ bgcolor: '#003366' }}>
                                                        <PersonIcon />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body1" fontWeight="medium">
                                                            {user.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ID: {user.userId}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <EmailIcon fontSize="small" color="action" />
                                                        <Typography variant="body2">{user.email}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PhoneIcon fontSize="small" color="action" />
                                                        <Typography variant="body2">{user.contactNo || 'N/A'}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {user.interestedPets?.map((pet, index) => (
                                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Chip
                                                                icon={getPetTypeIcon()}
                                                                label={`${pet.name}`}
                                                                size="small"
                                                                variant="outlined"
                                                                color="primary"
                                                            />
                                                            {pet.category && (
                                                                <Chip
                                                                    label={pet.category}
                                                                    size="small"
                                                                    color={getPetTypeColor(pet.category)}
                                                                />
                                                            )}
                                                            {pet.status && (
                                                                <Chip
                                                                    label={formatStatusText(pet.status)}
                                                                    size="small"
                                                                    color={getStatusChipColor(pet.status)}
                                                                />
                                                            )}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(user.registrationDate)}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={user.status || 'Active'}
                                                    size="small"
                                                    color="primary"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No pet inquiries found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                When users inquire about pets, they will appear here.
                            </Typography>
                        </Box>
                    )}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    {/* Search and Filter Controls */}
                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                        <TextField
                            placeholder="Search inquiries..."
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flexGrow: 1, maxWidth: '400px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <FilterListIcon color="action" />
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Status"
                                    onChange={handleStatusFilterChange}
                                >
                                    <MenuItem value="ALL">All Statuses</MenuItem>
                                    <MenuItem value="NEW">New</MenuItem>
                                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                    <MenuItem value="RESOLVED">Resolved</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Pet Type</InputLabel>
                                <Select
                                    value={petTypeFilter}
                                    label="Pet Type"
                                    onChange={handlePetTypeFilterChange}
                                >
                                    <MenuItem value="ALL">All Types</MenuItem>
                                    {uniquePetTypes.map(type => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Results count */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing {filteredContactInquiries.length} of {contactInquiries.length} inquiries
                        </Typography>
                    </Box>

                    {contactInquiries.length > 0 ? (
                        filteredContactInquiries.length > 0 ? (
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Contact Info</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Pet Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredContactInquiries.map((inquiry) => (
                                            <TableRow key={inquiry.id} sx={{
                                                '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                                backgroundColor: inquiry.status === 'NEW' ? 'rgba(25, 118, 210, 0.08)' : 'inherit'
                                            }}>
                                                <TableCell>
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {inquiry.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <EmailIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">{inquiry.email}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <PhoneIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">{inquiry.phoneNumber || 'N/A'}</Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {inquiry.petType ? (
                                                        <Chip
                                                            icon={getPetTypeIcon()}
                                                            label={inquiry.petType}
                                                            size="small"
                                                            color={getPetTypeColor(inquiry.petType)}
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">
                                                            Not specified
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title={inquiry.message}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                maxWidth: '200px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            {inquiry.message}
                                                        </Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(inquiry.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getStatusIcon(inquiry.status)}
                                                        label={formatStatusText(inquiry.status)}
                                                        size="small"
                                                        color={getStatusChipColor(inquiry.status)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Tooltip title="View Details">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => handleOpenViewDialog(inquiry)}
                                                            >
                                                                <VisibilityIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Change Status">
                                                            <IconButton
                                                                size="small"
                                                                color="warning"
                                                                onClick={() => handleOpenStatusDialog(inquiry)}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => handleOpenDeleteDialog(inquiry)}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box sx={{ p: 3, textAlign: 'center', border: '1px dashed #ccc', borderRadius: 1 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No inquiries match your filters
                                </Typography>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('ALL');
                                        setPetTypeFilter('ALL');
                                    }}
                                    sx={{ mt: 2 }}
                                >
                                    Clear Filters
                                </Button>
                            </Box>
                        )
                    ) : (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No contact inquiries found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                When users submit contact forms, they will appear here.
                            </Typography>
                        </Box>
                    )}
                </TabPanel>
            </Paper>

            {/* Status Change Dialog */}
            <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
                <DialogTitle>Update Inquiry Status</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Change the status for inquiry from {selectedContactInquiry?.name}
                        </Typography>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={newStatus}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="NEW">New</MenuItem>
                                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                <MenuItem value="RESOLVED">Resolved</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateStatus} variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Inquiry Dialog */}
            <Dialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Contact Inquiry Details
                    {selectedContactInquiry?.status && (
                        <Chip
                            label={formatStatusText(selectedContactInquiry.status)}
                            size="small"
                            color={getStatusChipColor(selectedContactInquiry.status)}
                            sx={{ ml: 2 }}
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    {selectedContactInquiry && (
                        <Box sx={{ pt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        From
                                    </Typography>
                                    <Typography variant="h6">
                                        {selectedContactInquiry.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedContactInquiry.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Phone
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedContactInquiry.phoneNumber || 'N/A'}
                                    </Typography>
                                </Grid>
                                {selectedContactInquiry.petType && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Pet Type
                                        </Typography>
                                        <Box sx={{ mt: 0.5 }}>
                                            <Chip
                                                icon={getPetTypeIcon()}
                                                label={selectedContactInquiry.petType}
                                                size="small"
                                                color={getPetTypeColor(selectedContactInquiry.petType)}
                                            />
                                        </Box>
                                    </Grid>
                                )}
                                {selectedContactInquiry.address && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body1">
                                            {selectedContactInquiry.address}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Submitted On
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatDate(selectedContactInquiry.createdAt)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Message
                                    </Typography>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            mt: 1,
                                            backgroundColor: '#f9f9f9',
                                            minHeight: '100px',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {selectedContactInquiry.message}
                                        </Typography>
                                    </Paper>
                                </Grid>

                                {/* Pet details section if available */}
                                {selectedContactInquiry.petId && (
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Inquired About Pet
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 1,
                                            p: 2,
                                            bgcolor: 'rgba(0, 51, 102, 0.04)',
                                            borderRadius: 1
                                        }}>
                                            <PetsIcon sx={{ mr: 1, color: '#003366' }} />
                                            <Typography variant="body1">
                                                Pet ID: {selectedContactInquiry.petId}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                    <Button
                        onClick={() => {
                            setViewDialogOpen(false);
                            if (selectedContactInquiry) {
                                handleOpenStatusDialog(selectedContactInquiry);
                            }
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Update Status
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this inquiry from {selectedContactInquiry?.name}?
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteInquiry} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;

