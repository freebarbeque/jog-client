import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import Text from '~/native/components/Text'

class Markets extends React.Component<DispatchProp<any>> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>Markets</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.base,
  },
})

export default connect()(Markets)
