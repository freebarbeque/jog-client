/* eslint-disable react/no-unused-prop-types */
/* @flow */

import { Component } from 'react'
import _ from 'lodash'

import type {
  FormField,
  ValidationErrorsMap,
  ValuesMap,
} from 'jog/src/common/types'

export type FormProps = {
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

  handleSubmit = (): void => {
    const validationErrors = this.validate()
    const hasValidationErrors = _.some(_.values(validationErrors))
    if (!hasValidationErrors) {
      this.props.onSubmit(this.props.values)
    } else {
      this.props.onValidationErrorsChanged(validationErrors)
    }
  }

  render(): any {
    return null
  }
}
