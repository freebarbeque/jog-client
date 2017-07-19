import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TextQuestion from '../../components/Questions/TextQuestion'
import { questions } from '../../../business/address'
import type { Dispatch, ReduxState } from '../../../common/types'
import type { MarketsReduxState } from '../../../common/store/markets/index'
import { setAddressAnswer } from '../../../common/store/markets/index'
import Panel from '../../components/Panel'
import Container from '../../components/Container'
import { MARGIN } from '../../../common/constants/style'
import RoundedButton from '../../components/RoundedButton'

type MarketsScreenProps = {
  markets: MarketsReduxState,
  dispatch: Dispatch,
}

// language=SCSS prefix=dummy{ suffix=}
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(200, 200, 200);
  margin-top: ${MARGIN.base}px;
`

class MarketsScreen extends Component {
  props: MarketsScreenProps

  onChange = (id: string, value: string) => {
    this.props.dispatch(setAddressAnswer(id, value))
  }

  render() {
    const markets = this.props.markets
    return (
      <Container className="MarketsScreen">
        <Panel>
          <div
            style={{
              color: 'rgb(200, 200, 200)',
              fontSize: 18,
              marginBottom: MARGIN.extraLarge,
            }}
          >
            Add a new address
            <HR />
          </div>
          {questions.map((q, idx) => {
            return (
              <TextQuestion
                index={idx + 1}
                descriptor={q}
                value={markets[q.id]}
                onChange={this.onChange}
              />
            )
          })}
          <RoundedButton
            label="Setup my account"
            style={{
              width: 200,
              fontSize: 16,
              marginLeft: 52,
              marginTop: MARGIN.xxl,
            }}
          />
        </Panel>
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  markets: state.markets,
}))(MarketsScreen)
