// @flow

export type SetActiveSectionAction = {
  type: 'settings/SET_ACTIVE_SECTION',
  activeSection: number | null,
}

export type SettingsScreenAction = SetActiveSectionAction

export function setActiveSection(
  activeSection: number | null,
): SetActiveSectionAction {
  return {
    type: 'settings/SET_ACTIVE_SECTION',
    activeSection,
  }
}
