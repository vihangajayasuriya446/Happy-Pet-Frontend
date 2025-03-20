import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Paper,
    Grid
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface PetFilterProps {
    onPetTypeChange: (petType: string) => void;
}

const PetFilter: React.FC<PetFilterProps> = ({ onPetTypeChange }) => {
    const [petType, setPetType] = useState<string>('all');

    const handlePetTypeChange = (event: SelectChangeEvent<string>) => {
        const newPetType = event.target.value;
        setPetType(newPetType);
        onPetTypeChange(newPetType);
    };

    return (
        <Paper
            elevation={1}
            sx={{
                py: 2,
                px: 3,
                mb: 3,
                backgroundColor: '#f8f9fa',
                borderRadius: 2
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
                {/* Left side with heading and icon */}
                <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <PetsIcon sx={{ mr: 1, color: '#003366' }} />
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#003366' }}>
                        Buy a pet
                    </Typography>
                </Grid>

                {/* Middle with pet type selector */}
                <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
                            I'm looking for:
                        </Typography>
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={petType}
                                onChange={handlePetTypeChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select pet type' }}
                                sx={{
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                    }
                                }}
                            >
                                <MenuItem value="all">All Pets</MenuItem>
                                <MenuItem value="dog">Dogs</MenuItem>
                                <MenuItem value="cat">Cats</MenuItem>
                                <MenuItem value="bird">Birds</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {/* Right side with shopping bag icon */}
                <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>
                            Ready to adopt?
                        </Typography>
                        <ShoppingBagIcon sx={{ color: '#003366' }} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PetFilter;
