import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import RoundedButton from '~/native/components/RoundedButton'
import Text from '~/native/components/Text'

class ConfirmPasswordResetScreen extends React.Component<DispatchProp<any>> {
  public render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            width: windowWidth,
            justifyContent: 'center',
          }}
        >
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>Password Reset</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.description}>
                We just sent you an email through which you can reset your
                password.
              </Text>
            </View>
          </View>
          <RoundedButton
            style={{ marginTop: MARGIN.large }}
            label={'Back'}
            onPress={this.goBack}
          />
        </View>
      </View>
    )
  }

  private goBack = () => {
    this.props.dispatch(NavigationActions.back())
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingTop: 20,
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerLogo: {
    marginTop: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 20,
    fontWeight: '300',
  },
  description: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 14,
    fontWeight: '300',
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
  },
})

export default connect()(ConfirmPasswordResetScreen)
