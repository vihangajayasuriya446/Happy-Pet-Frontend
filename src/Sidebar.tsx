import React, { useState } from 'react';
import { 
    Drawer, 
    List,  
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Typography, 
    Collapse,
    Box,
    IconButton, 
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import CloseIcon from '@mui/icons-material/Close'; 
import ContactMailIcon from '@mui/icons-material/ContactMail';

import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    open: boolean;
    toggleSidebar: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => { 
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        toggleSidebar(); 
    };

    const [openPetStore, setOpenPetStore] = useState(false);
    const [openAdoptPets, setOpenAdoptPets] = useState(false);
    const [openMatchmaking, setOpenMatchmaking] = useState(false);
    const [openContactUs, setOpenContactUs] = useState(false);

    return (
        <>
            <Drawer 
                anchor="left"
                open={open}
                onClose={toggleSidebar} 
                sx={{
                    width: 280, 
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: 'transparent', 
                        backdropFilter: 'blur(10px)',
                        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)', 
                    },
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}> 
                    <Box sx={{ p: 3, fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                        <Typography variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                            Admin Dashboard
                        </Typography>
                        <IconButton onClick={toggleSidebar} sx={{ color: '#333' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                        {/* Pet Store */}
                        <ListItemButton 
                            onClick={() => setOpenPetStore(!openPetStore)} 
                            sx={{ 
                                borderRadius: '8px', 
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                            }}
                        > 
                            <ListItemIcon>
                                <StorefrontIcon sx={{ color: '#333', fontSize: '1.5rem' }}/> 
                            </ListItemIcon>
                            <ListItemText 
                                primary="Pet Store" 
                                primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }} 
                            />
                            {openPetStore ? <ExpandLess sx={{ color: '#333' }} /> : <ExpandMore sx={{ color: '#333' }} />}
                        </ListItemButton>
                        <Collapse in={openPetStore} timeout="auto" unmountOnExit> 
                            <List component="div" disablePadding>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/admin/pets')} // Updated path
                                > 
                                    <ListItemText primary="Pet Buy Management" primaryTypographyProps={{ color: '#333' }} />
                                </ListItemButton>
                                {/* CHANGES - Added item to navigate to Payments */}
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/admin/payments')} // Updated path
                                > 
                                    <ListItemText primary="Payments Management" primaryTypographyProps={{ color: '#333' }} />
                                </ListItemButton>
                                
                            </List>
                        </Collapse>

                        {/* Adopt Pets */}
                        <ListItemButton 
                            onClick={() => setOpenAdoptPets(!openAdoptPets)}
                            sx={{ 
                                borderRadius: '8px', 
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                            }}
                        >
                            <ListItemIcon>
                                <HomeIcon sx={{ color: '#333' }}/> 
                            </ListItemIcon>
                            <ListItemText 
                                primary="Adopt Pets" 
                                primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }} 
                            />
                            {openAdoptPets ? <ExpandLess sx={{ color: '#333' }} /> : <ExpandMore sx={{ color: '#333' }} />}
                        </ListItemButton>
                        <Collapse in={openAdoptPets} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
                                    }}
                                    onClick={() => handleNavigation('/dashboard1')} // Updated path
                                > 
                                    <ListItemText primary="Adopt Pet Table" primaryTypographyProps={{ color: '#333' }} /> 
                                </ListItemButton>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/user-dashboard')}
                                > 
                                    <ListItemText primary="Adopt Requests" primaryTypographyProps={{ color: '#333' }} /> 
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* Matchmaking */}
                        <ListItemButton 
                            onClick={() => setOpenMatchmaking(!openMatchmaking)}
                            sx={{ 
                                borderRadius: '8px', 
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
                            }}
                        > 
                            <ListItemIcon>
                                <PetsIcon sx={{ color: '#333' }}/> 
                            </ListItemIcon>
                            <ListItemText 
                                primary="Matchmaking" 
                                primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }} 
                            />
                            {openMatchmaking ? <ExpandLess sx={{ color: '#333' }} /> : <ExpandMore sx={{ color: '#333' }} />}
                        </ListItemButton>
                        <Collapse in={openMatchmaking} timeout="auto" unmountOnExit> 
                            <List component="div" disablePadding>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/dashboard')}
                                >
                                    <ListItemText primary="Add New Pets" primaryTypographyProps={{ color: '#333' }} />
                                </ListItemButton>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/owners')}
                                > 
                                    <ListItemText primary="View Matchmaking Requests" primaryTypographyProps={{ color: '#333' }} /> 
                                </ListItemButton>


                            </List>
                        </Collapse> 

                         {/* Contact Us Inquiries */}
                         <ListItemButton 
                            onClick={() => setOpenContactUs(!openContactUs)}
                            sx={{ 
                                borderRadius: '8px', 
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
                            }}
                        > 
                            <ListItemIcon>
                                <ContactMailIcon sx={{ color: '#333' }}/> 
                            </ListItemIcon>
                            <ListItemText 
                                primary="Contact Us" 
                                primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }} 
                            />
                            {openContactUs ? <ExpandLess sx={{ color: '#333' }} /> : <ExpandMore sx={{ color: '#333' }} />}
                        </ListItemButton>
                        <Collapse in={openContactUs} timeout="auto" unmountOnExit> 
                            <List component="div" disablePadding>
                                <ListItemButton 
                                    sx={{ 
                                        pl: 4, 
                                        borderRadius: '8px', 
                                        mb: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } 
                                    }}
                                    onClick={() => handleNavigation('/contactusresponses')}
                                > 
                                    <ListItemText primary="Messages" primaryTypographyProps={{ color: '#333' }} /> 
                                </ListItemButton>
                            </List>
                        </Collapse> 


                    </List>
                </Box>
            </Drawer> 
        </>
    );
};

export default Sidebar;