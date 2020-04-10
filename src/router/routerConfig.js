import Layout from '../layout'
import Home from '../pages/Home'
import Error from '../pages/404'
import Child from '../components/Childs'
import First from '../components/Childs/First'
import Second from '../components/Childs/Second'
import Other from '../components/Other'
import Setting from '../components/Set'

const routes = [{
  path: '/error',
  component: Error
}, {
  path: '/',
  component: Layout,
  routes: [{
    path: '/home',
    component: Home,
    routes: []
  },
  {
    path: '/child',
    component: Child,
    routes: [{
      path: '/child/first',
      component: First,
      routes: []
    },
    {
      path: '/child/second',
      component: Second,
      routes: []
    }
    ]
  },
  {
    path: '/other',
    component: Other,
    routes: []
  },
  {
    path: '/set',
    component: Setting,
    routes: []
  }]
}]

export default routes
