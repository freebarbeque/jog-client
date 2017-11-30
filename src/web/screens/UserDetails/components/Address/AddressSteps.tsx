import * as React from 'react';
import AddressForm from './AddressForm';
import {IAddressFormValues} from '~/common/interfaces/userDetails';

interface IAddressStepsProps {
    currentStep: number
}

class AddressSteps extends React.Component<IAddressStepsProps, {}> {
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