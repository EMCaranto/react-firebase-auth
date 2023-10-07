import React from 'react'
import { Navigate } from 'react-router-dom'

// contexts
import { useAuth } from '../contexts/AuthProvider'

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()

  const renderedContent = currentUser ? ( children ) : ( <Navigate to="/sign-in" /> )
                            
  return renderedContent
}

export default PrivateRoute
