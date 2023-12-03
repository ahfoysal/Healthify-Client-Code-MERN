import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './hooks/ThemeProviderContext.tsx';
import AuthProvider from './hooks/AuthContextProvider.tsx';
import 'react-datepicker/dist/react-datepicker.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
              <RouterProvider router={routes} />

              <Toaster
                position="bottom-left"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </NextUIProvider>
    </HelmetProvider>
  </React.StrictMode>
);
