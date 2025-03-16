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
