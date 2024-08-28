import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ModalContextProvider } from './context/ModalContext.jsx'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AuthContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </AuthContextProvider>
  )
