import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DogAdoptionArticles from './DogAdoptionArticles';
import DogHomePreparationArticle from './DogHomePreparationArticle';
import ChoosingRightDogBreedArticle from './ChoosingRightDogBreedArticle';
import BasicObedienceTrainingArticle from './BasicObedienceTrainingArticle';
import DogBodyLanguageArticle from './DogBodyLanguageArticle';
import EssentialHealthCareArticle from './EssentialHealthCareArticle';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<DogAdoptionArticles />} />
                    <Route path="/dog-adoption-articles" element={<DogAdoptionArticles />} />
                    <Route path="/dog-adoption-articles/preparing-your-home-for-a-new-dog" element={<DogHomePreparationArticle />} />
                    <Route path="/dog-adoption-articles/choosing-the-right-dog-breed" element={<ChoosingRightDogBreedArticle />} />
                    <Route path="/dog-adoption-articles/basic-obedience-training" element={<BasicObedienceTrainingArticle />} />
                    <Route path="/dog-adoption-articles/understanding-dog-body-language" element={<DogBodyLanguageArticle />} />
                    <Route path="/dog-adoption-articles/essential-health-care-for-your-new-dog" element={<EssentialHealthCareArticle />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
