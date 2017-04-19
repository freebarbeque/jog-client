/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import type { PolicyDocument } from '../types'
import { BLUE, DARK_GRAY } from '../constants/palette'
import { MARGIN } from '../constants/style'

import FileIcon from './FileIcon/index'
import Text from './Text'

type PolicyDocumentThumbnailProps = {
  document: PolicyDocument,
  style?: any,
};

export default class PolicyDocumentThumbnail extends Component {
  props: PolicyDocumentThumbnailProps

  render() {
    return (
      <View style={[styles.container, this.props.style || {}]}>
        <View style={styles.thumbnail}>
          <View style={styles.iconContainer}>
            <FileIcon extension={this.props.document.extension} />
          </View>
        </View>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {this.props.document.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    height: 97,
    width: 77,
    marginBottom: MARGIN.base,
    backgroundColor: 'rgb(246,246,246)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  name: {
    color: BLUE,
    overflow: 'hidden',
    fontSize: 11,
    marginLeft: 20,
    marginRight: 20
  },
  iconContainer: {
    height: '50%',
    width: '50%',
  }
})
