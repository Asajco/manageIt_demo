import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from './store/authContext'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { TimerProvider } from './store/TimeContext'
const root = ReactDOM.createRoot(document.getElementById('root'))
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TimerProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <HashRouter>
            <App />
          </HashRouter>
        </ChakraProvider>
      </TimerProvider>
    </AuthProvider>
  </React.StrictMode>,
)
