import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'material-icons/iconfont/material-icons.css'
import App from './App.jsx'
import { ToastProvider } from './components/Toast.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
)
