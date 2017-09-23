import { ISelectQuestionDescriptor } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'

import Picker from '~/web/components/Picker'
import { INPUT_BACKGROUND_COLOR } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'

const Accessory = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  transition: opacity .20s ease-in-out;
`

interface IProps<T> {
  descriptor: ISelectQuestionDescriptor<T>
  value: T
  onChange: (id: string, value: T) => void
  onBlur?: () => void
  onFocus?: () => void
  specialOptions?: Array<{ label: string; value: string }>
  onSpecialOptionClick?: (value: string) => void
  index?: number
  error?: string
  renderAccessory?: (o: { label: string; value: T }) => React.ReactElement<any>
}

interface IState {
  hovering: boolean
}

export default class SelectQuestion<T> extends React.Component<
  IProps<T>,
  IState
> {
  constructor(props: IProps<T>) {
    super(props)
    this.state = {
      hovering: false,
    }
  }

  public render() {
    const dropdown = this.props.descriptor.dropdown
    return (
      <QuestionField
        descriptor={this.props.descriptor}
        error={this.props.error}
      >
        {dropdown ? this.renderDropdown() : this.renderSelectBox()}
      </QuestionField>
    )
  }

  private renderDropdown() {
    const options = this.props.descriptor.options.map(o => ({
      value: `${o.value}`,
      label: o.label,
    }))
    return (
      <div>
        <Picker
          name={this.props.descriptor.id}
          placeholder=""
          options={options}
          onChange={o =>
            this.props.onChange(this.props.descriptor.id, o.value as any)}
          value={`${this.props.value}`}
          backgroundColor={INPUT_BACKGROUND_COLOR}
          height={50}
          borderColor={INPUT_BACKGROUND_COLOR}
        />
        {this.renderSpecialOptions()}
      </div>
    )
  }

  private renderSpecialOptions() {
    const onSpecialOptionClick =
      this.props.onSpecialOptionClick ||
      (() => {
        /* Do nothing */
      })

    const specialOptions =
      this.props.specialOptions && this.props.specialOptions

    return specialOptions && specialOptions.length
      ? <div style={{ display: 'block' }}>
          <div
            style={{
              color: '#192142',
              fontSize: 12,
              fontWeight: 500,
              marginTop: MARGIN.base,
              textAlign: 'center',
            }}
          >
            OR
          </div>
          {specialOptions.map((o, i) => {
            const isOdd = Boolean(specialOptions.length % 2)
            const shouldFill = isOdd && i === specialOptions.length - 1
            const width = shouldFill ? 450 : 220
            return (
              <SelectBox
                key={o.value}
                style={{
                  width,
                }}
                onClick={() => onSpecialOptionClick(o.value)}
              >
                {o.label}
              </SelectBox>
            )
          })}
        </div>
      : null
  }

  private renderSelectBox() {
    const options = this.props.descriptor.options
    return (
      <div style={{ position: 'relative', right: MARGIN.base }}>
        {options.map((o, i) => {
          const isOdd = Boolean(options.length % 2)
          const shouldFill = isOdd && i === options.length - 1
          const width = shouldFill ? 450 : 220
          return (
            <SelectBox
              key={`${o.value}${o.label}`}
              className={`${o.value === this.props.value ? 'selected' : ''}`}
              onClick={() =>
                this.props.onChange(this.props.descriptor.id, o.value)}
              style={{
                width,
              }}
              onMouseOver={() => this.setState({ hovering: true })}
              onMouseLeave={() => this.setState({ hovering: false })}
            >
              <div>
                {o.label}
              </div>
              {this.props.renderAccessory
                ? <Accessory style={{ opacity: this.state.hovering ? 1 : 0 }}>
                    {this.props.renderAccessory(o)}
                  </Accessory>
                : null}
            </SelectBox>
          )
        })}
        {this.renderSpecialOptions()}
      </div>
    )
  }
}
