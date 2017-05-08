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
}

const NavigationButton = (props) => {
  const extraStyle = props.variation === 'pink' ? styles.pinkButton : styles.grayButton
  const extraTextStyle = props.variation === 'pink' ? styles.pinkButtonText : styles.grayButtonText

  return (
    <TouchableOpacity
      style={[styles.button, extraStyle]}
      {...props}
    >
      <Text style={[styles.buttonText, extraTextStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
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
            {this.props.showNextButton ? <NavigationButton title="Next" onPress={this.props.onNextPress} /> : null}
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
    marginTop: MARGIN.xxl
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
