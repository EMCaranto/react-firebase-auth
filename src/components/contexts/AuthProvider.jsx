import React, { useContext, useEffect, useState } from 'react'

// firebase
import { auth } from '../../firebase/FirebaseConfig'

const AuthContext = React.createContext()

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [ currentUser, setCurrentUser ] = useState('')
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signOut() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  const contextValue = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={ contextValue }>
      { !loading && (children) }
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
