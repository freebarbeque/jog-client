import { createRouter } from '@expo/ex-navigation'
import Home from 'jog/src/containers/Home'
import Login from 'jog/src/containers/Login'
import Policies from 'jog/src/containers/Policies'
import Markets from 'jog/src/containers/Markets'
import Settings from 'jog/src/containers/Settings'

const router = createRouter(() => ({
  home: () => Home,
  login: () => Login,
  markets: () => Markets,
  policies: () => Policies,
  settings: () => Settings,
}))

export default router
