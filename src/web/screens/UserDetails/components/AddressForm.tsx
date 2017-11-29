import * as React from 'react';
import {reduxForm} from 'redux-form';
import FieldTitle from './FieldTitle';

interface IAddressFormProps {
    className: string;
}

const AddressForm = (props: IAddressFormProps) => {
    return (
        <form className={props.className}>
            <FieldTitle>111</FieldTitle>
        </form>
    )
};

const formOptions = {
    form: 'addressDetailsForm'
};

export default reduxForm(formOptions)(AddressForm);