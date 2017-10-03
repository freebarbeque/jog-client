import * as React from 'react'
import { Animated, Easing } from 'react-native'

interface IProps {
  rotation?: 'up' | 'down'
}

interface IState {
  spinValue: Animated.Value
}

export default class AnimatedChevron extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      spinValue: new Animated.Value(props.rotation === 'down' ? 0 : 1),
    }
  }

  public componentWillUpdate(nextProps) {
    if (this.props.rotation !== nextProps.rotation) {
      if (nextProps.rotation === 'up') {
        Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.cubic,
        }).start()
      } else if (nextProps.rotation === 'down') {
        Animated.timing(this.state.spinValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.cubic,
        }).start()
      }
    }
  }

  public render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    return (
      <Animated.Image
        style={{ height: 10, width: 12, transform: [{ rotate: spin }] }}
        source={require('../../components/images/chevron.png')}
      />
    )
  }
}
