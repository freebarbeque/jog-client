import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './FormFields/Input';
const validate = require('validate.js');
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { DARK_GRAY } from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';
import { MARGIN } from 'src/common/constants/style';

interface ISignInFormValues {
    email: string;
    password: string;
}

interface ISignInFormProps {
    handleSubmit: any;
}

class SignInForm extends React.Component<ISignInFormProps, {}> {
    public render() {
        const accessoryStyle = { fontWeight: 500, fontSize: 11, color: DARK_GRAY }

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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FlatButton
                        style={accessoryStyle as any}
                        containerElement={<Link to="/auth/forgotPassword" />}
                    >
                        FORGOT PASSWORD
                    </FlatButton>
                    <div style={{ flex: 1 }} />
                    <FlatButton
                        style={accessoryStyle as any}
                        containerElement={<Link to="/auth/register" />}
                    >
                        REGISTER NOW
                    </FlatButton>
                </div>
                <RoundedButton
                    type="submit"
                    label="SIGN IN"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: MARGIN.extraLarge,
                    }}
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
    form: 'siginForm',
    validate: validateForm,
})(SignInForm);

export default form;