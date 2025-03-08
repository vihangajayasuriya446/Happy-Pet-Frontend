import React, { useEffect, useState } from 'react';
import {
    Button,
    FormLabel,
    Box,
    Input,
    Typography,
    Select,
    MenuItem,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    InputAdornment,
    IconButton,
    TextField,
} from '@mui/material';
import { UserDetails } from './types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface UserDetailsFormProps {
    addUser: (user: UserDetails) => void;
    updateUser: (user: UserDetails) => void;
    submitted: boolean;
    data?: UserDetails;
    isEdit: boolean;
    resetForm: () => void;
    includeRegisteredDate?: boolean;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
                                                             addUser,
                                                             updateUser,
                                                             submitted,
                                                             data,
                                                             isEdit,
                                                             resetForm,
                                                             includeRegisteredDate = true,
                                                         }) => {
    const [user_id, setUserId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<string>('USER');
    const [active, setActive] = useState<boolean>(true);
    const [registered_date, setRegisteredDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    // Theme colors
    const themeColor = '#002855';

    useEffect(() => {
        if (submitted || !isEdit) {
            resetFormState();
        }
    }, [submitted, isEdit]);

    useEffect(() => {
        if (isEdit && data) {
            populateForm(data);
        }
    }, [data, isEdit]);

    const resetFormState = () => {
        setUserId(0);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
        setRole('USER');
        setActive(true);
        setRegisteredDate(new Date().toISOString().split('T')[0]);
        resetForm();
    };

    const populateForm = (data: UserDetails) => {
        setUserId(data.user_id);
        setName(data.name);
        setEmail(data.email);
        setPassword('');
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setRole(data.role);
        setActive(data.active);
        setRegisteredDate(
            data.registered_date
                ? new Date(data.registered_date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
        );
    };

    const handleSubmit = () => {
        const userData: UserDetails = {
            user_id,
            name,
            email,
            password: password || undefined,
            phone,
            address,
            role,
            active,
            registered_date,
        };

        if (isEdit) {
            updateUser(userData);
        } else {
            addUser(userData);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = () => {
        // Basic validation
        if (!name || !email) return false;
        if (!isEdit && !password) return false;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return false;

        return true;
    };

    // Common style for form labels with reduced boldness
    const labelStyle = { color: themeColor, fontWeight: 'normal' };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" sx={{ mb: 3, color: themeColor, fontWeight: 'bold', textAlign: 'center' }}>
                    {isEdit ? 'Edit User' : 'Add a New User'}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <FormLabel sx={labelStyle}>Name*</FormLabel>
                        <Input fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                    </Box>

                    <Box>
                        <FormLabel sx={labelStyle}>Email*</FormLabel>
                        <Input
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <FormLabel sx={labelStyle}>
                            {isEdit ? 'Password (leave blank to keep unchanged)' : 'Password*'}
                        </FormLabel>
                        <Input
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>

                    <Box>
                        <FormLabel sx={labelStyle}>Phone</FormLabel>
                        <Input fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Box>

                    <Box>
                        <FormLabel sx={labelStyle}>Address</FormLabel>
                        <Input
                            fullWidth
                            multiline
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <FormLabel sx={labelStyle}>Role</FormLabel>
                        <Select fullWidth value={role} onChange={(e) => setRole(e.target.value as string)}>
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>
                    </Box>

                    {includeRegisteredDate && (
                        <Box>
                            <FormLabel sx={labelStyle}>Registered Date</FormLabel>
                            <TextField
                                fullWidth
                                type="date"
                                value={registered_date}
                                onChange={(e) => setRegisteredDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                    )}

                    <Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={active}
                                    onChange={(e) => setActive(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Active Account"
                        />
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                        sx={{
                            mt: 2,
                            textTransform: 'none',
                            borderRadius: '4px',
                            bgcolor: themeColor,
                            '&:hover': {
                                bgcolor: '#001c3d',
                            },
                        }}
                    >
                        {isEdit ? 'Update User' : 'Add User'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserDetailsForm;
