import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import FieldTitle from './FieldTitle';
import styledForm from './styledForm';
import StyledInput from './StyledInput';

interface IAddressFormProps {
    className: string;
}

const AddressForm = (props: IAddressFormProps) => {
    return (
        <form className={props.className}>
            <FieldTitle>Post Code</FieldTitle>
            <Field
                name="postcode"
                component={StyledInput}
            />
        </form>
    )
};

const formOptions = {
    form: 'addressDetailsForm'
};

export default reduxForm(formOptions)(styledForm(AddressForm));