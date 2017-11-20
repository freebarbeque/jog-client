import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import PolicyScreen from '../Policy/PolicyScreen';
import GetStarted from '../Landing/GetStartedScreen';
import Dashboard from '../Dashboard/Dashboard';

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
                <Route path="/app/policies" component={PolicyScreen} />
                <Route path="/app/dashboard" component={Dashboard} />
              </Switch>
            </Container>
        )
    }
}
