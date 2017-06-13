/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  align-items: center;
  display: flex;
`

// language=SCSS prefix=dummy{ suffix=}
const Radio = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 14px;
  border-width: 1px;
  border-color: white;
  border-style: solid;
  justify-content: center;
  align-items: center;
  display: flex;
`
// language=SCSS prefix=dummy{ suffix=}
const InnerRadio = styled.div`
  background-color: ${PINK};
  height: 16px;
  width: 16px;
  border-radius: 16px;
`

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
  font-size: 21px;
  margin-left: ${MARGIN.base}px;
`
// language=SCSS prefix=dummy{ suffix=}
const Touchable = styled.div`
  flex-direction: row;
  display: flex;
  margin-bottom: ${MARGIN.base}px;
`

type RadioInputProps = {
  options: {
    // eslint-disable-next-line react/no-unused-prop-types
    label: string,
    value: string,
  }[],
  value: string,
  onChange: (value: string) => void,
  style?: any,
}

export default class RadioInput extends Component {
  props: RadioInputProps

  render() {
    const { options, onChange, style, value } = this.props

    return (
      <Container style={style || {}}>
        <div>
          {options.map(o =>
            <Touchable key={o.value} onClick={() => onChange(o.value)}>
              <Radio>
                {o.value === value ? <InnerRadio /> : null}
              </Radio>
              <Label>
                {o.label}
              </Label>
            </Touchable>,
          )}
        </div>
      </Container>
    )
  }
}
