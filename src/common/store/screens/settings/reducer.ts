import { SettingsScreenAction } from './actions'

export interface ISettingsScreenReduxState {
  activeSection: number | null
}

export default function reducer(
  state: ISettingsScreenReduxState = { activeSection: null },
  action: SettingsScreenAction,
): ISettingsScreenReduxState {
  if (action.type === 'settings/SET_ACTIVE_SECTION') {
    return {
      ...state,
      activeSection: action.activeSection,
    }
  }
  return state
}
