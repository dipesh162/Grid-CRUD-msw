// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Styles
import './index.css'

async function enableMocking() {
 
  const { worker } = await import('./mocks.js')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}


enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
})
