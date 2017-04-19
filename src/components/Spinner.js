import React from 'react'
import { View } from 'react-native'
import SpinKit from 'react-native-spinkit'
import Text from './Text'
import { BLUE } from '../constants/palette'
import { MARGIN } from '../constants/style'

export default (props) => (
  <View style={[{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, props.style]}>
    <SpinKit type="Bounce" color={BLUE} size={60} />
    <Text style={{ color: BLUE, marginTop: MARGIN.large }}>
      {props.text}
    </Text>
  </View>
)
