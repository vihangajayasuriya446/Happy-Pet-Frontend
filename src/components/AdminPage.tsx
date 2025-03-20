import React, { useState, useEffect } from 'react';
import {
    Typography,
    Paper,
    Tab,
    Tabs,
    Box,
    Alert,
    Snackbar,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    ListItemButton,
    Divider,
    AppBar,
    Toolbar,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    Button
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import AddPetForm from '../AddPetForm';
import RegisteredUsersTable from '../components/RegisteredUsersTable';
import AdminDashboard from '../components/AdminDashboard';
import { InquiryService } from '../services/InquiryService';

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
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `admin-tab-${index}`,
        'aria-controls': `admin-tabpanel-${index}`,
    };
}

// Type for snackbar state
interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

const drawerWidth = 240;

const AdminPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [petFormOpen, setPetFormOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    // Fetch notifications count on mount
    useEffect(() => {
        fetchNotificationsCount();

        // Set up interval to check for new notifications
        const interval = setInterval(fetchNotificationsCount, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const fetchNotificationsCount = async () => {
        try {
            // Try to get new inquiries count
            const contactInquiries = await InquiryService.getAllContactInquiries();
            const newCount = contactInquiries.filter(inquiry =>
                inquiry.status?.toUpperCase() === 'NEW'
            ).length;

            setNotifications(newCount);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
        // Reset notification count when opening the menu
        setNotifications(0);
    };

    const handleNotificationMenuClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleNavigation = (index: number) => {
        setTabValue(index);
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    const handlePetFormOpen = () => {
        setPetFormOpen(true);
    };

    const handlePetFormClose = () => {
        setPetFormOpen(false);
    };

    const handlePetAdded = () => {
        // Refresh pet data or perform any necessary updates
        handleSnackbar("Pet added successfully", "success");
    };

    // Drawer content
    const drawer = (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: '#002244'
            }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Pet Buy Admin
                </Typography>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                )}
            </Box>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={tabValue === 0}
                        onClick={() => handleNavigation(0)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 51, 102, 0.08)',
                                borderRight: '3px solid #003366',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 51, 102, 0.12)',
                                }
                            }
                        }}
                    >
                        <ListItemIcon>
                            <DashboardIcon color={tabValue === 0 ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={tabValue === 1}
                        onClick={() => handleNavigation(1)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 51, 102, 0.08)',
                                borderRight: '3px solid #003366',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 51, 102, 0.12)',
                                }
                            }
                        }}
                    >
                        <ListItemIcon>
                            <PetsIcon color={tabValue === 1 ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Pet Management" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={tabValue === 2}
                        onClick={() => handleNavigation(2)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 51, 102, 0.08)',
                                borderRight: '3px solid #003366',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 51, 102, 0.12)',
                                }
                            }
                        }}
                    >
                        <ListItemIcon>
                            <Badge badgeContent={notifications} color="error">
                                <PeopleIcon color={tabValue === 2 ? 'primary' : 'inherit'} />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="User Inquiries" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
            {lastUpdated && (
                <Box sx={{ p: 2, mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </Typography>
                </Box>
            )}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    bgcolor: '#003366',
                    boxShadow: 3
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Pet Buy Management Dashboard
                    </Typography>

                    {/* Notification Icon */}
                    <Tooltip title="Notifications">
                        <span>
                            <IconButton
                                color="inherit"
                                onClick={handleNotificationMenuOpen}
                            >
                                <Badge badgeContent={notifications} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* User Menu */}
                    <Tooltip title="Account settings">
                        <span>
                            <IconButton
                                onClick={handleMenuOpen}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={anchorEl ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={anchorEl ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#001a33' }}>
                                    <AccountCircleIcon />
                                </Avatar>
                            </IconButton>
                        </span>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            {/* Notification Menu */}
            <Menu
                anchorEl={notificationAnchorEl}
                id="notification-menu"
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationMenuClose}
                onClick={handleNotificationMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleNavigation(2)}>
                    <ListItemIcon>
                        <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        {notifications > 0 ?
                            `${notifications} new user inquiries` :
                            'No new notifications'
                        }
                    </ListItemText>
                </MenuItem>
            </Menu>

            {/* User Menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            {/* Drawer */}
            <Drawer
                variant={isDesktop ? "permanent" : "temporary"}
                open={isDesktop || drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: '#f5f7fa',
                minHeight: '100vh',
                mt: '64px' // Height of AppBar
            }}>
                {/* Mobile Tabs - only show on mobile when drawer is closed */}
                {isMobile && !drawerOpen && (
                    <Paper sx={{ mb: 3 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            sx={{
                                '& .MuiTab-root': {
                                    fontSize: '0.875rem',
                                    fontWeight: 'medium',
                                    color: '#003366',
                                    '&.Mui-selected': {
                                        color: '#001a33',
                                        fontWeight: 'bold'
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#003366',
                                    height: 3
                                }
                            }}
                        >
                            <Tab
                                icon={<DashboardIcon />}
                                aria-label="Dashboard"
                                {...a11yProps(0)}
                            />
                            <Tab
                                icon={<PetsIcon />}
                                aria-label="Pet Management"
                                {...a11yProps(1)}
                            />
                            <Tab
                                icon={
                                    <Badge badgeContent={notifications} color="error">
                                        <PeopleIcon />
                                    </Badge>
                                }
                                aria-label="User Inquiries"
                                {...a11yProps(2)}
                            />
                        </Tabs>
                    </Paper>
                )}

                {/* Tab Panels */}
                <TabPanel value={tabValue} index={0}>
                    <AdminDashboard onSnackbarMessage={handleSnackbar} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handlePetFormOpen}
                            sx={{
                                backgroundColor: '#003366',
                                '&:hover': {
                                    backgroundColor: '#002244',
                                },
                            }}
                        >
                            Add New Pet
                        </Button>
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                        Pet Management
                    </Typography>
                    {/* Here you would typically have a table or list of pets */}
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <RegisteredUsersTable onSnackbarMessage={handleSnackbar} />
                </TabPanel>

                {/* Pet Form as a Drawer */}
                <AddPetForm
                    onSnackbarMessage={handleSnackbar}
                    onPetAdded={handlePetAdded}
                    isOpen={petFormOpen}
                    onClose={handlePetFormClose}
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        variant="filled"
                        elevation={6}
                        sx={{
                            width: '100%',
                            '& .MuiAlert-icon': {
                                fontSize: '1.25rem'
                            }
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default AdminPage;
