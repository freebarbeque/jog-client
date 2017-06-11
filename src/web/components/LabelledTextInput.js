import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { MARGIN } from '../../common/constants/style'
import { PINK } from '../../common/constants/palette'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: white;
  text-transform: uppercase;
`

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 50px;
  background-color: white;
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  font-size: 20px;
  border-radius: 4px;
  border: 2px solid transparent;
`
// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  color: ${PINK};
  font-size: 11px;
`

export default class LabelledTextInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
  }

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