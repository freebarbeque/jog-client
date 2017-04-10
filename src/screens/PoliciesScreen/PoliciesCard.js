// @flow
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Camera, Command, Mail } from '../../components/images/index'
import { BLUE, DARK_GRAY, PINK, VERY_LIGHT_GRAY, WHITE } from '../../constants/palette'
import { MARGIN } from '../../constants/style'

export type PoliciesCardProps = {
  onEmailPress: () => void,
  onPhotographPress: () => void,
  onManualPress: () => void,
}

export default class PoliciesCard extends Component {
  props: PoliciesCardProps

  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={this.props.onEmailPress}
        >
          <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
            <Text style={styles.recommendedText}>
              Recommended
            </Text>
            <Text style={[styles.cardButtonText, { flex: 0 }]}>
              Email the policy
            </Text>
          </View>
          <Mail />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={this.props.onPhotographPress}
        >
          <Text style={styles.cardButtonText}>
            Photograph your policy
          </Text>
          <Camera />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cardButton, { borderBottomWidth: 0 }]}
          onPress={this.props.onManualPress}
        >
          <Text style={styles.cardButtonText}>
            Manual entry
          </Text>
          <Command />
        </TouchableOpacity>

      </View>
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
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 3
  },
  cardButton: {
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    borderBottomWidth: 1,
    borderBottomColor: VERY_LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    height: 65
  },
  cardButtonText: {
    color: BLUE,
    fontSize: 16,
    flex: 1
  },
  recommendedText: {
    color: PINK,
    fontSize: 11,
  },
})
