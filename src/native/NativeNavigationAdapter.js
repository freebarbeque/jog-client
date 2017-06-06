import { NavigationActions } from 'react-navigation'

import type { NavigationAdapter } from '../types'
import { getStore } from '../common/store/index'

export class NativeNavigationAdapter implements NavigationAdapter {
  static navigateToAuthFinished() {
    return NavigationActions.navigate({ routeName: 'Finished' })
  }

  static navigateToAuth() {
    return NavigationActions.navigate({ routeName: 'Auth' })
  }

  static navigateToPolicyDetails(policyId: string, policyIndex: number) {
    return NavigationActions.navigate({
      routeName: 'PolicyDetails',
      params: {
        policyId,
        policyIndex,
      },
    })
  }

  static navigateToEmailVerification() {
    return NavigationActions.navigate({
      routeName: 'EmailVerification',
    })
  }

  static navigateToConfirmPasswordReset() {
    return NavigationActions.navigate({
      routeName: 'ConfirmPasswordReset',
    })
  }

  static hideAuthModal() {
    const state = getStore().getState()
    const index = state.nav.index
    const key = state.nav.routes[index].key
    return NavigationActions.back({ key })
  }
}
