import { constructAddress, questions } from 'jog-common/business/address'
import { validate } from 'jog-common/business/validation'
import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'
import { MARGIN } from '../../../../common/constants/style'
import {
  addAddress,
  IMarketsReduxState,
  setAddressAnswer,
} from '../../../../common/store/markets/index'
import { IReduxState } from '../../../../common/types'
import Container from '../../../components/Container'
import Panel from '../../../components/Panel'
import TextQuestion from '../../../components/Questions/TextQuestion'
import RoundedButton from '../../../components/RoundedButton'

interface IProps extends DispatchProp<any> {
  markets: IMarketsReduxState
}

interface IState {
  errors?: { [id: string]: string }
  blurred: { [id: string]: boolean }
}

// language=SCSS prefix=dummy{ suffix=}
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(200, 200, 200);
  margin-top: ${MARGIN.base}px;
`

class AddressScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      blurred: {},
      errors: this.validateAnswers(),
    }
  }

  public render() {
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
            onClick={this.handleAddAddressClick}
            disabled={Boolean(_.keys(this.state.errors).length)}
          />
        </Panel>
      </Container>
    )
  }

  private onChange = (id: string, value: string) => {
    this.props.dispatch(setAddressAnswer(id, value))
  }

  private handleAddAddressClick = () => {
    const address = constructAddress(this.props.markets.addressAnswers)
    this.props.dispatch(addAddress(address))
  }

  private validateAnswers = () => {
    return validate(questions, this.props.markets.addressAnswers)
  }

  private handleBlur = (id: string) => {
    const blurred = { ...this.state.blurred }
    blurred[id] = true
    this.setState({ blurred })
    this.setState({ errors: this.validateAnswers() })
  }
}

export default connect((state: IReduxState) => ({
  markets: state.markets,
}))(AddressScreen)
