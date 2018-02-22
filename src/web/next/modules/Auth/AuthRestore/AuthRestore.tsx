import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { validateForm } from './validate';
import { restore } from 'src/web/next/store/auth/actions';
import AuthLayout from '../AuthLayout';
import AuthTextField from '../AuthForm/TextField';

import SubmitButton from 'src/web/common/components/controls/SubmitButton';

import * as s from '../AuthForm/assets/Form.styled';

class AuthRestore extends React.PureComponent<any, any> {
    state: any = { showConfirmation: false, email: '' };

    submit = async ({ email }) => {
        await this.props.initRestore(email);
        this.setState({ showConfirmation: true, email });
    };

    render() {
        const { showConfirmation, email } = this.state;

        if (showConfirmation && email) {
            return (
                <AuthLayout fluid title="Password Reset">
                    {`We just sent you an email on ${email} through which you can reset your password.`}
                </AuthLayout>
            )
        }

        return (
            <AuthLayout title="Password reset">
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
                                <s.FormLinks>
                                    <Link to="/auth/login">Know your password?</Link>
                                </s.FormLinks>
                            </s.FormField>
                        </s.FormBody>
                        <s.FormFooter>
                            <SubmitButton type="submit" label="Send email" />
                        </s.FormFooter>
                    </form>
                </s.Form>
            </AuthLayout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initRestore: email => dispatch(restore(email)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'RestoreForm',
    validate: validateForm,
})(AuthRestore));
