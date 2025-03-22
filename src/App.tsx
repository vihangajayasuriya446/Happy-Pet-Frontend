import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Dog articles
import DogAdoptionArticles from './DogAdoptionArticles';
import DogHomePreparationArticle from './DogHomePreparationArticle';
import ChoosingRightDogBreedArticle from './ChoosingRightDogBreedArticle';
import BasicObedienceDogTrainingArticle from "./BasicObedienceDogTrainingArticle";
import DogBodyLanguageArticle from './DogBodyLanguageArticle';
import EssentialDogHealthCareArticle from "./EssentialDogHealthCareArticle";

// Cat articles
import CatAdoptionArticles from './CatAdoptionArticles';
import PreparingHomeForCatArticle from './PreparingHomeForCatArticle';
import ChoosingRightCatBreedArticle from './ChoosingRightCatBreedArticle';
import UnderstandingCatBodyLanguageArticle from './UnderstandingCatBodyLanguageArticle';
import EssentialCatHealthCareArticle from './EssentialCatHealthCareArticle';
import theme from './theme';
import CreatingEnrichingCatEnvironmentArticle from "./CreatingEnrichingCatEnvironmentArticle";



const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    {/* Home route - you may want to create a combined home page */}
                    <Route path="/" element={<DogAdoptionArticles />} />

                    {/* Dog adoption routes */}
                    <Route path="/dog-adoption-articles" element={<DogAdoptionArticles />} />
                    <Route path="/dog-adoption-articles/preparing-your-home-for-a-new-dog" element={<DogHomePreparationArticle />} />
                    <Route path="/dog-adoption-articles/choosing-the-right-dog-breed" element={<ChoosingRightDogBreedArticle />} />
                    <Route path="/dog-adoption-articles/basic-obedience-training" element={<BasicObedienceDogTrainingArticle />} />
                    <Route path="/dog-adoption-articles/understanding-dog-body-language" element={<DogBodyLanguageArticle />} />
                    <Route path="/dog-adoption-articles/essential-health-care-for-your-new-dog" element={<EssentialDogHealthCareArticle />} />

                    {/* Cat adoption routes */}
                    <Route path="/cat-adoption-articles" element={<CatAdoptionArticles />} />
                    <Route path="/cat-adoption-articles/preparing-your-home-for-a-new-cat" element={<PreparingHomeForCatArticle />} />
                    <Route path="/cat-adoption-articles/choosing-the-right-cat-breed" element={<ChoosingRightCatBreedArticle />} />
                    <Route path="/cat-adoption-articles/understanding-cat-body-language" element={<UnderstandingCatBodyLanguageArticle />} />
                    <Route path="/cat-adoption-articles/creating-an-enriching-environment" element={<CreatingEnrichingCatEnvironmentArticle />} />
                    <Route path="/cat-adoption-articles/essential-health-care-for-your-new-cat" element={<EssentialCatHealthCareArticle />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;