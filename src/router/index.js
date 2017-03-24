import { createRouter } from '@expo/ex-navigation'
import Home from 'containers/Home'
import Login from 'containers/Login'
import Policies from 'containers/Policies'
import Markets from 'containers/Markets'
import Settings from 'containers/Settings'

const router = createRouter(() => ({
  home: () => Home,
  login: () => Login,
  markets: () => Markets,
  policies: () => Policies,
  settings: () => Settings,
}))

export default router
