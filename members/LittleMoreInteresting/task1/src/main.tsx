import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <NextUIProvider>
        <App />
        <Toaster position="bottom-right"  expand={true}
                     toastOptions={{
                         classNames: {
                             error: 'bg-red-400',
                             success: 'bg-green-400',
                             warning: 'bg-yellow-400',
                             info: 'bg-blue-400',
                         },
                     }}/>
     </NextUIProvider>
  </React.StrictMode>,
)
