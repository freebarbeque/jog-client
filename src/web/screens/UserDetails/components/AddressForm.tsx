import * as React from 'react';
import {reduxForm} from 'redux-form';
import FieldTitle from './FieldTitle';
import styledForm from './styledForm';

interface IAddressFormProps {
    className: string;
}

const AddressForm = (props: IAddressFormProps) => {
    return (
        <form className={props.className}>
            <FieldTitle>Post Code</FieldTitle>
        </form>
    )
};

const formOptions = {
    form: 'addressDetailsForm'
};

export default reduxForm(formOptions)(styledForm(AddressForm));