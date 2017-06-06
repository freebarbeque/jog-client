import React, { PropTypes } from 'react'
import {
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { PINK, WHITE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

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

const RoundedButton = ({ label, style = {}, loading, ...props }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity style={[styles.touchable]} disabled={loading} {...props}>
      <View style={{ flexDirection: 'row' }}>
        <Text>{label}</Text>
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
)

RoundedButton.propTypes = {
  label: PropTypes.string,
  ...TouchableOpacity.propTypes,
}

export default RoundedButton
