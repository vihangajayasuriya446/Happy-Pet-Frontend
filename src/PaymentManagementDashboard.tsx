import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    IconButton
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { PaymentService } from './services/PaymentService';

interface Payment {
    id: number;
    amount: number;
    phoneNumber: string;
    paymentMethod: string;
    paymentDate: string;
}

const PaymentManagementDashboard: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        handleFetchPayments();
    }, []);

    const handleFetchPayments = async (): Promise<void> => {
        try {
            const paymentsData = await PaymentService.fetchPayments();
            console.log('Payments:', paymentsData);
            if (paymentsData) {
                setPayments(paymentsData);
            } else {
                throw new Error("Failed to fetch payments.");
            }
        } catch (error) {
            console.error('Fetch payments error:', error);
        }
    };

    function formatDateWithTime(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return (
        <Box
            sx={{
                py: 1,
                paddingTop: "5px",
            }}
        >
            <Box bgcolor="rgba(255, 255, 255, 0.7)" sx={{ width: "100%", maxWidth: "1200px", padding: "10px", margin: "80px auto 20px", borderRadius: "8px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", backgroundColor: "#003366", p: 2, textAlign: "center", borderRadius: "8px" }}>
                    <PetsIcon sx={{ fontSize: 32 }} /> Payment details
                </Typography>

                <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <Tooltip title="Admin Dashboard">
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{
                position: "fixed",
                left: isSidebarOpen ? 240 : 16, // Adjust position based on sidebar state
                top: 60, // Increased top value to move the icon further down
                zIndex: 1300, // High zIndex to ensure it's above other content
                '& svg': {
                  fontSize: '2rem',
                  color: "black"
                },
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(28, 34, 225, 0.61)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Tooltip>

                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#003366" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment ID</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount (LKR)</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Method</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone Number</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.id}</TableCell>
                                        <TableCell>{payment.amount}</TableCell>
                                        <TableCell>{payment.paymentMethod}</TableCell>
                                        <TableCell>{payment.phoneNumber}</TableCell>
                                        <TableCell>{formatDateWithTime(payment.paymentDate)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No Payments Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default PaymentManagementDashboard;
