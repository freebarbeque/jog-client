// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { TextQuestionDescriptor } from '../../../business/types'
import { BLUE, PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import Number from '../../screens/MarketsScreen/Number'

type TextQuestionProps = {
  descriptor: TextQuestionDescriptor,
  value: string,
  onChange: (value: string) => void,
  error?: string,
  index?: number,
  onBlur?: () => void,
  onFocus?: () => void,
}

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`font-size: 16px;`

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  color: ${BLUE};
  display: flex;
  flex-direction: row;
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 10px;
  padding: ${MARGIN.large}px;
  font-size: 16px;
  background-color: rgb(240, 240, 240);
  border: none;
`

// language=SCSS prefix=dummy{ suffix=}
const Error = styled.div.attrs({ className: 'Error' })`
  font-size: 12px;
  color: ${PINK};
  margin-top: ${MARGIN.base}px;
`

export default class TextQuestion extends Component {
  props: TextQuestionProps

  componentWillMount() {
    const getDefaultValue = this.props.descriptor.defaultValue
    if (getDefaultValue) this.props.onChange(getDefaultValue())
  }

  render() {
    const id = this.props.descriptor.id

    const error = this.props.error
    const required = this.props.descriptor.required
    return (
      <Container className={`TextQuestion ${id} ${error ? 'hasError' : ''}`}>
        {this.props.index
          ? <div style={{ position: 'relative', bottom: 8, marginRight: 15 }}>
              <Number>
                {this.props.index}
              </Number>
            </div>
          : null}
        <div>
          <Header
            style={{
              fontWeight: required ? '500' : '300',
            }}
          >
            {this.props.descriptor.questionText}
            {required ? '*' : ''}
          </Header>
          <Input
            value={this.props.value}
            name={id}
            onChange={e => this.props.onChange(id, e.target.value)}
            style={{
              backgroundColor: error ? '#efc9c9' : 'rgb(240, 240, 240)',
            }}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          {error
            ? <Error>
                {error}
              </Error>
            : null}
        </div>
      </Container>
    )
  }
}
