import * as React from 'react';
import AddressForm from './AddressForm';
import {IAddressFormValues} from '~/common/interfaces/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {addressStepsFlow} from '~/common/sagas/userDetails';

interface IAddressStepsProps {
    currentStep: number;
    motorId: number;
}

class AddressSteps extends React.Component<IAddressStepsProps, {}> {
    componentWillMount() {
        injectSaga(addressStepsFlow, this.props.motorId);
    }

    handleAddressFormSubmit(values: IAddressFormValues) {
        console.log(values);
    }

    render() {
        switch (this.props.currentStep) {
            case 1:
                return <AddressForm onSubmit={this.handleAddressFormSubmit} />
            default:
                return null;
        }
    }
}

export default AddressSteps;