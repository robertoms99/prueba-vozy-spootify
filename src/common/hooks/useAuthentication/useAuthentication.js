import { useEffect, useState } from 'react'
import authenticationServices from '../../../services/authentication.service'

const useAuthentication = () => {
  const [tokenApp, setTokenApp] = useState(() => window.localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(tokenApp !== null)

  useEffect(() => {
    if (tokenApp === null) {
      authenticationServices
        .authenticateSpootify()
        .then((token) => {
          if (token) {
            setIsAuthenticated(true)
            setTokenApp(token)
          }
        })
        .catch(() => {
          setTokenApp(null)
          setIsAuthenticated(false)
        })
    }
  }, [tokenApp])

  useEffect(() => {
    window.localStorage.setItem('token', tokenApp)
  }, [tokenApp])

  return {
    token: tokenApp,
    isAuthenticated
  }
}

export default useAuthentication
