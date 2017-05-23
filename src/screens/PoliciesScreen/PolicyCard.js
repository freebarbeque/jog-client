// @flow
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {
  BLUE,
  DARK_GRAY,
  VERY_LIGHT_GRAY,
  WHITE,
} from 'jog/src/constants/palette'
import { Ellipses } from 'jog/src/components/images/index'
import Text from 'jog/src/components/Text'
import { MARGIN } from 'jog/src/constants/style'

export type PolicyCardProps = {
  title: string,
  onMenuPress?: () => void,
  onPress?: () => void,
  image: any,
  topImage?: any,
  bottomImage?: any,
  description: string,
}

export default class PolicyCard extends Component {
  props: PolicyCardProps

  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.onPress}>
        <View
          style={{
            backgroundColor: 'rgb(164,169,174)',
            height: 161,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {this.props.topImage}
          {this.props.onMenuPress
            ? <TouchableOpacity
                onPress={this.props.onMenuPress}
                style={{
                  position: 'absolute',
                  top: MARGIN.base,
                  right: MARGIN.base,
                }}
              >
                <Ellipses />
              </TouchableOpacity>
            : null}
        </View>
        <View
          style={{ padding: MARGIN.base, height: 104, alignItems: 'center' }}
        >
          <View style={styles.companyLogo}>
            <View style={styles.companyLogoOverflowWrapper}>
              {this.props.image}
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.nameText}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgb(236, 237, 239)',
            height: 58,
            flexDirection: 'row',
            alignItems: 'center',
            padding: MARGIN.base,
          }}
        >
          <Text
            style={[
              styles.descriptionText,
              { textAlign: this.props.bottomImage ? 'left' : 'center' },
            ]}
          >
            {this.props.description}
          </Text>
          {this.props.bottomImage}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 4,
    borderColor: VERY_LIGHT_GRAY,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: MARGIN.large,
  },
  companyLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: WHITE,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 50,
  },
  // companyLogo with overflow: hidden hides the shadow for some reason...
  companyLogoOverflowWrapper: {
    overflow: 'hidden',
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  nameText: {
    color: BLUE,
    fontWeight: '600',
    fontSize: 17,
    position: 'relative',
    bottom: 20,
  },
  descriptionText: {
    color: BLUE,
    fontWeight: '400',
    fontSize: 13.28,
    flex: 1,
  },
})
