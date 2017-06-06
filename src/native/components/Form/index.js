/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
// eslint-disable-next-line
import dismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/FontAwesome'

import type { FormField, ValidationErrorsMap, ValuesMap } from 'jog/src/types'
import { PINK } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

import LabelledTextInput from '../LabelledTextInput'
import RoundedButton from '../RoundedButton'
import Text from '../Text'
import Picker from '../Picker'
import type { PickerOption } from '../Picker'

type FormProps = {
  fields: FormField[],
  error?: string | null,
  buttonLabel: string,
  accessory?: any,
  onSubmit: (values: { [key: string]: string }) => void,
  disabled?: boolean,
  validationErrors: ValidationErrorsMap,
  values: ValuesMap,
  onValidationErrorsChanged: (errors: ValidationErrorsMap) => void,
  onValuesChanged: (errors: ValuesMap) => void,
}

export default class Form extends Component {
  props: FormProps

  validateField(f: FormField): string | null {
    if (f.type === 'text' && f.validate) {
      const value = this.props.values[f.key]
      return f.validate(value)
    }
    return null
  }

  validate(): { [key: string]: string | null } {
    const validationErrors = {}
    this.props.fields.forEach((f: FormField) => {
      validationErrors[f.key] = this.validateField(f)
    })

    return validationErrors
  }

  handleBlur = (f: FormField) => {
    const error = this.validateField(f)
    if (error) {
      const validationErrors = { ...this.props.validationErrors }
      validationErrors[f.key] = error
      this.props.onValidationErrorsChanged(validationErrors)
    }
  }

  handleSubmit = () => {
    const validationErrors = this.validate()
    dismissKeyboard()

    const hasValidationErrors = _.some(_.values(validationErrors))
    if (!hasValidationErrors) {
      this.props.onSubmit(this.props.values)
    } else {
      this.props.onValidationErrorsChanged(validationErrors)
    }
  }

  renderField = (f: FormField, idx: number) => {
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
              this.refs[`${idx + 1}`].focus()
            }
          }}
          {...f.inputProps}
        />
      )
    } else if (f.type === 'options') {
      return (
        <Picker
          onChange={(o: PickerOption) => {
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

    throw new Error(`Unknown field type ${f.type}`)
  }

  render() {
    const {
      accessory,
      fields,
      buttonLabel,
      error,
      disabled,
      ...props
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
          onPress={this.handleSubmit}
          loading={disabled}
        />
        {error &&
          <Text style={styles.errorText}>
            <Icon name="exclamation-triangle" color={PINK} size={14} />
            {`  ${error}`}
          </Text>}
      </View>
    )
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
