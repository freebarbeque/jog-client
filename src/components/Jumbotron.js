// @flow

import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { MARGIN } from '../constants/style'
import { PINK } from '../constants/palette'

import Text from './Text'

export default class Jumbotron extends Component {
  render() {
    return (
      <View style={styles.jumbotron}>
        <Text style={styles.headerText}>
          your
        </Text>
        <Text style={styles.headerText}>
          insurance
        </Text>
        <Text style={styles.headerText}>
          memory
        </Text>
        <View style={styles.divider} />
        <Text style={styles.listText}>
          store your policies
        </Text>
        <Text style={styles.listText}>
          minimise your premiums
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  divider: {
    width: 25,
    height: 4,
    backgroundColor: PINK,
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large,
  },
  jumbotron: {
    alignItems: 'center',
    paddingTop: MARGIN.large,
    paddingBottom: MARGIN.extraLarge,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '600',
    ...Platform.select({
      android: {
        lineHeight: 40,
      },
      ios: {
        lineHeight: 36,
      },
    }),
    backgroundColor: 'transparent',
  },
  listText: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
})
