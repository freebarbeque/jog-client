import * as React from 'react';
import {reduxForm} from 'redux-form';

interface IAddressFormProps {
    className: string;
}

const form = (props: IAddressFormProps) => {
    return (
        <form className={props.className}>
            111
        </form>
    )
}

const formOptions = {
    form: 'addressDetailsForm'
};

export default reduxForm(formOptions)(form);