import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

interface DrawerMenuProps {
    open: boolean;
    toggleDrawer: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, toggleDrawer }) => (
    <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
                width: 250,
                boxSizing: "border-box",
            },
        }}
    >
        <List>
            {["Home", "Services", "About Us", "Contact Us"].map((text) => (
                <ListItem key={text} onClick={toggleDrawer} sx={{ cursor: "pointer" }}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </Drawer>
);

export default DrawerMenu;
