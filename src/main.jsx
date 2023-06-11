import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ImgProvider from './context/imageContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import ColorProvider from './context/ColorContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <ImgProvider>
  <ColorProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ColorProvider>
  </ImgProvider>
  </ChakraProvider>,
)
