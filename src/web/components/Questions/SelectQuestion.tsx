import { ISelectQuestionDescriptor } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'

import Picker from '~/web/components/Picker'
import { INPUT_BACKGROUND_COLOR, PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'

const SpecialSelectBox = SelectBox.extend`background-color: ${PINK};`

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
        index={this.props.index}
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

    return (
      <div style={{ display: 'inline-block' }}>
        {this.props.specialOptions
          ? this.props.specialOptions.map(o => {
              return (
                <SpecialSelectBox
                  key={o.value}
                  onClick={() => onSpecialOptionClick(o.value)}
                >
                  {o.label}
                </SpecialSelectBox>
              )
            })
          : null}
      </div>
    )
  }

  private renderSelectBox() {
    return (
      <div style={{ position: 'relative', right: MARGIN.base }}>
        {this.props.descriptor.options.map(o => {
          return (
            <SelectBox
              key={`${o.value}${o.label}`}
              className={`${o.value === this.props.value ? 'selected' : ''}`}
              onClick={() =>
                this.props.onChange(this.props.descriptor.id, o.value)}
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
