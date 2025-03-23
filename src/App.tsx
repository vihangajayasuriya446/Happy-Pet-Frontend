import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChecklistForNewPetLovers from './ChecklistForNewPetLovers';
import PetAgeCalculator from './PetAgeCalculator';
import PetAdoptionFAQs from './PetAdoptionFAQs';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Checklist for new pet lovers */}
                <Route path="/checklist" element={<ChecklistForNewPetLovers />} />
                {/* Pet Age Calculator */}
                <Route path="/pet-age-calculator" element={<PetAgeCalculator />} />
                {/* Pet Adoption FAQs */}
                <Route path="/adoption-faqs" element={<PetAdoptionFAQs />} />
            </Routes>
        </Router>
    );
};

export default App;