export interface ISetActiveSectionAction {
  type: 'settings/SET_ACTIVE_SECTION'
  activeSection: number | null
}

export type SettingsScreenAction = ISetActiveSectionAction

export function setActiveSection(
  activeSection: number | null,
): ISetActiveSectionAction {
  return {
    type: 'settings/SET_ACTIVE_SECTION',
    activeSection,
  }
}
