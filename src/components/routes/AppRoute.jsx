import React from 'react'

// components (apps & shared)
import SignUp from '../apps/SignUp'
import SignIn from '../apps/SignIn'
import Dashboard from '../apps/Dashboard'
import ResetPassword from '../apps/ResetPasssword'

// routes
import PrivateRoute from './PrivateRoute'

const AppRoute = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "sign-up",
    element: (
      <SignUp />
    )
  },
  {
    path: "sign-in",
    element: (
      <SignIn />
    )
  },
  {
    path: "forgot-password",
    element: (
      <ResetPassword />
    )
  }
]

export default AppRoute
