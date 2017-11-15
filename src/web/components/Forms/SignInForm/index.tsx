import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from 'src/common/selectors/auth';
import {IUserCreds} from "~/common/interfaces/user";
import {SIGN_IN_FORM} from 'src/common/constants/auth';

interface ISignInFormProps {
    handleSubmit: any;
    form: string;
    isLoading: boolean;
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
                    isLoading={this.props.isLoading}
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

const validateForm = (values: IUserCreds) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state)
})

const form = reduxForm({
    form: SIGN_IN_FORM,
    validate: validateForm,
})(connect(mapStateToProps, null)(SignInForm));

export default form;