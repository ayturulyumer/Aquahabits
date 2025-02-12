import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./scss/utils/_index.scss"
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="796481363622-79rpqlddalcv14uvien211t4l8fao052.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
