import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { rootReducer } from './features/rootreducer'


const store = configureStore({
  reducer : rootReducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router>
    <Provider store={store}>
      <App />
    </Provider>
   </Router>
  </React.StrictMode>,
)
