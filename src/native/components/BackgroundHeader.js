/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { MARGIN } from 'jog/src/common/constants/style'

import { Background, Chevron } from './images/index'
import Text from './Text'
import { Dispatch } from '../../common/types'
import { WHITE } from '../../common/constants/palette'

type BackgroundHeaderProps = {
  headerText: string,
  subheaderText?: string | null,
  onPress?: () => void,
  dispatch: Dispatch,
  enableBackPress?: boolean,
}

class BackgroundHeader extends Component {
  props: BackgroundHeaderProps

  static defaultProps = {
    enableBackPress: true,
  }

  defaultBack = () => {
    this.props.dispatch(NavigationActions.back())
  }

  renderContent() {
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

  render() {
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
