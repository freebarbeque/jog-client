import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import {Link} from 'react-router-dom';
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from 'src/common/selectors/auth';

interface ISignUpFormValues {
    email: string;
    password: string;
}

interface ISignUpFormProps {
    handleSubmit: any;
    form: string;
    isLoading: boolean;
}

class SignUpForm extends React.Component<ISignUpFormProps, {}> {
    public render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <AuthFormFields
                    fields={[
                        {name: 'name', label: 'full name'},
                        'email',
                        {name: 'password', type: 'password'},
                    ]}
                    Accessories={Accessories}
                    buttonLabel="REGISTER"
                    form={this.props.form}
                    isLoading={this.props.isLoading}
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

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state)
})

const form = reduxForm({
    form: 'signUpForm',
    validate: validateForm,
})(connect(mapStateToProps, null)(SignUpForm));

export default form;