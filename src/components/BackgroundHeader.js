/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Background } from './images/index'
import { MARGIN } from '../constants/style'
import Text from './Text'

type BackgroundHeaderProps = {
  headerText: string,
  subheaderText?: string | null,
}

export default class BackgroundHeader extends Component {
  props: BackgroundHeaderProps

  render() {
    return (
      <Background style={styles.backgroundImage}>
        <View style={styles.backgroundImageOverlay} />
        <View>
          <Text style={styles.header}>
            {this.props.headerText}
          </Text>
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
