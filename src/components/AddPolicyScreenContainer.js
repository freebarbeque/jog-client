// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import Text from './Text'
import { BLUE, PINK, WHITE } from '../constants/palette'
import { MARGIN } from '../constants/style'
import { CarOutline } from './images/index'


type AddPolicyScreenContainerProps = {
  title: string,
  onPrevPress?: () => void,
  onNextPress?: () => void,
  onSkipPress?: () => void,
  children: any,
  showPrevButton?: boolean,
  showNextButton?: boolean,
  showSkipButton?: boolean,
  disableNextButton?: boolean,
}

export const NavigationButton = (props) => {
  const { variation, disabled, title, ...rest } = props
  const extraStyle = variation === 'pink' ? styles.pinkButton : styles.grayButton
  const extraTextStyle = variation === 'pink' ? styles.pinkButtonText : styles.grayButtonText

  // The button is wrapped in a container because there is a strange bug where opacity is ignored
  // after the initial render of TouchableOpacity

  return (
    <View
      style={[styles.buttonContainer, { opacity: disabled ? 0.5 : 1 }]}
    >
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
  variation: PropTypes.oneOf(['gray', 'pink'])
}

NavigationButton.defaultProps = {
  variation: 'pink'
}

export default class AddPolicyScreenContainer extends Component {
  props: AddPolicyScreenContainerProps

  static defaultProps = {
    showPrevButton: true,
    showNextButton: true,
    showSkipButton: false,
    disableNextButton: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.entryText}>
            POLICY ENTRY
          </Text>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.content}>
          {this.props.children}
        </View>
        <View style={styles.buttonRow}>
          {this.props.showPrevButton ? <NavigationButton variation="gray" title="Prev" onPress={this.props.onPrevPress} /> : null}
          {this.props.showSkipButton ? <NavigationButton variation="gray" title="Skip this step" onPress={this.props.onSkipPress} /> : null}
          {this.props.showNextButton ? <NavigationButton title="Next" onPress={this.props.onNextPress} disabled={this.props.disableNextButton} /> : null }
        </View>
        <View style={styles.footer}>
          <CarOutline scale={1.1} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: MARGIN.large,
    flex: 1,
    backgroundColor: BLUE,
  },
  header: {
    marginTop: MARGIN.xxl,
    marginBottom: MARGIN.base,
  },
  content: {
    flex: 1,
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
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: MARGIN.small
  },
  buttonRow: {
    flexDirection: 'row'
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
    fontSize: 14
  },
  pinkButtonText: {
    color: WHITE,
    textAlign: 'center'
  },
  grayButtonText: {
    color: 'rgb(109,109,109)'
  }
})

