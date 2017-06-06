import React from 'react'
import { View } from 'react-native'
import SpinKit from 'react-native-spinkit'

import { BLUE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

import Text from './Text'

export default props =>
  <View
    style={[
      {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      props.style,
    ]}
  >
    <SpinKit type="Bounce" color={BLUE} size={60} />
    <Text style={{ color: BLUE, marginTop: MARGIN.large, textAlign: 'center' }}>
      {props.text}
    </Text>
  </View>
