import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';

interface ISignInFormValues {
    email: string;
    password: string;
}

interface ISignInFormProps {
    handleSubmit: any;
    form: string;
}

class SignInForm extends React.Component<ISignInFormProps, {}> {
    public render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <AuthFormFields
                    fields={[
                        'email',
                        {name: 'password', type: 'password'},
                    ]}
                    Accessories={Accessories}
                    buttonLabel="SIGN IN"
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
    password: {
        presence: {
            message: 'Please enter a valid password',
        },
    }
}

const validateForm = (values: ISignInFormValues) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const form = reduxForm({
    form: 'signInForm',
    validate: validateForm,
})(SignInForm);

export default form;