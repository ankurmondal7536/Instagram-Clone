import React from 'react'
import { AppRoutes } from './appRoutes'
import "./style.scss"
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
 
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>

  )
}

export default App
