import * as React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
const validate = require('validate.js');
import * as moment from 'moment';

import FormDatePicker from './controls/FormDatePicker';

class TestForm extends React.Component<any, any> {
    submit = (values) => console.log('Log => TestForm submitted with: ', values);

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)}>
                <Field
                    name="test"
                    component="input"
                    type="text"
                    placeholder="Test Value"
                />
                <Field
                    name="date"
                    component={FormDatePicker}
                />
                <button type="submit">SUBMIT</button>
            </form>
        );
    }
}

const validationSchema = {
    test: {
        presence: {
            message: 'Test is required...',
        },
    },
    date: {
        presence: {
            message: 'Date is required...',
        },
    },
};

const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, {fullMessages: false});

    return errors;
};

export default reduxForm({
    form: 'TestForm',
    validate: validateForm,
    initialValues: {
        date: '2019-01-07T21:00:00.000Z',
    }
})(TestForm);
