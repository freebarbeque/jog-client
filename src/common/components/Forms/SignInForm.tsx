import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './FormFields/Input';

class SignInForm extends React.Component<{}, {}> {
    public render() {
        return (
            <form>
                <Field
                    name="email"
                    component={Input}
                    label="E-mail"
                />
            </form>
        )
    }
}

const form = reduxForm({
    form: 'siginForm',
})(SignInForm);

export default form;