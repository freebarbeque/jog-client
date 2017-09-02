import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { PINK } from '~/common/constants/palette'
import { Background } from '~/native/components/images/index'
import Jumbotron from '~/native/components/Jumbotron'
import Text from '~/native/components/Text'

interface IProps {
  onGetStartedPress: () => void
}

export default class GetStartedScreen extends React.Component<IProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Background style={styles.backgroundImage}>
          <View style={styles.backgroundImageOverlay} />
          <Jumbotron />
        </Background>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onGetStartedPress}
        >
          <View>
            <Text>Add your motor policy to get started</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: 'default',
    height: 'default',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImageOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  button: {
    backgroundColor: PINK,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
