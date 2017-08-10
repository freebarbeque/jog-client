import * as React from 'react'

import styled from 'styled-components'

import { IBaseQuestionDescriptor } from 'jog-common/business/types'
import { BLUE, PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import NumberField from '../../screens/markets/AddressScreen/Number'

export interface IProps {
  index?: number
  error?: string | null
  children?: any
  descriptor: IBaseQuestionDescriptor<any>
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
// language=SCSS prefix=dummy{ suffix=}
const Subheader = styled.div`
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
`

export default class QuestionField extends React.Component<IProps> {
  public render() {
    const { error, descriptor, index, children } = this.props
    const { required, hint, questionText } = descriptor

    return (
      <Container>
        {index
          ? <div style={{ position: 'relative', bottom: 8, marginRight: 15 }}>
              <NumberField>
                {index}
              </NumberField>
            </div>
          : null}
        <div>
          <Header
            style={{
              fontWeight: required ? 500 : 300,
            }}
          >
            {questionText}
            {required ? '*' : ''}
          </Header>
          {hint
            ? <Subheader>
                {hint}
              </Subheader>
            : null}
          {children}
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
