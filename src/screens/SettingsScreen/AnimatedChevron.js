import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'

export default class AnimatedChevron extends Component {
  static propTypes = {
    rotation: PropTypes.oneOf(['up', 'down'])
  }

  constructor(props) {
    super(props)
    this.state = {
      spinValue: new Animated.Value(props.rotation === 'down' ? 0 : 1)
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.rotation !== nextProps.rotation) {
      if (nextProps.rotation === 'up') {
        Animated.timing(
          this.state.spinValue,
          {
            toValue: 1,
            duration: 250,
            easing: Easing.cubic
          }
        ).start()
      } else if (nextProps.rotation === 'down') {
        Animated.timing(
          this.state.spinValue,
          {
            toValue: 0,
            duration: 250,
            easing: Easing.cubic
          }
        ).start()
      }
    }
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    return (
      <Animated.Image
        style={{ height: 10, width: 12, transform: [{ rotate: spin }] }}
        source={require('../../components/images/chevron.png')}
      />
    )
  }
}
