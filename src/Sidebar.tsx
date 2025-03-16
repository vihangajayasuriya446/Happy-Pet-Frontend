import React from 'react';
import { 
    Drawer, 
    List,  
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Typography, 
    Collapse,
    
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose(); 
    };

    const [openPetStore, setOpenPetStore] = React.useState(false);
    const [openAdoptPets, setOpenAdoptPets] = React.useState(false);
    const [openMatchmaking, setOpenMatchmaking] = React.useState(false);

    return (
        <Drawer 
            variant="permanent" 
            anchor="left" 
            open={open}
            onClose={onClose} 
            sx={{
                width: 280, // Increased sidebar width 
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280, // Increased sidebar width
                    boxSizing: 'border-box',
                },
            }}
        >
            <Typography variant="h5" component="div" sx={{ p: 2, fontWeight: 'bold' }}>
                Admin Dashboard
            </Typography>
            <List>
                {/* Pet Store */}
                <ListItemButton onClick={() => setOpenPetStore(!openPetStore)}> 
                    <ListItemIcon>
                        <StorefrontIcon sx={{ color: 'black', fontSize: '2rem' }}/> 
                    </ListItemIcon>
                    <ListItemText primary="Pet Store" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    {openPetStore ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPetStore} timeout="auto" unmountOnExit> 
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center' }} 
                            onClick={() => handleNavigation('/add-new-pets')}
                        > 
                            <ListItemText primary="Add New Pets" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center'  }} 
                            onClick={() => handleNavigation('/view-pets-for-sale')}
                        > 
                            <ListItemText primary="View Current Pets for Sale" /> 
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Adopt Pets */}
                <ListItemButton onClick={() => setOpenAdoptPets(!openAdoptPets)}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: 'black' }}/> 
                    </ListItemIcon>
                    <ListItemText primary="Adopt Pets" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    {openAdoptPets ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAdoptPets} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center' }} 
                            onClick={() => handleNavigation('/dashboard')}
                        > 
                            <ListItemText primary="Add New Pets" /> 
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center'  }} 
                            onClick={() => handleNavigation('/owners')}
                        > 
                            <ListItemText primary="View Pets for Adoption" /> 
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Matchmaking */}
                <ListItemButton onClick={() => setOpenMatchmaking(!openMatchmaking)}> 
                    <ListItemIcon>
                        <PetsIcon sx={{ color: 'black'  }}/> 
                    </ListItemIcon>
                    <ListItemText primary="Matchmaking" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    {openMatchmaking ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openMatchmaking} timeout="auto" unmountOnExit> 
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center'  }}
                            onClick={() => handleNavigation('/dashboard')}
                        >
                            <ListItemText primary="Add New Pets" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, display: 'flex', justifyContent: 'center' }} 
                            onClick={() => handleNavigation('/owners')}
                        > 
                            <ListItemText primary="View Matchmaking Requests" /> 
                        </ListItemButton>
                    </List>
                </Collapse> 
            </List>
        </Drawer>
    );
};

export default Sidebar;
