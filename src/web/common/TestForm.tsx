import * as React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
const validate = require('validate.js');
import * as moment from 'moment';

import FormDatePicker from './controls/FormDatePicker';
import FormTextField from './controls/FormTextField';
import FormSelect from './controls/FormSelect';
import FormRadioGroup from './controls/FormRadioGroup';

class TestForm extends React.Component<any, any> {
    submit = (values) => console.log('Log => TestForm submitted with: ', values);

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)} style={{ padding: '50px', backgroundColor: '#FFF' }}>
                <Field
                    name="K"
                    label="What is your Policy number"
                    component={FormRadioGroup}
                    options={[{
                        name: 'Owned',
                        value: 1,
                    }, {
                        name: 'Leased',
                        value: 2,
                    }, {
                        name: 'Financed',
                        value: 3,
                    }]}
                    errorAboveField
                    style={{ marginBottom: '15px' }}
                />
                <Field
                    name="A"
                    label="What is your Policy number"
                    component={FormTextField}
                    errorInsideLabel
                    compactLabel
                    placeholder="Test Value"
                    style={{ marginBottom: '15px' }}
                />
                <Field
                    name="B"
                    label="What is your Policy number"
                    component={FormTextField}
                    design={FormTextField.Modern}
                    errorAboveField
                    placeholder="Test Value"
                    style={{ marginBottom: '15px' }}
                />
                <Field
                    name="C"
                    label="What is your Policy number"
                    component={FormSelect}
                    design={FormSelect.Modern}
                    errorAboveField
                    placeholder="Test Value"
                    options={[{ id: '1', name: 'name-1' }, { id: '2', name: 'name-2' }, { id: '3', name: 'name-3' }]}
                    style={{ marginBottom: '15px' }}
                />
                <Field
                    name="D"
                    label="What is your Policy number"
                    component={FormSelect}
                    errorInsideLabel
                    compactLabel
                    placeholder="Test Value"
                    options={[{ id: '1', name: 'name-1' }, { id: '2', name: 'name-2' }, { id: '3', name: 'name-3' }]}
                    style={{ marginBottom: '15px' }}
                />
                <Field
                    name="F"
                    label="What is your Policy number"
                    component={FormDatePicker}
                    errorAboveField
                    style={{ marginBottom: '15px' }}
                />
                <button type="submit">SUBMIT</button>
            </form>
        );
    }
}

const validationSchema = {
    A: {
        presence: {
            message: 'A is required...',
        },
    },
    B: {
        presence: {
            message: 'B is required...',
        },
    },
    C: {
        presence: {
            message: 'C is required...',
        },
    },
    D: {
        presence: {
            message: 'D is required...',
        },
    },
    E: {
        presence: {
            message: 'E is required...',
        },
    },
    F: {
        presence: {
            message: 'E is required...',
        },
    },
    K: {
        presence: {
            message: 'K is required...',
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
        E: '2018-01-07T21:00:00.000Z',
    }
})(TestForm);
