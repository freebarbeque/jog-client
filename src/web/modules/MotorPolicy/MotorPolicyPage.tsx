import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import MotorPolicyQuote from './MotorPolicyQuote';
import MotorPolicyCreation from './MotorPolicyCreation';

export default class MotorPolicyPage extends React.PureComponent<any, any> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/create`} component={MotorPolicyCreation} />
                <Route path={`${this.props.match.path}/:policyId/quote`} component={MotorPolicyQuote} />
                <Route path={`${this.props.match.path}/:policyId/quotes`} component={() => <h1>QUOTES</h1>} />
            </Switch>
        )
    }
}
