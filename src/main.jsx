import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function AppWithPreloader() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.remove();
        }, 400);
      }, 500);
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithPreloader />
  </StrictMode>,
)
