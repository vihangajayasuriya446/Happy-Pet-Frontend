import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import AppRoutes from './routes'
import { theme } from './themes/themes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Box component="main" sx={{ minHeight: '100vh' }}>
            <AppRoutes />
          </Box>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
