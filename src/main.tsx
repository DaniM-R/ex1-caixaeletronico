import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
