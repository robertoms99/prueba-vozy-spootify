import React, { useContext } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Player from '../components/Player'
import AuthenticationContext from '../context/AuthenticationContext'

function CoreLayout({ children, history }) {
  const { isAuthenticated } = useContext(AuthenticationContext)

  return (
    <div className="main">
      {isAuthenticated ? (
        <>
          <SideBar />
          <div className="main__content">
            <Header history={history} />
            <div className="main__content__child">{children}</div>
          </div>
          <Player />
        </>
      ) : (
        <h1>ERROR EN LA AUTENTICACION</h1>
      )}
    </div>
  )
}

export default CoreLayout
