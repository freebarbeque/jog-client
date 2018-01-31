import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFormValues} from 'redux-form';
import {injectSaga} from '~/common/utils/saga';

import PureLayout from 'src/web/common/layouts/PureLayout';
import MotorPolicyQuoteVehicleDetails from './MotorPolicyQuoteVehicleDetails';

import { withDeferredSubmit } from 'src/web/common/utils/form/withDeferredSubmit';
import { submitQuoteVehicleRequest, refreshQuoteVrmRequest } from 'src/common/actions/quote/vehicle';

import quoteVehicleWorker from 'src/common/sagas/quote/vehicle';

const FORM_NAME = 'MOTOR_POLICY_QUOTE_VEHICLE';

class MotorPolicyQuoteVehicle extends React.PureComponent<any, any> {
    layoutDescription = {
        title: 'Vehicle',
        backUrl: `/app/dashboard/motor/${this.props.match.params.policyId}/quote`,
    };

    private saga;

    componentDidMount() {
        injectSaga(quoteVehicleWorker, FORM_NAME, this.props.match.params.policyId)
            .then(saga => this.saga = saga);
    }

    componentWillUnmount() {
        if (this.saga) {
            this.saga.cancel();
        }
    }

    handleSubmit = data => {
        const { submitQuoteVehicleRequest } = this.props;
        return withDeferredSubmit(submitQuoteVehicleRequest, data);
    };

    render() {
        const {
            formValues,
            quoteVehicle,
            refreshQuoteVrmRequest,
        } = this.props;

        return (
            <PureLayout description={this.layoutDescription}>
                <MotorPolicyQuoteVehicleDetails
                    onSubmit={this.handleSubmit}
                    onRefreshButtonClick={refreshQuoteVrmRequest}
                    form={FORM_NAME}
                    formValues={formValues}
                    quoteVehicle={quoteVehicle}
                />
            </PureLayout>
        );
    }
}

const mapStateToProps = state => ({
    formValues: getFormValues(FORM_NAME)(state),
    quoteVehicle: state.quoteVehicle,
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    refreshQuoteVrmRequest,
    submitQuoteVehicleRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotorPolicyQuoteVehicle);
