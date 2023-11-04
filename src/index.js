import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from './store/authContext'
import { BrowserRouter, HashRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'))
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <HashRouter>
          <App />
        </HashRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
