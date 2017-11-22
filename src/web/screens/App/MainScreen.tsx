import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import GetStarted from '../Landing/GetStartedScreen';
import Dashboard from '../Dashboard/Dashboard';
import CreatePolicyScreen from '../Policy/CreatePolicyScreen';
import MotorPolicyScreen from '../Dashboard/MotorPolicyScreen';

// language=SCSS prefix=dummy{ suffix=}å
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

// tslint:disable-next-line:max-classes-per-file
export default class MainScreen extends React.Component<{}, {}> {
    public render() {
        return (
            <Container>
              <Switch>
                <Route path="/app/get-started" component={GetStarted} />
                <Route path="/app/create/manual" exact component={CreatePolicyScreen}/>
                <Route path="/app/dashboard/motor/:motorId(\\d+)" component={MotorPolicyScreen} />
                <Route path="/app/dashboard" component={Dashboard} />
              </Switch>
            </Container>
        )
    }
}
