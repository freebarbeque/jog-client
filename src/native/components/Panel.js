import React from 'react'
import { View } from 'react-native'

import { WHITE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

export default props =>
  <View
    style={[
      {
        backgroundColor: WHITE,
        marginTop: MARGIN.base,
        marginBottom: MARGIN.base,
        padding: MARGIN.base,
      },
      props.style || {},
    ]}
  >
    {props.children}
  </View>
