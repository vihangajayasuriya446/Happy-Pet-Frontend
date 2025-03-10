// UserDetailsForm.tsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Typography
} from '@mui/material';

// Export the UserDetails interface so it can be imported elsewhere
export interface UserDetails {
    user_id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    pet_id?: string; // Add this to store which pet they're inquiring about
    submission_date?: string; // Add this to track when the request was made
}

interface UserDetailsFormProps {
    addUser: (user: Omit<UserDetails, 'user_id'>) => Promise<void>;
    updateUser: (user: UserDetails) => Promise<void>;
    submitted: boolean;
    data: UserDetails | null;
    isEdit: boolean;
    resetForm: () => void;
    petId?: string; // Add this prop
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
                                                             addUser,
                                                             updateUser,
                                                             submitted,
                                                             data,
                                                             isEdit,
                                                             resetForm,
                                                             petId // Add this to the destructuring
                                                         }) => {
    const initialFormState: UserDetails = {
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    };

    const [formData, setFormData] = useState<UserDetails>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});

    // Reset form when submitted is true
    useEffect(() => {
        if (submitted) {
            setFormData(initialFormState);
            setErrors({});
        }
    }, [submitted]);

    // Update form data when editing an existing user
    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            setFormData(initialFormState);
        }
    }, [data]);

    // Optionally pre-populate message with pet info
    useEffect(() => {
        if (petId) {
            setFormData(prev => ({
                ...prev,
                message: `I'm interested in learning more about the pet with ID: ${petId}`
            }));
        }
    }, [petId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is modified
        if (errors[name as keyof UserDetails]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserDetails, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const userDataWithPet = {
            ...formData,
            pet_id: petId,
            submission_date: new Date().toISOString()
        };

        if (isEdit && formData.user_id) {
            await updateUser(userDataWithPet);
        } else {
            await addUser(userDataWithPet);
        }
    };

    const handleCancel = () => {
        resetForm();
        setFormData(initialFormState);
        setErrors({});
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: '8px', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
                {isEdit ? 'Edit Contact Information' : petId ? `Contact About Pet #${petId}` : 'Contact Information'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="message"
                            name="message"
                            label="Message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors.message}
                            helperText={errors.message}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    {isEdit && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': {
                                bgcolor: '#002244',
                            }
                        }}
                    >
                        {isEdit ? 'Update' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserDetailsForm;
