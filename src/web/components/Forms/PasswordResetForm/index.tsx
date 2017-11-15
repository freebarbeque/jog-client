import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
const validate = require('validate.js');
import AuthFormFields from '../AuthFormFields';
import Accessories from './Accessories';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from 'src/common/selectors/auth';
import {PASSWORD_RESET_FORM} from 'src/common/constants/auth';

interface IPasswordResetFormValues {
    email: string;
}

interface IPasswordResetFormProps {
    handleSubmit: any;
    form: string;
    isLoading: boolean;
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
}

const validateForm = (values: IPasswordResetFormValues) => {
    const errors = validate(values, validationSchema);

    return errors;
}

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state)
})

const form = reduxForm({
    form: PASSWORD_RESET_FORM,
    validate: validateForm,
})(connect(mapStateToProps, null)(PasswordResetForm));

export default form;