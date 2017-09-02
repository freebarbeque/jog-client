import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { Dispatch, INavReduxState, IReduxState } from '~/common/types'

import * as _ from 'lodash'
import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { NavigationButton } from '~/native/components/AddPolicyScreenContainer'
import { CarOutline } from '~/native/components/images/index'
import Text from '~/native/components/Text'

interface IFinishedScreenProps extends DispatchProp<any> {
  nav: INavReduxState
}

class FinishedScreen extends React.Component<IFinishedScreenProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {"Thanks, we've set up a basic account for you."}
        </Text>
        <View style={styles.content} />
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            marginBottom: MARGIN.extraLarge,
          }}
        >
          <NavigationButton title="Finish" onPress={this.handleFinishPress} />
        </View>
        <View style={styles.footer}>
          <CarOutline scale={1.1} />
        </View>
      </View>
    )
  }

  private hideModal = () => {
    const routes = this.props.nav.routes
    const addPolicyRouteName = 'ManualAddPolicy'

    const manualAddPolicyRoute = _.find(
      routes,
      route => route.routeName === addPolicyRouteName,
    )
    if (manualAddPolicyRoute) {
      const key = manualAddPolicyRoute.key
      this.props.dispatch(NavigationActions.back({ key }))
    } else {
      throw new Error(`Could not find route with name ${addPolicyRouteName}`)
    }

    // Back to the list of policies
    this.props.dispatch(NavigationActions.back())
  }

  private handleFinishPress = () => {
    this.hideModal()
  }
}

const mapStateToProps = (state: IReduxState) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(FinishedScreen)

const styles = StyleSheet.create({
  container: {
    padding: MARGIN.large,
    flex: 1,
    backgroundColor: BLUE,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    marginTop: MARGIN.extraLarge,
  },
  content: {
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN.large,
    marginBottom: MARGIN.xxl,
  },
})
