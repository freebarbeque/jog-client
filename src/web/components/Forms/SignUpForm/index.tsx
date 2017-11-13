import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import {Link} from 'react-router-dom';
import {DARK_GRAY} from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';
import {MARGIN} from 'src/common/constants/style';
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';

interface ISignUpFormValues {
    email: string;
    password: string;
}

interface ISignUpFormProps {
    handleSubmit: any;
}

class SignUpForm extends React.Component<ISignUpFormProps, {}> {
    public render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <AuthFormFields
                    fields={[
                        {name: 'name', label: 'full name'},
                        'email',
                        'password',
                    ]}
                    Accessories={Accessories}
                    buttonLabel="REGISTER"
                />
            </form>
        );
    }
}

const validationSchema = {
    name: {
        presence: {
            message: 'Please enter your name',
        },
    },
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
            message: 'Must be at least 8 characters long',
        },
        length: {
            minimum: 8,
            tooShort: 'Must be at least 8 characters long',
        },
    }
}

const validateForm = (values: ISignUpFormValues) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const form = reduxForm({
    form: 'sigupForm',
    validate: validateForm,
})(SignUpForm);

export default form;