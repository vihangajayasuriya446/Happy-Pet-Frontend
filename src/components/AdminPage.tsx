import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Tab,
    Tabs,
    Box,
    Alert,
    Snackbar,
    useTheme,
    useMediaQuery
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import AddPetForm from '../AddPetForm';
import RegisteredUsersTable from '../components/RegisteredUsersTable';

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

const AdminPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 2, md: 4 },
                backgroundColor: '#003366',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '12px',
                    backgroundColor: '#f5f7fa',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '1400px',
                    mb: 4
                }}
            >
                <Box
                    sx={{
                        p: { xs: 2, md: 3 },
                        backgroundColor: '#002244',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}
                    >
                        Pet Buy Management Dashboard
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'rgba(255,255,255,0.8)',
                            mt: 1
                        }}
                    >
                        Manage your pets and user inquiries in one place
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#e8eaf6' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant={isMobile ? "fullWidth" : "standard"}
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                fontWeight: 'medium',
                                color: '#003366',
                                transition: 'all 0.2s ease',
                                '&.Mui-selected': {
                                    color: '#001a33',
                                    fontWeight: 'bold'
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                }
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#003366',
                                height: 3
                            }
                        }}
                    >
                        <Tab
                            icon={<PetsIcon />}
                            iconPosition="start"
                            label="Pet Management"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<PeopleIcon />}
                            iconPosition="start"
                            label="User Inquiries"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <AddPetForm onSnackbarMessage={handleSnackbar} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <RegisteredUsersTable onSnackbarMessage={handleSnackbar} />
                </TabPanel>

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
            </Paper>
        </Container>
    );
};

export default AdminPage;