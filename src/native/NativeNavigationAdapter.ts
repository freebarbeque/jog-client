import { NavigationActions } from 'react-navigation'

import { getStore } from '../common/store/index'

export class NativeNavigationAdapter {
  public static navigateToAuthFinished() {
    return NavigationActions.navigate({ routeName: 'Finished' })
  }

  public static navigateToAuth() {
    return NavigationActions.navigate({ routeName: 'Auth' })
  }

  public static navigateToPolicyDetails(
    policyId: string,
    policyIndex: number,
    showDocuments: boolean,
  ) {
    const navigationOptions = {
      routeName: 'PolicyDetails',
      params: {
        policyId,
        policyIndex,
        showDocuments,
      },
    }

    return NavigationActions.navigate(navigationOptions)
  }

  public static navigateToPolicyFinished() {
    return NavigationActions.navigate({
      routeName: 'Finished',
    })
  }

  public static navigateToEmailVerification() {
    return NavigationActions.navigate({
      routeName: 'EmailVerification',
    })
  }

  public static navigateToConfirmPasswordReset() {
    return NavigationActions.navigate({
      routeName: 'ConfirmPasswordReset',
    })
  }

  public static hideAuthModal() {
    const state = getStore().getState()
    const index = state.nav.index
    const key = state.nav.routes[index].key
    return NavigationActions.back({ key })
  }
}
