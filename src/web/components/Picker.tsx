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
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  height: 60px;

  div {
    color: ${BLUE} !important;
    // Used by material-ui for some reason...
    -webkit-text-fill-color: ${BLUE} !important;
    top: 0 !important;
  }

  button {
    height: 60px !important;
    border-left-color: ${BLUE} !important;
    border-left-width: 1px !important;
    border-left-style: solid !important;

    svg {
      path {
        stroke: ${BLUE} !important;
        fill: ${BLUE} !important;
      }
    }
  }

  hr {
    display: none;
  }

  span[role="menuitem"] {
    div {
      color: ${BLUE} !important;
    }
  }

  .select-field {
    > div:nth-child(2) {
      > div:first-child {
        > div:nth-child(2) {
          height: 60px !important;
          padding-left: 15px !important;
          padding-top: 1.5px !important;
        }
      }
    }
  }

  > div {
    height: 60px !important;
  }
`

export default class Picker extends React.Component<IPickerProps> {
  public render() {
    const { value = null, options } = this.props
    return (
      <Container>
        <SelectField
          className="select-field"
          value={value}
          labelStyle={{ color: 'white' }}
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
}
