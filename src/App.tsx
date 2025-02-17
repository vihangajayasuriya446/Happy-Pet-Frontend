import Navbar from './components/Navbar';
import PetGrid from './components/PetGrid';
import Footer from "./components/Footer";
import { Box } from '@mui/material';

const App = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <PetGrid />
            <Footer />
        </Box>
    );
};



export default App;