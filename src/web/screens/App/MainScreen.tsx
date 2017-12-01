import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import GetStarted from '../Landing/GetStartedScreen';
import Dashboard from '../Dashboard/Dashboard';
import CreatePolicyScreen from '../Policy/CreatePolicyScreen';
import MotorPolicyScreen from '../Dashboard/MotorPolicyScreen';
import UserDetailsScreen from 'src/web/screens/UserDetails/UserDetailsScreen';
import QuotesScreenAnnually from 'src/web/screens/Quotes/QuotesScreenAnnually';
import QuotesScreenMonthly from 'src/web/screens/Quotes/QuoteScreenMonthly';

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
                    <Route path="/app/dashboard/motor/add/manual" exact component={CreatePolicyScreen}/>
                    <Route path="/app/dashboard/motor/:motorId(\\d+)" component={MotorPolicyScreen}/>
                    <Route path="/app/user/motor/:motorId(\\d+)/quotes/annual" component={QuotesScreenAnnually}/>
                    <Route path="/app/user/motor/:motorId(\\d+)/quotes/monthly" component={QuotesScreenMonthly}/>
                    <Route path="/app/dashboard" component={Dashboard}/>
                    <Route path="/app/user" component={UserDetailsScreen}/>
                </Switch>
            </Container>
        )
    }
}
