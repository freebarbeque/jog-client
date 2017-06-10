/* @flow */

import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import TextField from 'material-ui/TextField'
import RoundedButton from './RoundedButton'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { FormField } from '../../common/types'
import Form from '../../common/components/Form'

// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  color: ${PINK};
  text-align: center;
  margin-left: ${MARGIN.large};
  margin-right: ${MARGIN.large};
  margin-top: ${MARGIN.base};
`

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: white;
`

export default class WebForm extends Form {
  renderField = (f: FormField, idx: number) => {
    const fieldError = this.props.validationErrors[f.key]
    const value = this.props.values[f.key]

    if (f.type === 'text') {
      return (
        <div>
          <Label>
            {f.label.toUpperCase()}
          </Label>
          <TextField
            ref={`${idx}`}
            key={f.label}
            onChange={(e, text) => {
              const newValues = { ...this.props.values }
              const validationErrors = { ...this.props.validationErrors }
              newValues[f.key] = text
              validationErrors[f.key] = null
              this.props.onValuesChanged(newValues)
              this.props.onValidationErrorsChanged(validationErrors)
            }}
            onBlur={() => this.handleBlur(f)}
            disabled={this.props.disabled}
            value={value}
            errorText={fieldError}
            {...f.inputProps}
          />
        </div>
      )
    } else if (f.type === 'options') {
      throw new Error('TODO: options field')
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
      <div {...props}>
        <div>
          {fields.map(this.renderField)}
          <div>
            {accessory && accessory}
          </div>
          <RoundedButton
            type="submit"
            label={buttonLabel}
            onClick={this.handleSubmit}
            loading={disabled}
          />
          {error &&
            <ErrorText>
              <FontAwesome name="exclamation-triangle" color={PINK} size={14} />
              {`  ${error}`}
            </ErrorText>}
        </div>
      </div>
    )
  }
}
