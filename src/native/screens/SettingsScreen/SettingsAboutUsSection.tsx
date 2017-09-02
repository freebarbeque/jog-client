import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { BLUE, VERY_LIGHT_GRAY } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import Text from '~/native/components/Text'

class SettingsAboutUsSection extends React.Component<DispatchProp<any>> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero
          felis, condimentum vel dui eu, vulputate aliquam arcu. Donec
          vestibulum mi et metus pellentesque, et convallis nulla mollis. Donec
          non tincidunt tellus. Curabitur suscipit lacus nec turpis pulvinar
          venenatis. Nunc finibus in neque ac tempus. Vestibulum accumsan quis
          lectus vel fermentum. Aenean facilisis elit id efficitur ornare. Donec
          volutpat odio ac dui sagittis lobortis. In posuere quis nulla ut
          maximus. Phasellus volutpat molestie leo, in ultricies mi pulvinar at.
          Vivamus blandit interdum tellus nec ultrices. Morbi aliquet neque sed
          erat varius venenatis. Nam non bibendum diam. Nam id nunc tempus,
          faucibus tellus ornare, egestas felis. Etiam tincidunt dignissim
          tellus, condimentum rhoncus massa placerat sed. Nunc auctor odio a
          arcu fermentum, et pretium felis commodo.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GRAY,
    padding: MARGIN.large,
  },
})

export default connect()(SettingsAboutUsSection)
