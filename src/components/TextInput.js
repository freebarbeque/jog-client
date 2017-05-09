import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { MARGIN } from '../constants/style'
import { WHITE } from '../constants/palette'

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: WHITE,
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    fontSize: 20,
    // borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  disabledInput: {
    opacity: 0.5,
  }
})

export default class JogTextInput extends React.Component {
  render() {
    const { editable, style, ...rest } = this.props

    return (
      <TextInput
        ref={(e) => { this.input = e }}
        style={[styles.input, style || {}]}
        editable={editable}
        underlineColorAndroid="rgba(0,0,0,0.0)"
        {...rest}
      />
    )
  }
}

JogTextInput.propTypes = TextInput.propTypes
JogTextInput.defaultProps = TextInput.defaultProps || {}
