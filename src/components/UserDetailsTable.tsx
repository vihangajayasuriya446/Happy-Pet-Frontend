import React from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Box,
    CircularProgress,
} from '@mui/material';
import { UserDetails } from './types';

interface UserDetailsTableProps {
    rows: UserDetails[];
    selectedUser: (user: UserDetails) => void;
    deleteUser: (user: UserDetails) => void;
    isLoading: boolean;
    error: string | null;
}

const UserDetailsTable: React.FC<UserDetailsTableProps> = ({
                                                               rows,
                                                               selectedUser,
                                                               deleteUser,
                                                               isLoading,
                                                               error,
                                                           }) => {
    // Theme color constant for consistency
    const themeColor = '#002855';
    const userRoleColor = '#6a1b9a';

    // Function to get role color
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return {
                    bgcolor: themeColor,
                    color: '#fff'
                };
            case 'USER':
                return {
                    bgcolor: userRoleColor,
                    color: '#fff'
                };
            default:
                return {
                    bgcolor: '#e0e0e0',
                    color: '#000'
                };
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        bgcolor: themeColor,
                        '&:hover': {
                            bgcolor: '#001c3d',
                        }
                    }}
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 3 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Address</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Registered Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: themeColor, textAlign: 'center' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={row.user_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell sx={{ textAlign: 'center' }}>{row.user_id}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.email}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.phone}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.address}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Chip
                                        label={row.role}
                                        size="small"
                                        sx={getRoleColor(row.role)}
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Chip
                                        label={row.active ? 'Active' : 'Inactive'}
                                        color={row.active ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {new Date(row.registered_date).toLocaleDateString()}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            marginRight: 1,
                                            textTransform: 'none',
                                            borderRadius: '4px',
                                            bgcolor: themeColor,
                                            '&:hover': {
                                                bgcolor: '#001c3d',
                                            },
                                        }}
                                        onClick={() => selectedUser(row)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ textTransform: 'none', borderRadius: '4px' }}
                                        onClick={() => deleteUser(row)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                <Typography variant="body1" color="textSecondary">
                                    No users found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserDetailsTable;
