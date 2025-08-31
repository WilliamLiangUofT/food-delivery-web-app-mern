import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import ContextStoreProvider from './context/ContextStore.jsx'
import { Provider } from 'react-redux';
import store from './store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Provider store={store}>

      <ContextStoreProvider>
        <App />
      </ContextStoreProvider>

    </Provider>
  
  </BrowserRouter>
  
)
