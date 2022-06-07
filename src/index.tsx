import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AppProvider } from './context/store'
// for the service worker
import * as registerServiceWorker from './registerServiceWorker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
 // <React.StrictMode>
 <AppProvider>
  <App />
 </AppProvider>,
 // </React.StrictMode>
)

// Register the service worker for the PWA
registerServiceWorker.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
