import * as React from 'react';
import PostCodeForm from './PostCodeForm';
import {IAddressFormValues} from '~/common/interfaces/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {addressStepsFlow} from '~/common/sagas/userDetails';
import {lookupPostCode} from 'src/common/actions/userDetails';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export interface IAddressStepsProps {
    currentStep: number;
    motorId: number;
    lookupPostCode: ActionCreator<Action>;
}

class AddressSteps extends React.Component<IAddressStepsProps, {}> {
    componentWillMount() {
        injectSaga(addressStepsFlow, this.props.motorId);
    }

    handleAddressFormSubmit = (values: IAddressFormValues) => {
        this.props.lookupPostCode(values.postcode);
    }

    render() {
        switch (this.props.currentStep) {
            case 1:
                return <PostCodeForm onSubmit={this.handleAddressFormSubmit} />
            default:
                return null;
        }
    }
}

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    lookupPostCode,
}, dispatch);

export default connect(null, mapDispatchToProps)(AddressSteps);