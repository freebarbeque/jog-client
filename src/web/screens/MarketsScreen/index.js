import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import TextQuestion from '../../components/Questions/TextQuestion'
import { questions } from '../../../business/address'
import type { Dispatch, ReduxState } from '../../../common/types'
import type { MarketsReduxState } from '../../../common/store/markets/index'
import { setAddressAnswer } from '../../../common/store/markets/index'
import Panel from '../../components/Panel'
import Container from '../../components/Container'
import { MARGIN } from '../../../common/constants/style'
import RoundedButton from '../../components/RoundedButton'
import { validate } from '../../../business/validation'
import { ValidationErrors } from '../../../business/types'

type MarketsScreenProps = {
  markets: MarketsReduxState,
  dispatch: Dispatch,
}

type MarketsScreenState = {
  errors?: ValidationErrors,
  blurred: { [string]: boolean },
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
  state: MarketsScreenState

  constructor(props: MarketsScreenProps) {
    super(props)
    this.state = {
      blurred: {},
      errors: this.validateAnswers(),
    }
  }

  componentDidMount() {
    this.validateAnswers()
  }

  onChange = (id: string, value: string) => {
    this.props.dispatch(setAddressAnswer(id, value))
  }

  validateAnswers = () => {
    const errors = validate(questions, this.props.markets.addressAnswers)
    return errors
  }

  handleBlur = (id: string) => {
    console.log('blurrr')
    const blurred = { ...this.state.blurred }
    blurred[id] = true
    this.setState({ blurred })
    this.setState({ errors: this.validateAnswers() })
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
            const errors = this.state.errors

            return (
              <TextQuestion
                index={idx + 1}
                descriptor={q}
                value={markets[q.id]}
                onChange={this.onChange}
                error={
                  this.state.blurred[q.id]
                    ? _.get(errors, `field.${q.id}`)
                    : null
                }
                onBlur={() => this.handleBlur(q.id)}
              />
            )
          })}
          <RoundedButton
            label="Add new address"
            style={{
              width: 200,
              fontSize: 16,
              marginLeft: 52,
              marginTop: MARGIN.xxl,
            }}
            onClick={this.validateAnswers}
            disabled={this.state.errors.hasError}
          />
        </Panel>
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  markets: state.markets,
}))(MarketsScreen)
