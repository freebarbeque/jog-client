import * as React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: WHITE,
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    fontSize: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    fontFamily: 'WorkSans-Regular',
  },
  disabledInput: {
    opacity: 0.5,
  },
})

export default class JogTextInput extends React.Component<any> {
  private input: any

  public render() {
    const { editable, style, ...rest } = this.props

    return (
      <TextInput
        ref={e => {
          this.input = e
        }}
        style={[styles.input, style || {}]}
        editable={editable}
        underlineColorAndroid="rgba(0,0,0,0.0)"
        {...rest}
      />
    )
  }
}
