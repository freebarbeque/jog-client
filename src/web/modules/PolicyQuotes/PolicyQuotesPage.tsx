import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import MotorQuotes from './MotorQuotes';

export default class QuotesPage extends React.PureComponent<any, any> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/motor`} component={MotorQuotes} />
            </Switch>
        )
    }
}
