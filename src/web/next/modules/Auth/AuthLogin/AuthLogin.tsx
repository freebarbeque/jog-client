import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { validateForm } from './validate';
import { login } from 'src/web/next/store/auth/actions';
import AuthLayout from '../AuthLayout';
import AuthTextField from '../AuthForm/TextField';

import SubmitButton from 'src/web/common/components/controls/SubmitButton';

import * as s from '../AuthForm/assets/Form.styled';

class AuthLogin extends React.PureComponent<any, any> {
    submit = values => {
        return this.props.initLogin(values);
    };

    render() {
        const { submitting } = this.props;

        return (
            <AuthLayout title="Sign in to Jog">
                <s.Form>
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <s.FormBody>
                            <s.FormField>
                                <Field
                                    label="Email"
                                    name="email"
                                    placeholder="hello@gmail.com"
                                    component={AuthTextField}
                                />
                            </s.FormField>
                            <s.FormField>
                                <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    component={AuthTextField}
                                />
                            </s.FormField>
                            <s.FormField>
                                <s.FormLinks>
                                    <Link to="/auth/restore">Forgot password</Link>
                                    <Link to="/auth/join">Register now</Link>
                                </s.FormLinks>
                            </s.FormField>
                        </s.FormBody>
                        <s.FormFooter>
                            <SubmitButton type="submit" label="Sign in" disabled={submitting} />
                        </s.FormFooter>
                    </form>
                </s.Form>
            </AuthLayout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initLogin: credentials => dispatch(login(credentials)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'LoginForm',
    validate: validateForm,
})(AuthLogin));