// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

import type { BaseQuestionDescriptor } from '../../../business/types'
import { BLUE, PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import Number from '../../screens/markets/AddressScreen/Number'

export type QuestionFieldProps = {
  index?: number,
  error?: string,
  children?: any,
  descriptor: BaseQuestionDescriptor<*>,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  color: ${BLUE};
  display: flex;
  flex-direction: row;
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Error = styled.div.attrs({ className: 'Error' })`
  font-size: 12px;
  color: ${PINK};
  margin-top: ${MARGIN.base}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`font-size: 16px;`

export default class QuestionField extends Component {
  props: QuestionFieldProps

  render() {
    const error = this.props.error
    const required = this.props.descriptor.required

    return (
      <Container>
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
          {this.props.children}
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
