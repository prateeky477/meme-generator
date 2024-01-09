import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ImgProvider from './context/ImageContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import ColorProvider from './context/ColorContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <AuthProvider>
    <ImgProvider>
        <ColorProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ColorProvider>
    </ImgProvider>
  </AuthProvider>
  </ChakraProvider>,
)
