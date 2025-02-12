import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users';
import MainUser from './MainUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}> {/* Wrap your app with QueryClientProvider */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/users' element={<Users />} />
        <Route path='/mainpage' element={<MainUser />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
