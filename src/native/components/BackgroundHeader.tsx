import * as React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { MARGIN } from '~/common/constants/style'

import { WHITE } from '../../common/constants/palette'
import { Background, Chevron } from './images/index'
import Text from './Text'

interface IBackgroundHeaderProps extends DispatchProp<any> {
  headerText: string
  subheaderText?: string | null
  onPress?: () => void
  enableBackPress?: boolean
}

class BackgroundHeader extends React.Component<IBackgroundHeaderProps> {
  public static defaultProps = {
    enableBackPress: true,
  }

  public render() {
    if (this.props.enableBackPress) {
      return (
        <TouchableOpacity onPress={this.props.onPress || this.defaultBack}>
          {this.renderContent()}
        </TouchableOpacity>
      )
    }
    return (
      <View>
        {this.renderContent()}
      </View>
    )
  }

  private defaultBack = () => {
    this.props.dispatch(NavigationActions.back())
  }

  private renderContent() {
    return (
      <Background style={styles.backgroundImage}>
        <View style={styles.backgroundImageOverlay} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.props.enableBackPress &&
              <Chevron
                style={{
                  tintColor: WHITE,
                  marginRight: MARGIN.base,
                  transform: [{ rotate: '90deg' }],
                }}
              />}
            <Text style={styles.header}>
              {this.props.headerText}
            </Text>
          </View>
          {this.props.subheaderText &&
            <Text>
              {this.props.subheaderText}
            </Text>}
        </View>
      </Background>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImageOverlay: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backgroundImage: {
    height: 100,
    resizeMode: 'cover',
    width: null,
    justifyContent: 'center',
    padding: MARGIN.large,
  },
  header: {
    fontSize: 20,
  },
})

export default connect()(BackgroundHeader)
