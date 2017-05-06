/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
// eslint-disable-next-line
import dismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/FontAwesome'

import type { FormField, ValidationErrorsMap, ValuesMap } from 'jog/src/types'
import { PINK } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

import LabelledTextInput from '../LabelledTextInput'
import RoundedButton from '../RoundedButton'
import Text from '../Text'


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
};

export default class Form extends Component {
  props: FormProps

  validateField(f: FormField): string | null {
    if (f.validate) {
      return f.validate(this.props.values[f.key])
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

    return (
      <LabelledTextInput
        ref={`${idx}`}
        key={f.label}
        label={f.label}
        onChangeText={(value) => {
          const newValues = { ...this.props.values }
          const validationErrors = { ...this.props.validationErrors }
          newValues[f.key] = value
          validationErrors[f.key] = null
          this.props.onValuesChanged(newValues)
          this.props.onValidationErrorsChanged(validationErrors)
        }}
        value={this.props.values[f.key]}
        onBlur={() => this.handleBlur(f)}
        error={fieldError}
        editable={!this.props.disabled}
        returnKeyType={isLastField ? 'done' : 'next'}
        onSubmitEditing={() => {
          if (isLastField) {
            this.handleSubmit()
          } else {
            this.refs[`${idx + 1}`].focus()
          }
        }}
        {...f.inputProps}
      />
    )
  }

  render() {
    const { accessory, fields, buttonLabel, error, disabled, ...props } = this.props

    return (
      <View
        style={styles.container}
        {...props}
      >
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
    marginBottom: MARGIN.extraLarge
  },
  errorText: {
    color: PINK,
    textAlign: 'center',
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
    marginTop: MARGIN.base
  },
  accessory: { marginLeft: MARGIN.large, marginRight: MARGIN.large },
  button: {
    marginTop: MARGIN.xxl
  }
})
