// src/components/UserDetailsForm.tsx
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
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  addUser,
  updateUser,
  submitted,
  data,
  isEdit,
  resetForm,
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
    setPassword(''); // Don't show password for security reasons
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
      password: password || undefined, // Only include password if it's set
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
    if (!isEdit && !password) return false; // Password required for new users
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    return true;
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: '#002855', fontWeight: 'bold', textAlign: 'center' }}>
          {isEdit ? 'Edit User' : 'Add a New User'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Name*</FormLabel>
            <Input fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Email*</FormLabel>
            <Input 
              fullWidth 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>
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
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Phone</FormLabel>
            <Input fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Address</FormLabel>
            <Input 
              fullWidth 
              multiline 
              rows={2} 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Role</FormLabel>
            <Select fullWidth value={role} onChange={(e) => setRole(e.target.value as string)}>
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </Box>

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
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            sx={{ mt: 2, textTransform: 'none', borderRadius: '4px' }}
          >
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserDetailsForm;