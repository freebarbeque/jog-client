import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, ReduxState } from '../../../common/types'
import { addDriver, setDriverAnswer } from '../../../common/store/markets/index'

import Panel from '../../components/Panel'
import Container from '../../components/Container'
import Header from './Header'
import {
  constructDriver,
  questions as driverQuestions,
} from '../../../business/person'
import QuestionSet from '../../components/Questions/QuestionSet'
import { MARGIN } from '../../../common/constants/style'
import RoundedButton from '../../components/RoundedButton'

type DriverScreenProps = {
  driverAnswers: { [id: string]: any }
  dispatch: Dispatch
}

class DriverScreen extends React.Component<DriverScreenProps> {
  handleAddClick = () => {
    const driver = constructDriver(this.props.driverAnswers)
    this.props.dispatch(addDriver(driver))
  }

  render() {
    return (
      <Container className="DriversScreen">
        <Panel>
          <Header>Driver</Header>
          <QuestionSet
            questions={driverQuestions}
            extraComponents={{}}
            answers={this.props.driverAnswers}
            onChange={(id, value) => {
              this.props.dispatch(setDriverAnswer(id, value))
            }}
          />
          <RoundedButton
            label="Add driver"
            style={{
              width: 200,
              fontSize: 16,
              marginLeft: 52,
              marginTop: MARGIN.xxl,
            }}
            onClick={this.handleAddClick}
          />
        </Panel>
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  driverAnswers: state.markets.driverAnswers,
}))(DriverScreen)
