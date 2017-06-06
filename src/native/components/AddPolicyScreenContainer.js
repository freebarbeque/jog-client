// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { BLUE, PINK, WHITE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

import Text from './Text'
import { CarOutline } from './images'

type AddPolicyScreenContainerProps = {
  title: string,
  onPrevPress?: () => void,
  onNextPress?: () => void,
  onSkipPress?: () => void,
  children?: any,
  showPrevButton?: boolean,
  showNextButton?: boolean,
  showSkipButton?: boolean,
  disableNextButton?: boolean,
}

type AddPolicyScreenContainerState = {
  keyboardHeight: number,
}

export const NavigationButton = (props: $Subtype<Object>) => {
  const { variation, disabled, title, ...rest } = props
  const extraStyle = variation === 'pink'
    ? styles.pinkButton
    : styles.grayButton
  const extraTextStyle = variation === 'pink'
    ? styles.pinkButtonText
    : styles.grayButtonText

  // The button is wrapped in a container because there is a strange bug where opacity is ignored
  // after the initial render of TouchableOpacity

  return (
    <View style={[styles.buttonContainer, { opacity: disabled ? 0.5 : 1 }]}>
      <TouchableOpacity
        style={[styles.button, extraStyle]}
        disabled={disabled}
        {...rest}
      >
        <Text style={[styles.buttonText, extraTextStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

NavigationButton.propTypes = {
  ...TouchableOpacity.propTypes,
  title: PropTypes.string.isRequired,
  variation: PropTypes.oneOf(['gray', 'pink']),
}

NavigationButton.defaultProps = {
  variation: 'pink',
}

export default class AddPolicyScreenContainer extends Component {
  props: AddPolicyScreenContainerProps
  state: AddPolicyScreenContainerState
  static defaultProps = {
    showPrevButton: true,
    showNextButton: true,
    showSkipButton: false,
    disableNextButton: false,
  }

  constructor(props: AddPolicyScreenContainerProps) {
    super(props)
    this.state = {
      keyboardHeight: 0,
    }
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.handleKeyboardDidShow)
    Keyboard.removeListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  handleKeyboardDidShow = (e: any) => {
    this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  handleKeyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 })
  }

  onPrevPress = () => {
    Keyboard.dismiss()
    if (this.props.onPrevPress) this.props.onPrevPress()
  }

  onNextPress = () => {
    Keyboard.dismiss()
    if (this.props.onNextPress) this.props.onNextPress()
  }

  onSkipPress = () => {
    Keyboard.dismiss()
    if (this.props.onSkipPress) this.props.onSkipPress()
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
          minHeight: this.state.keyboardHeight ? 334 : undefined,
        }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            marginBottom: MARGIN.base,
          }}
        >
          <Text style={styles.entryText}>
            POLICY ENTRY
          </Text>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
        <View style={styles.buttonRow}>
          {this.props.showPrevButton
            ? <NavigationButton
                variation="gray"
                title="Prev"
                onPress={this.onPrevPress}
              />
            : null}
          {this.props.showSkipButton
            ? <NavigationButton
                variation="gray"
                title="Skip this step"
                onPress={this.onSkipPress}
              />
            : null}
          {this.props.showNextButton
            ? <NavigationButton
                title="Next"
                onPress={this.onNextPress}
                disabled={this.props.disableNextButton}
              />
            : null}
        </View>
        <View style={styles.footer}>
          <CarOutline scale={1.1} />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: MARGIN.large,
    flex: 1,
    backgroundColor: BLUE,
    flexDirection: 'column',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN.large,
    marginBottom: MARGIN.xxl,
  },
  entryText: {
    fontSize: 11,
    color: PINK,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: MARGIN.small,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  grayButton: {
    backgroundColor: WHITE,
  },
  pinkButton: {
    backgroundColor: PINK,
  },
  buttonContainer: {
    flex: 1,
    margin: MARGIN.base,
    borderRadius: 20,
    justifyContent: 'center',
    height: 60,
  },
  button: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: MARGIN.base,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
  },
  pinkButtonText: {
    color: WHITE,
    textAlign: 'center',
  },
  grayButtonText: {
    color: 'rgb(109,109,109)',
  },
})
