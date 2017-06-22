import type { NavReduxState } from '../../common/types'

export function getRouteKey(
  nav: NavReduxState,
  routeName: string,
): string | null {
  let route: any = nav

  while (route != null && route.index != null && route.routes != null) {
    if (route.routeName === routeName) {
      return route.key
    }
    route = route.routes[route.index]
  }

  return null
}
