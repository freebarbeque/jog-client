import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import styled from 'styled-components'

import { BLUE } from '../../common/constants/palette'

export interface IPickerOption {
  label: string
  value: string
}

interface IPickerProps {
  value?: string | null
  onChange: (value: IPickerOption) => void
  options: IPickerOption[]
  placeholder: string
  titleText?: string
  name: string
  getItemStyle?: (option: IPickerOption) => any
  className?: string
  height?: number
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  width?: number
}

export default class Picker extends React.Component<IPickerProps> {
  public render() {
    const { value = null, options } = this.props
    const Container = this.constructContainer()

    return (
      <Container>
        <SelectField
          className="select-field"
          value={value}
          labelStyle={{ color: 'white' }}
          autoWidth={true}
        >
          {options.map(o =>
            <MenuItem
              key={o.value}
              value={o.value}
              primaryText={o.label}
              onClick={() => {
                this.props.onChange(o)
              }}
            />,
          )}
        </SelectField>
      </Container>
    )
  }

  private constructContainer() {
    const height = this.props.height || 40
    const textColor = this.props.textColor || BLUE
    const backgroundColor = this.props.backgroundColor || 'white'
    const borderColor = this.props.borderColor || BLUE

    return styled.div`
      background-color: ${backgroundColor};
      border-radius: 4px;
      height: ${height}px;
      border-width: 1px;
      border-color: rgb(222, 222, 222);
      border-style: solid;
      position: relative;

      div {
        color: ${textColor} !important;
        // Used by material-ui for some reason...
        -webkit-text-fill-color: ${textColor} !important;
        top: 0 !important;
      }

      button {
        height: ${height}px !important;
        border-left-color: ${borderColor} !important;
        border-left-width: 1px !important;
        border-left-style: solid !important;

        svg {
          path {
            stroke: ${textColor} !important;
            fill: ${textColor} !important;
          }
        }
      }

      hr {
        display: none;
      }

      span[role="menuitem"] {
        div {
          color: ${textColor} !important;
        }
      }

      .select-field {
        > div:nth-child(2) {
          > div:first-child {
            > div:nth-child(2) {
              height: ${height}px !important;
              padding-left: 15px !important;
              padding-top: 1.5px !important;
            }
          }
        }
      }

      > div {
        height: ${height}px !important;
      }
    `
  }
}
