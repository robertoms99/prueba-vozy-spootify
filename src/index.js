import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import CoreLayout from './common/layouts/CoreLayout'
import './styles/_main.scss'
import { Provider } from './common/context/AuthenticationContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
