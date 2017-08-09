import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../../components/NavBar'
import EmailPolicyScreen from '../EmailPolicyScreen'
import ManualAddPolicy from '../ManualAddPolicy'
import Tabs from './Tabs'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

class Main extends React.Component {
  public render() {
    return (
      <Container>
        <Route
          path="/app/tabs"
          exact
          render={() => <Redirect to="/app/tabs/policies" />}
        />
        <NavBar />
        <Tabs />
      </Container>
    )
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class MainScreen extends React.Component {
  public render() {
    return (
      <Container>
        <Route path="/app/emailPolicy" exact component={EmailPolicyScreen} />
        <Route path="/app/addManualPolicy" component={ManualAddPolicy} />
        <Route path="/app/tabs" component={Main} />
      </Container>
    )
  }
}
