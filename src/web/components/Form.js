/* @flow */

import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import RoundedButton from './RoundedButton'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { FormField } from '../../common/types'
import Form from '../../common/components/Form'
import type { FormProps } from '../../common/components/Form'
import LabelledTextInput from './LabelledTextInput'

// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  color: ${PINK};
  text-align: center;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
  margin-top: ${MARGIN.base}px;
`

export default class WebForm extends Form {
  props: FormProps

  renderField = (f: FormField) => {
    const fieldError = this.props.validationErrors[f.key]
    const value = this.props.values[f.key]

    if (f.type === 'text') {
      return (
        <LabelledTextInput
          label={f.label}
          key={f.label}
          onChange={e => {
            const newValues = { ...this.props.values }
            const validationErrors = { ...this.props.validationErrors }
            newValues[f.key] = e.target.value
            validationErrors[f.key] = null
            this.props.onValuesChanged(newValues)
            this.props.onValidationErrorsChanged(validationErrors)
          }}
          onBlur={() => this.handleBlur(f)}
          disabled={this.props.disabled}
          value={value}
          error={fieldError}
          {...f.inputProps}
        />
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
      <form
        {...props}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          this.handleSubmit()
        }}
      >
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
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
          {error &&
            <ErrorText>
              <FontAwesome name="exclamation-triangle" color={PINK} size={14} />
              {`  ${error}`}
            </ErrorText>}
        </div>
      </form>
    )
  }
}
