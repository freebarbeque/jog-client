import * as React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { PINK, WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import Text from './Text'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large,
  },
  touchable: {
    backgroundColor: PINK,
    width: 120,
    height: 40,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const RoundedButton = ({ label = '', style = {}, loading = false, ...props }) =>
  <View style={[styles.container, style]}>
    <TouchableOpacity style={[styles.touchable]} disabled={loading} {...props}>
      <View style={{ flexDirection: 'row' }}>
        <Text>
          {label}
        </Text>
        {loading &&
          <ActivityIndicator
            animating
            color={WHITE}
            style={{ height: 20, marginLeft: MARGIN.base }}
            size="small"
          />}
      </View>
    </TouchableOpacity>
  </View>

export default RoundedButton
