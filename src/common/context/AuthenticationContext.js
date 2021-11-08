import { createContext } from 'react'
import useAuthentication from '../hooks/useAuthentication/useAuthentication'

const AuthenticationContext = createContext()

export const Provider = ({ children }) => {
  const value = useAuthentication()

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContext
