import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import config from '../../config'
import SideBar from '../components/SideBar'
import Player from '../components/Player'

const authenticate = async () => {
  const { authUrl, clientId, clientSecret } = config.api
  const url = authUrl
  const headers = {
    Authorization: `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: 'grant_type=client_credentials'
  })

  const bodyResponse = await response.json()
  return bodyResponse.access_token
}

function CoreLayout({ children, history }) {
  const [tokenApp] = useState(() => window.localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(tokenApp !== null)

  useEffect(() => {
    if (tokenApp === null) {
      authenticate().then((token) => {
        if (token) {
          setIsAuthenticated(true)
          window.localStorage.setItem('token', token)
        }
      })
    }
  }, [tokenApp])

  return (
    <div className="main">
      {isAuthenticated && (
        <>
          <SideBar />
          <div className="main__content">
            <Header history={history} />
            <div className="main__content__child">{children}</div>
          </div>
          <Player />
        </>
      )}
    </div>
  )
}

export default CoreLayout
