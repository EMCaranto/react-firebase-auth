import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components (apps & shared)
import Footer from './components/shared/Footer'
import Navbar from './components/shared/Navbar'

// contexts
import { AuthProvider } from './components/contexts/AuthProvider'

// routes
import AppRoute from './components/routes/AppRoute'

// stylesheets
import './stylesheets/App.css'

function App() {
  const routes = AppRoute
  
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Router>
          <Routes>
            {
              routes.map((route) => (
                <Route
                  key={ route.path }
                  path={ route.path }
                  element={ route.element }
                />
              ))
            }
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
