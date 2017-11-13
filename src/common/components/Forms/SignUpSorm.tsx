import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './FormFields/Input';
const validate = require("validate.js");
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import {DARK_GRAY} from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';
import {MARGIN} from 'src/common/constants/style';

interface ISignUpFormValues {
    email: string;
    password: string;
}

interface ISignUpFormProps {
    handleSubmit: any;
}

class SignUpForm extends React.Component<ISignUpFormProps, {}> {
    public render() {
        const accessoryStyle = {fontWeight: 500, fontSize: 11, color: DARK_GRAY}

        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field
                    name="name"
                    component={Input}
                    label="full name"
                />
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <FlatButton
                        style={{ fontWeight: 500, fontSize: 11, color: DARK_GRAY }}
                        containerElement={<Link to="/auth/login" />}
                    >
                        GOT AN ACCOUNT?
                    </FlatButton>
                </div>
                <RoundedButton
                    type="submit"
                    label="REGISTER"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: MARGIN.extraLarge,
                    }}
                />
            </form>
        );
    }
}

const validationSchema = {
    name: {
        presence: {
            message: "Please enter your name",
        },
    },
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
            message: "Must be at least 8 characters long",
        },
        length: {
            minimum: 8,
            tooShort: "Must be at least 8 characters long",
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