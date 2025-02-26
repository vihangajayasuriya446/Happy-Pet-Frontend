import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PetGrid from './components/PetGrid';
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { Box } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Box sx={{ minHeight: '100vh' }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/adopt" element={<PetGrid />} />
                    {/* Add more routes as needed */}
                </Routes>
                <Footer />
            </Box>
        </Router>
    );
};

export default App;