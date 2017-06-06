/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { PINK, WHITE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

import Text from './Text'

type RadioInputProps = {
  options: {
    // eslint-disable-next-line react/no-unused-prop-types
    label: string,
    value: string,
  }[],
  value: string,
  onChange: (value: string) => void,
  style?: any,
}

export default class RadioInput extends Component {
  props: RadioInputProps

  render() {
    const { options, onChange, style, value } = this.props

    return (
      <View style={[styles.container, style || {}]}>
        <View>
          {options.map(o =>
            <TouchableOpacity
              key={o.value}
              style={styles.touchable}
              onPress={() => onChange(o.value)}
            >
              <View style={styles.radio}>
                {o.value === value ? <View style={styles.innerRadio} /> : null}
              </View>
              <Text style={styles.label}>
                {o.label}
              </Text>
            </TouchableOpacity>,
          )}
        </View>
      </View>
    )
  }
}

//
// Styles
//

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRadio: {
    backgroundColor: PINK,
    height: 16,
    width: 16,
    borderRadius: 16,
  },
  label: {
    fontSize: 21,
    marginLeft: MARGIN.base,
  },
  touchable: {
    flexDirection: 'row',
    marginBottom: MARGIN.base,
  },
})
