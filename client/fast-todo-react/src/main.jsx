import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' //this adds bootstrap to entire project


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App />  
  </StrictMode>,
)
