import React, { useEffect, useState } from 'react';
import {
  Button,
  FormLabel,
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { Adoption, UserDetails } from './types';
import axios from 'axios';

interface UserDetailsFormProps {
  updateAdoption: (adoption: Adoption) => void;
  submitted: boolean;
  data?: Adoption;
  isEdit: boolean;
  resetForm: () => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  updateAdoption,
  submitted,
  data,
  isEdit,
  resetForm,
}) => {
  const [adoption_id, setAdoptionId] = useState<number>(0);
  const [user_id, setUserId] = useState<number>(0);
  const [pet_id, setPetId] = useState<number>(0);
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected' | 'Available' | 'Adopted'>('Pending');
  const [applied_at, setAppliedAt] = useState<string>('');
  const [user_name, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [pet_name, setPetName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (submitted) {
      resetFormState();
    }
  }, [submitted]);

  useEffect(() => {
    if (isEdit && data) {
      populateForm(data);
      if (data.user_id) {
        fetchUserDetails(data.user_id);
      }
    } else if (!isEdit) {
      resetFormState();
    }
  }, [data, isEdit]);

  const resetFormState = () => {
    setAdoptionId(0);
    setUserId(0);
    setPetId(0);
    setStatus('Pending');
    setAppliedAt('');
    setUserName('');
    setEmail('');
    setAddress('');
    setPetName('');
    setPhone('');
    setUserDetails(null);
    resetForm();
  };

  const populateForm = (data: Adoption) => {
    setAdoptionId(data.adoption_id);
    setUserId(data.user_id);
    setPetId(data.pet_id);
    setStatus(data.status as 'Pending' | 'Approved' | 'Rejected' | 'Available' | 'Adopted');
    setAppliedAt(data.applied_at || '');
    setUserName(data.user_name || '');
    setEmail(data.email || '');
    setAddress(data.address || '');
    setPetName(data.pet_name || '');
    setPhone(data.phone || '');
  };

  const fetchUserDetails = async (userId: number) => {
    try {
      const response = await axios.get<UserDetails>(`http://51.21.197.93:8080/api/v1/users/${userId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error appropriately
    }
  };

  const handleSubmit = async () => {
    const adoptionData: Adoption = {
      adoption_id,
      user_id,
      pet_id,
      status,
      applied_at,
      user_name,
      email,
      address,
      phone,
      pet_name
    };

    console.log('Updating adoption status:', adoptionData);
    updateAdoption(adoptionData);

    // Also update user Details
    if (userDetails && user_id) {
      try {
        // Prepare user data for update
        const userData = {
          user_id: user_id,
          name: user_name,
          email: email,
          address: address,
          phone: phone
        };
        
        // Make PUT request to update user
        const response = await axios.put(`http://51.21.197.93:8080/api/v1/users/update/${user_id}`, userData);
        console.log('User details updated successfully:', response.data);
        // Handle success
      } catch (error) {
        console.error('Error updating user details:', error);
        // Handle error
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: '#002855', fontWeight: 'bold', textAlign: 'center' }}>
          Update Adoption Application Status
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Adoption ID</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={adoption_id}
                onChange={(e) => setAdoptionId(Number(e.target.value))}
                variant="outlined"
                size="small"
                disabled={isEdit} // Disable editing if in edit mode
              />
            </Box>
            <Box>
              <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Pet ID</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={pet_id}
                onChange={(e) => setPetId(Number(e.target.value))}
                variant="outlined"
                size="small"
                disabled={isEdit} // Disable editing if in edit mode
              />
            </Box>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Pet Name</FormLabel>
            <TextField
              fullWidth
              value={pet_name}
              onChange={(e) => setPetName(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Applicant Name</FormLabel>
            <TextField
              fullWidth
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Email</FormLabel>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Phone</FormLabel>
            <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Address</FormLabel>
            <TextField
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Applied Date</FormLabel>
            <TextField
              fullWidth
              type="text" // Consider using a date picker component
              value={applied_at}
              onChange={(e) => setAppliedAt(e.target.value)}
              variant="outlined"
              size="small"
              disabled={isEdit} // Disable editing if in edit mode
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: '#002855' }}>Status*</FormLabel>
            <Select
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Pending' | 'Approved' | 'Rejected' | 'Available' | 'Adopted')}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Adopted">Adopted</MenuItem>
            </Select>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, textTransform: 'none', borderRadius: '4px' }}
          >
            Update Status
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={resetForm}
            sx={{ textTransform: 'none', borderRadius: '4px' }}
          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserDetailsForm;