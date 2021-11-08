import { useEffect, useState } from 'react'
import authenticationServices from '../../../services/authentication.service'

const useAuthentication = () => {
  const [tokenApp, setTokenApp] = useState(() => window.localStorage.getItem('access_token'))
  const [isAuthenticated, setIsAuthenticated] = useState(tokenApp !== null)

  useEffect(() => {
    authenticationServices
      .authenticateSpootify()
      .then(({ access_token }) => {
        console.log(access_token)
        setIsAuthenticated(true)
        if (access_token) {
          setTokenApp(access_token)
        }
      })
      .catch(() => {
        setTokenApp(null)
        setIsAuthenticated(false)
      })
  }, [])

  useEffect(() => {
    if (tokenApp) {
      window.localStorage.setItem('access_token', tokenApp)
    }
  }, [tokenApp])

  return {
    token: tokenApp,
    isAuthenticated
  }
}

export default useAuthentication
