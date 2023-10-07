import React from 'react'
import ReactDOM from 'react-dom/client'

// root components
import App from './App'

// stylesheets
import './stylesheets/Index.css'
import '@fontsource/poppins'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
