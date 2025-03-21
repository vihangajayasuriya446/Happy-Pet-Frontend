import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ContactProvider } from "./contexts/ContactContext";
import HomePage from "./HomePage";
import BuyPetPage from "./BuyPetPage";
import UserDetailsDashboard from "./components/UserDetailsDashboard";
import PetManagementDashboard from "./PetManagementDashboard";

// Main App component with routing
const App: React.FC = () => {
    return (
        <Router>
            <CartProvider>
                <ContactProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/buy" element={<BuyPetPage />} />
                        <Route path="/contact-owner/:petId" element={<UserDetailsDashboard />} />
                        <Route path="/contact" element={<UserDetailsDashboard />} />
                        <Route path="/admin/pets" element={<PetManagementDashboard />} />
                        <Route path="/admindb" element={<Navigate to="/admin/pets" replace />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </ContactProvider>
            </CartProvider>
        </Router>
    );
};

export default App;
