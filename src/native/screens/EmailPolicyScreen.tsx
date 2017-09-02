import * as React from 'react'
import { Clipboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import FadeInView from 'react-native-fade-in-view'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { BLUE, PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { IFirebaseUser, IReduxState } from '~/common/types'

import { Cancel, Logo } from '../components/images'
import Text from '../components/Text'

interface IProps extends DispatchProp<any> {
  user: IFirebaseUser
}

interface IState {
  copiedToClipboard: boolean
}

class EmailPolicyScreen extends React.Component<IProps, IState> {
  public static navigationOptions = ({ navigation }) => {
    const { dispatch } = navigation

    return {
      headerTitle: <View />,
      headerLeft: (
        <Logo
          style={{
            marginLeft: MARGIN.large,
            marginTop: MARGIN.large,
          }}
          scale={1}
        />
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: MARGIN.large, marginTop: MARGIN.base }}
          onPress={() => dispatch(NavigationActions.back())}
        >
          <Cancel />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: BLUE },
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      copiedToClipboard: false,
    }
  }

  public handleEmailClick = () => {
    this.setState({ copiedToClipboard: true })
    Clipboard.setString('policies@jog.insure')
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>
          Using the address associated with your account (
          {this.props.user.email}
          ) please send an email to the address below, attaching all relevant
          policy documents
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          onPress={this.handleEmailClick}
        >
          <Text style={styles.email}>policies@jog.insure</Text>
        </TouchableOpacity>
        <View>
          <Text>
            {
              "We'll let you know by email once your policy has been added to your account"
            }
          </Text>
        </View>
        {this.state.copiedToClipboard
          ? <FadeInView duration={300} style={{ marginTop: MARGIN.large }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: PINK }}>
                Email address copied to clipboard
              </Text>
            </FadeInView>
          : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE,
    flex: 1,
    padding: MARGIN.large,
  },
  email: {
    fontSize: 20,
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
})

const mapStateToProps = (state: IReduxState) => ({ user: state.auth.user })

export default connect(mapStateToProps)(EmailPolicyScreen)
