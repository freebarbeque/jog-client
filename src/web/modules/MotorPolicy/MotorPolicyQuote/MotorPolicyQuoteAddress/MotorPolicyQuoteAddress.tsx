import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {injectSaga} from '~/common/utils/saga';

import { quoteAddressWorker } from 'src/common/sagas/quoteAddresses';
import MotorPolicyQuoteAddressesList from './MotorPolicyQuoteAddressesList';
import MotorPolicyQuoteAddressAdd from './MotorPolicyQuoteAddressAdd';
import MotorPolicyQuoteAddressEdit from './MotorPolicyQuoteAddressEdit';

export default class MotorPolicyQuoteAddress extends React.PureComponent<any, any> {
    private saga;

    componentWillMount() {
        injectSaga(quoteAddressWorker, this.props.match.params.policyId)
            .then(saga => this.saga = saga);
    }

    componentWillUnmount() {
        if (this.saga) {
            this.saga.cancel();
        }
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={MotorPolicyQuoteAddressAdd} />
                <Route path={`${this.props.match.url}/:addressId/edit`} component={MotorPolicyQuoteAddressEdit} />
                <Route path={`${this.props.match.url}`} component={MotorPolicyQuoteAddressesList} />
            </Switch>
        )
    }
}
