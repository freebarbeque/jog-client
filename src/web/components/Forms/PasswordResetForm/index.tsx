import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';

interface IPasswordResetFormValues {
    email: string;
    password: string;
}

interface IPasswordResetFormProps {
    handleSubmit: any;
    form: string;
}

class PasswordResetForm extends React.Component<IPasswordResetFormProps, {}> {
    public render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <AuthFormFields
                    fields={[
                        'email',
                    ]}
                    Accessories={Accessories}
                    buttonLabel="Send email"
                    form={this.props.form}
                />
            </form>
        )
    }
}

const validationSchema = {
    email: {
        presence: {
            message: 'Please enter a valid email address',
        },
        email: {
            message: 'Please enter a valid email address',
        },
    },
}

const validateForm = (values: IPasswordResetFormValues) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const form = reduxForm({
    form: 'passwordResetForm',
    validate: validateForm,
})(PasswordResetForm);

export default form;