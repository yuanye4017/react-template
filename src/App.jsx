import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import Router from './router'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
