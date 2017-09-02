import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { connect, DispatchProp } from 'react-redux'

import { BLUE, CREAM, WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { setActiveSection } from '~/common/store/screens/settings/actions'
import { IReduxState } from '~/common/types'
import Text from '~/native/components/Text'

import AnimatedChevron from './AnimatedChevron'
import SettingsAboutUsSection from './SettingsAboutUsSection'
import SettingsNotificationsSection from './SettingsNotificationsSection'
import SettingsPrivacyPolicySection from './SettingsPrivacyPolicySection'
import SettingsProfileSection from './SettingsProfileSection'
import SettingsTermsAndConditionsSection from './SettingsTermsAndConditionsSection'

interface ISettingsProps extends DispatchProp<any> {
  activeSection: number | null
}

interface IAccordionSection {
  title: string
  component: any
}

const ACCORDION_SECTIONS: IAccordionSection[] = [
  { title: 'My profile', component: SettingsProfileSection },
  { title: 'Notifications', component: SettingsNotificationsSection },
  { title: 'About us', component: SettingsAboutUsSection },
  {
    title: 'Terms and conditions',
    component: SettingsTermsAndConditionsSection,
  },
  { title: 'Privacy policy', component: SettingsPrivacyPolicySection },
]

class SettingsScreen extends React.Component<ISettingsProps> {
  public render() {
    return (
      <ScrollView style={styles.container}>
        <Accordion
          sections={ACCORDION_SECTIONS}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          activeSection={this.props.activeSection}
          onChange={(index: number) => {
            this.props.dispatch(setActiveSection(index))
          }}
        />
      </ScrollView>
    )
  }

  private renderHeader = (
    section: IAccordionSection,
    index: number,
    isActive: boolean,
  ) => {
    const isFirst = index === 0
    const isLast = index === ACCORDION_SECTIONS.length - 1

    // Must wrap in a View to avoid setNativeProps error on TouchableOpacity used by react-collapsible
    const extraPolicyHeaderStyles = {
      borderTopWidth: isFirst ? 2 : 1,
      borderBottomWidth: isActive ? 0 : isLast ? 2 : 1,
    }

    return (
      <View style={[styles.policyHeader, extraPolicyHeaderStyles]}>
        <Text style={styles.policyHeaderText}>
          {section.title}
        </Text>
        <AnimatedChevron rotation={isActive ? 'up' : 'down'} />
      </View>
    )
  }

  private renderContent = (section: IAccordionSection) => {
    const Comp = section.component
    return <Comp />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.base,
    backgroundColor: CREAM,
  },
  policyHeader: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: MARGIN.large,
    borderRightColor: 'rgb(234,234,234)',
    borderRightWidth: 2,
    borderLeftColor: 'rgb(234,234,234)',
    borderLeftWidth: 2,
    borderBottomColor: 'rgb(205,205,205)',
    borderTopColor: 'rgb(205,205,205)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  policyHeaderText: {
    fontSize: 16,
    color: BLUE,
    margin: MARGIN.large,
    flex: 1,
  },
})

const mapStateToProps = (state: IReduxState) => ({
  activeSection: state.screens.settings.activeSection,
})

export default connect(mapStateToProps)(SettingsScreen)
