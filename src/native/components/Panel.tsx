import * as React from 'react'
import { View } from 'react-native'

import { WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

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
