import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import GetStarted from '../Landing/GetStartedScreen';
import Dashboard from '../Dashboard/Dashboard';
import CreatePolicyScreen from '../Policy/CreatePolicyScreen';

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
                    <Route path="/app/get_started" component={GetStarted}/>
                    <Route path="/app/dashboard" component={Dashboard}/>
                    <Route path="/app/create/manual" exact component={CreatePolicyScreen}/>
                </Switch>
            </Container>
        )
    }
}
