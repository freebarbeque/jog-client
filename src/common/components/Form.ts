/* eslint-disable react/no-unused-prop-types */

import * as _ from 'lodash'
import { Component } from 'react'

import { FormField, IValidationErrorsMap, IValuesMap } from '../types'

export interface IFormProps {
  fields: FormField[]
  error?: string | null
  buttonLabel: string
  accessory?: any
  onSubmit: (values: { [key: string]: string }) => void
  disabled?: boolean
  validationErrors: IValidationErrorsMap
  values: IValuesMap
  onValidationErrorsChanged: (errors: IValidationErrorsMap) => void
  onValuesChanged: (errors: IValuesMap) => void
  style?: any
}

export default class Form extends Component<IFormProps> {
  public render(): any {
    return null
  }

  protected handleBlur = (f: FormField) => {
    const error = this.validateField(f)
    if (error) {
      const validationErrors = { ...this.props.validationErrors }
      validationErrors[f.key] = error
      this.props.onValidationErrorsChanged(validationErrors)
    }
  }

  protected handleSubmit() {
    const validationErrors = this.validate()
    const hasValidationErrors = _.some(_.values(validationErrors))
    if (!hasValidationErrors) {
      this.props.onSubmit(this.props.values)
    } else {
      this.props.onValidationErrorsChanged(validationErrors)
    }
  }

  protected validateField(f: FormField): string | null {
    if (f.type === 'text' && f.validate) {
      const value = this.props.values[f.key]
      return f.validate(value)
    }
    return null
  }

  protected validate(): { [key: string]: string | null } {
    const validationErrors = {}
    this.props.fields.forEach((f: FormField) => {
      validationErrors[f.key] = this.validateField(f)
    })

    return validationErrors
  }
}
