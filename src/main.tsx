import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right" 
      toastOptions={{
        style: {
          background: '#F5F5DC',
          color: '#1A1A1A',
          border: '1px solid #D4AF37',
        },
      }}
    />
  </StrictMode>,
);
