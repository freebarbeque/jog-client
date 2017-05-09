// A Text Input with a label.

import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { WHITE, PINK } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

import Text from './Text'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  container: {
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
    marginBottom: MARGIN.large,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    marginTop: MARGIN.base,
    height: 60,
    backgroundColor: WHITE,
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent'
  },
  errorInput: {
    borderColor: PINK,
  },
  errorText: {
    color: PINK,
    fontSize: 11,
  },
  disabledInput: {
    opacity: 0.5,
  }
})

class LabelledTextInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onTab: PropTypes.func,
    ...TextInput.propTypes,
  }

  focus() {
    return this.input.focus()
  }

  blur() {
    return this.input.blur()
  }

  render() {
    const { label = '', error = null, editable, onChangeText, ...props } = this.props
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          {label && <Text style={styles.label} weight="bold">
            {label.toUpperCase()}
          </Text>}
          <View style={{ flex: 1 }} />
          {error && <View>
            <Text style={styles.errorText}>
              {error} <Icon name="exclamation-triangle" size={11} color={PINK} style={{ marginLeft: MARGIN.base }} />
            </Text>
          </View>}
        </View>
        <TextInput
          ref={(e) => { this.input = e ? e.input : null }}
          editable={editable}
          onChangeText={(text) => {
            // This is buggy as the tab appears before quickly being removed,
            // however this doesn't really matter as it's only for dev.
            // Unlikely to use the tab character on actual devices.
            if (_.last(text) === '\t') {
              this.blur()
              if (props.onSubmitEditing) {
                props.onSubmitEditing()
              }
            } else if (onChangeText) onChangeText(text)
          }}
          {...props}
        />
      </View>
    )
  }
}


export default LabelledTextInput
