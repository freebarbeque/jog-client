import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { MARGIN } from '../constants/style'
import { WHITE } from '../constants/palette'

const styles = StyleSheet.create({
  input: {
    marginTop: MARGIN.base,
    height: 60,
    backgroundColor: WHITE,
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    fontSize: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  disabledInput: {
    opacity: 0.5,
  }
})

const JogTextInput = (props) => {
  const { editable, style, ...rest } = props

  return (
    <TextInput
      ref={(e) => { this.input = e }}
      style={styles.input}
      editable={editable}
      underlineColorAndroid="rgba(0,0,0,0.0)"
      {...rest}
    />
  )
}

JogTextInput.propTypes = TextInput.propTypes
JogTextInput.defaultProps = TextInput.defaultProps || {}

export default JogTextInput
