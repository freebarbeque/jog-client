import * as React from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { BLUE, PINK, WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import { CarOutline } from './images'
import Text from './Text'

interface IAddPolicyScreenContainerProps {
  title: string
  onPrevPress?: () => void
  onNextPress?: () => void
  onSkipPress?: () => void
  children?: any
  showPrevButton?: boolean
  showNextButton?: boolean
  showSkipButton?: boolean
  disableNextButton?: boolean
}

interface IAddPolicyScreenContainerState {
  keyboardHeight: number
}

interface INavigationButtonProps extends Object {
  title: string
  variation?: 'gray' | 'pink'
  disabled?: boolean
  onPress?: () => void
}

export const NavigationButton = (props: INavigationButtonProps) => {
  const { variation = 'pink', disabled, title, ...rest } = props
  const extraStyle =
    variation === 'pink' ? styles.pinkButton : styles.grayButton
  const extraTextStyle =
    variation === 'pink' ? styles.pinkButtonText : styles.grayButtonText

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

export default class AddPolicyScreenContainer extends React.Component<
  IAddPolicyScreenContainerProps,
  IAddPolicyScreenContainerState
> {
  public static defaultProps: any = {
    showPrevButton: true,
    showNextButton: true,
    showSkipButton: false,
    disableNextButton: false,
  }

  constructor(props: IAddPolicyScreenContainerProps) {
    super(props)
    this.state = {
      keyboardHeight: 0,
    }
  }

  public componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  public componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.handleKeyboardDidShow)
    Keyboard.removeListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  public render() {
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
          <Text style={styles.entryText}>POLICY ENTRY</Text>
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

  private handleKeyboardDidShow = (e: any) => {
    this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  private handleKeyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 })
  }

  private onPrevPress = () => {
    Keyboard.dismiss()
    if (this.props.onPrevPress) this.props.onPrevPress()
  }

  private onNextPress = () => {
    Keyboard.dismiss()
    if (this.props.onNextPress) this.props.onNextPress()
  }

  private onSkipPress = () => {
    Keyboard.dismiss()
    if (this.props.onSkipPress) this.props.onSkipPress()
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
