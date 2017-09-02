import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { PINK, WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import * as _ from 'lodash'
import Text from './Text'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  container: {
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
    marginBottom: MARGIN.large,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    marginTop: MARGIN.base,
    height: 60,
    backgroundColor: WHITE,
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  errorInput: {
    borderColor: PINK,
  },
  errorText: {
    color: PINK,
    fontSize: 11,
  },
  disabledInput: {
    opacity: 0.5,
  },
})

interface IProps {
  label: string
  onTab: () => void
  editable?: boolean
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
  error?: string
}

class LabelledTextInput extends React.Component<IProps> {
  private input: any

  public render() {
    const {
      label = '',
      error = null,
      editable,
      onChangeText,
      ...props,
    } = this.props
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginBottom: MARGIN.base }}>
          {label &&
            <Text style={styles.label} weight="bold">
              {label.toUpperCase()}
            </Text>}
          <View style={{ flex: 1 }} />
          {error &&
            <View>
              <Text style={styles.errorText}>
                {error}{' '}
                <Icon
                  name="exclamation-triangle"
                  size={11}
                  color={PINK}
                  style={{ marginLeft: MARGIN.base }}
                />
              </Text>
            </View>}
        </View>
        <TextInput
          ref={e => {
            this.input = e ? e.input : null
          }}
          editable={editable}
          onChangeText={text => {
            // This is buggy as the tab appears before quickly being removed,
            // however this doesn't really matter as it's only for dev.
            // Unlikely to use the tab character on actual devices.
            if (_.last(text) === '\t') {
              this.blur()
              if (props.onSubmitEditing) {
                props.onSubmitEditing()
              }
            } else if (onChangeText) onChangeText(text)
          }}
          {...props}
        />
      </View>
    )
  }

  private blur() {
    return this.input.blur()
  }
}

export default LabelledTextInput
