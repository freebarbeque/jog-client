import * as React from 'react';
import AddressForm from './AddressForm';

interface IAddressStepsProps {
    currentStep: number
}

export default (props: IAddressStepsProps) => {
    switch (props.currentStep) {
        case 1:
            return <AddressForm />
        default:
            return null;
    }
}