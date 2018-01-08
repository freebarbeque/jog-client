import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MotorQuotesList from './MotorQuotesList';
import MotorQuotesDetails from './MotorQuotesDetails';

export default class MotorQuotes extends React.PureComponent<any, any> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/:policyId/request/:requestId/quote/:quoteId`} component={MotorQuotesDetails} />
                <Route path={`${this.props.match.url}/:policyId/request/:requestId`} component={MotorQuotesList} />
            </Switch>
        )
    }
}
