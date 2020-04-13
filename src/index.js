import React from 'react'
import ReactDOM from 'react-dom'

import 'lib-flexible'
import 'normalize.css/normalize.css' // 重置css样式
import './styles/index.scss'

import AppHot from './App'

ReactDOM.render(
  <React.StrictMode>
    <AppHot />
  </React.StrictMode>,
  document.getElementById('root')
)
