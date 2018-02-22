import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { validateForm } from './validate';
import { join } from 'src/web/next/store/auth/actions';
import AuthLayout from '../AuthLayout';
import AuthTextField from '../AuthForm/TextField';

import SubmitButton from 'src/web/common/components/controls/SubmitButton';

import * as s from '../AuthForm/assets/Form.styled';

class AuthJoin extends React.PureComponent<any, any> {
    submit = values => {
        const { full_name, ...rest } = values;

        const name = full_name.split(' ');

        const user = {
            first_name: name[0],
            last_name: name[1],
            ...rest,
        };

        return this.props.initJoin(user);
    };

    render() {
        const { submitting } = this.props;

        return (
            <AuthLayout title="Welcome to Jog">
                <s.Form>
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <s.FormBody>
                            <s.FormField>
                                <Field
                                    label="Full Name"
                                    name="full_name"
                                    placeholder="John Doe"
                                    component={AuthTextField}
                                />
                            </s.FormField>
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
                                    <Link to="/auth/login">Got an account?</Link>
                                </s.FormLinks>
                            </s.FormField>
                        </s.FormBody>
                        <s.FormFooter>
                            <SubmitButton type="submit" label="Continue" disabled={submitting} />
                        </s.FormFooter>
                    </form>
                </s.Form>
            </AuthLayout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initJoin: data => dispatch(join(data)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'JoinForm',
    validate: validateForm,
})(AuthJoin));
