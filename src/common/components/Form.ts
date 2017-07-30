/* eslint-disable react/no-unused-prop-types */

import { Component, FormHTMLAttributes } from 'react'
import * as _ from 'lodash'

import { FormField, ValidationErrorsMap, ValuesMap } from '../types'

export interface FormProps {
  fields: FormField[]
  error?: string | null
  buttonLabel: string
  accessory?: any
  onSubmit: (values: { [key: string]: string }) => void
  disabled?: boolean
  validationErrors: ValidationErrorsMap
  values: ValuesMap
  onValidationErrorsChanged: (errors: ValidationErrorsMap) => void
  onValuesChanged: (errors: ValuesMap) => void
  style?: any
}

export default class Form extends Component<FormProps> {
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
