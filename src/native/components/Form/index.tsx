import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { FormField } from '~/common/types'

import LabelledTextInput from '../LabelledTextInput'
import RoundedButton from '../RoundedButton'
import Text from '../Text'

import Form from '~/common/components/Form'
import Picker, { IPickerOption } from '../Picker'

const dismissKeyboard = require('dismissKeyboard')

export default class NativeForm extends Form {
  public render() {
    const {
      accessory,
      fields,
      buttonLabel,
      error,
      disabled,
      ...props,
    } = this.props

    return (
      <View style={styles.container} {...props}>
        {fields.map(this.renderField)}
        <View style={styles.accessory}>
          {accessory && accessory}
        </View>
        <RoundedButton
          style={styles.button}
          label={buttonLabel}
          onPress={() => this.handleSubmit()}
          loading={Boolean(disabled)}
        />
        {error &&
          <Text style={styles.errorText}>
            <Icon name="exclamation-triangle" color={PINK} size={14} />
            {`  ${error}`}
          </Text>}
      </View>
    )
  }

  protected handleSubmit() {
    super.handleSubmit()
    dismissKeyboard()
  }

  private renderField = (f: FormField, idx: number) => {
    const numFields = this.props.fields.length
    const isLastField = idx === numFields - 1

    const fieldError = this.props.validationErrors[f.key]

    const value = this.props.values[f.key]

    if (f.type === 'text') {
      return (
        <LabelledTextInput
          ref={`${idx}`}
          key={f.label}
          label={f.label}
          onChangeText={text => {
            const newValues = { ...this.props.values }
            const validationErrors = { ...this.props.validationErrors }
            newValues[f.key] = text
            validationErrors[f.key] = null
            this.props.onValuesChanged(newValues)
            this.props.onValidationErrorsChanged(validationErrors)
          }}
          value={value}
          onBlur={() => this.handleBlur(f)}
          error={fieldError}
          editable={!this.props.disabled}
          returnKeyType={isLastField ? 'done' : 'next'}
          onSubmitEditing={() => {
            if (isLastField) {
              this.handleSubmit()
            } else {
              // eslint-disable-next-line
              ;(this.refs[`${idx + 1}`] as any).focus()
            }
          }}
          {...f.inputProps}
        />
      )
    } else if (f.type === 'options') {
      return (
        <Picker
          onChange={(o: IPickerOption) => {
            const newValues = { ...this.props.values }
            newValues[f.key] = o.value
            this.props.onValuesChanged(newValues)
          }}
          value={value ? f.options.find(o => o.value === value) : null}
          placeholder="Insurer"
          options={f.options}
        />
      )
    }

    throw new Error(`Unknown field type ${(f as any).type}`)
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: MARGIN.extraLarge,
    marginBottom: MARGIN.extraLarge,
  },
  errorText: {
    color: PINK,
    textAlign: 'center',
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
    marginTop: MARGIN.base,
  },
  accessory: { marginLeft: MARGIN.large, marginRight: MARGIN.large },
  button: {
    marginTop: MARGIN.xxl,
  },
})
