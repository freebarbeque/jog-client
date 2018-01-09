import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import MotorPolicyQuoteAddress from './MotorPolicyQuoteAddress';

export default class MotorPolicyQuote extends React.PureComponent<any, any> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/address`} component={MotorPolicyQuoteAddress} />
                <Route path={`${this.props.match.path}/vehicle`} component={() => <h1>VEHICLE</h1>} />
                <Route path={`${this.props.match.path}/holder`} component={() => <h1>HOLDER</h1>} />
            </Switch>
        )
    }
}
