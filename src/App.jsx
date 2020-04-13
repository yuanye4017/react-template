import React from 'react'
import { hot } from 'react-hot-loader/root'
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
const AppHot = process.env.NODE_ENV === 'development' ? hot(App) : App

export default AppHot
