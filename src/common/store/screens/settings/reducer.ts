import { SettingsScreenAction } from './actions'

export type SettingsScreenReduxState = {
  activeSection: number | null
}

export default function reducer(
  state: SettingsScreenReduxState = { activeSection: null },
  action: SettingsScreenAction,
): SettingsScreenReduxState {
  if (action.type === 'settings/SET_ACTIVE_SECTION') {
    return {
      ...state,
      activeSection: action.activeSection,
    }
  }
  return state
}
