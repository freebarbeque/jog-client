import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './FormFields/Input';
const validate = require("validate.js");

interface ISignInFormValues {
    email: string;
    password: string;
}

interface ISignInFormProps {
    handleSubmit: any;
}

class SignInForm extends React.Component<ISignInFormProps, {}> {
    public render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field
                    name="email"
                    component={Input}
                    label="email"
                />
                <Field
                    name="password"
                    component={Input}
                    label="password"
                />
            </form>
        )
    }
}

const validationSchema = {
    email: {
        presence: {
            message: "Please enter a valid email address",
        },
        email: {
            message: "Please enter a valid email address",
        },
    },
    password: {
        presence: {
            message: "Please enter a valid password",
        },
    }
}

const validateForm = (values: ISignInFormValues) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const form = reduxForm({
    form: 'siginForm',
    validate: validateForm,
})(SignInForm);

export default form;