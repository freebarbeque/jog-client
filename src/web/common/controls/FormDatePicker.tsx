import * as React from 'react';

import DatePicker from './base/DatePicker';
import FormField from './FormField';

class FormDatePicker extends React.PureComponent<any, any> {
  render() {
    const {
      compactLabel,
      errorInsideLabel,
      errorBelowField,
      errorAboveField,
      style,
      label,
      input,
      meta,
      ...rest,
    } = this.props;

    const formFieldProps = {
      compactLabel,
      errorInsideLabel,
      errorBelowField,
      errorAboveField,
      label,
      style,
      errorMessage: (meta.submitFailed && meta.error) || null,
    };

    return (
        <FormField {...formFieldProps}>
          <DatePicker
              name={input.name}
              initialDate={input.value}
              onChange={input.onChange}
              valid={meta.submitFailed && meta.valid}
              invalid={meta.submitFailed && meta.invalid}
              {...rest}
          />
        </FormField>
    );
  }
}

export default FormDatePicker;
