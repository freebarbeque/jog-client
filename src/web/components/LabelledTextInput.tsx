import * as React from 'react'
import styled from 'styled-components'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import Input from './Input'

const FontAwesome = require('react-fontawesome')

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`margin-bottom: ${MARGIN.large}px;`

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: white;
  text-transform: uppercase;
`
// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  color: ${PINK};
  font-size: 11px;
`

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error: string
}

export default class LabelledTextInput extends React.Component<Props> {
  render() {
    const { label, error, ...props } = this.props

    return (
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Label>
            {label}
          </Label>
          <div style={{ flex: 1 }} />
          {error &&
            <div>
              <FontAwesome name="exclamation-triangle" color={PINK} size={14} />
              <ErrorText>
                {error}
              </ErrorText>
            </div>}
        </div>
        <Input
          type="text"
          style={error ? { borderColor: PINK } : {}}
          {...props}
        />
      </Container>
    )
  }
}
