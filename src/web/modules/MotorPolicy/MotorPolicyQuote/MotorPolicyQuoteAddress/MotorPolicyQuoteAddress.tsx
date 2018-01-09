import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {injectSaga} from '~/common/utils/saga';

import { quoteAddressWorker } from 'src/common/sagas/quoteAddress';
import MotorPolicyQuoteAddressOverview from './MotorPolicyQuoteAddressOverview'

export default class MotorPolicyQuoteAddress extends React.PureComponent<any, any> {
    componentWillMount() {
        injectSaga(quoteAddressWorker);
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/add`} component={() => <h1>Add address</h1>} />
                <Route path={`${this.props.match.path}/:addressId/edit`} component={() => <h1>Edit address</h1>} />
                <Route path={`${this.props.match.path}`} component={MotorPolicyQuoteAddressOverview} />
            </Switch>
        )
    }
}
