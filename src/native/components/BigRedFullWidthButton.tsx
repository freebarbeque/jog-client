import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import { Chevron } from './images/index'

interface IProps {
  onPress?: () => void
  children?: any
  style?: any
  hideChevron?: boolean
}

export default class BigRedFullWidthButton extends React.Component<IProps> {
  public render() {
    return (
      <TouchableOpacity
        style={[styles.touchable, this.props.style || {}]}
        onPress={this.props.onPress}
      >
        <View style={styles.content}>
          {this.props.children}
        </View>
        {!this.props.hideChevron
          ? <View>
              <Chevron style={styles.chevron} />
            </View>
          : null}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: PINK,
    height: 60,
    alignItems: 'center',
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    flexDirection: 'row',
  },
  chevron: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
  content: {
    flex: 1,
    marginRight: MARGIN.base,
  },
})
