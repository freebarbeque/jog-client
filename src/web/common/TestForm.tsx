import * as React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import FormDatePicker from './controls/FormDatePicker';

class TestForm extends React.Component<any, any> {
  submit = (values) => console.log('Log => TestForm submitted with: ', values);

  render() {
    console.log('Log => TestForm props: ', this.props);

    return (
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            name="date"
            component={FormDatePicker}
          />
          <button type="submit">SUBMIT</button>
        </form>
    );
  }
}

export default reduxForm({
  form: 'TestForm',
})(TestForm);
