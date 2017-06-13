import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import styled from 'styled-components'

import { BLUE } from '../../common/constants/palette'

export type PickerOption = { label: string, value: string }

type PickerProps = {
  value?: PickerOption | null,
  onChange: (value: PickerOption) => void,
  options: PickerOption[],
  placeholder: string,
  titleText?: string,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  color: white;
  
  span[role="menuitem"] {
    div {
      color: ${BLUE} !important; 
    }
  }
`

export default class Picker extends Component {
  props: PickerProps

  render() {
    const { value, options, ...props } = this.props
    const _value = value ? value.value : null

    return (
      <Container className="picker" {...props}>
        <SelectField value={_value} labelStyle={{ color: 'white' }}>
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
