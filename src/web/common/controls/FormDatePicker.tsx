import * as React from 'react';

import DatePicker from './base/DatePicker';

interface IDatePickerProps {
  input: {
    onChange: (value: any) => void,
    value: any,
    name: string;
  },
  meta: {
    error?: string,
    touched: boolean,
    valid: boolean,
    invalid: boolean,
  },
  minDate?: any,
  maxDate?: any,
}

class FormDatePicker extends React.PureComponent<IDatePickerProps, any> {
  render() {
    const { input, meta, ...rest } = this.props;

    return (
        <DatePicker
            name={input.name}
            initialDate={input.value}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            onChange={input.onChange}
            errorMessage={meta.touched && meta.error}
            valid={meta.touched && meta.valid}
            invalid={meta.touched && meta.invalid}
        />
    );
  }
}

export default FormDatePicker;
