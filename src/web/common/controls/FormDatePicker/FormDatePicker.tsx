import * as React from 'react';
import * as moment from 'moment';

import Select from '../base/Select';
import { getYears, getMonths, getMonthDays } from 'src/common/utils/dataSources';
import { cookInitialState } from './cookState';

import ErrorText from 'src/web/components/Forms/ErrorText';
import { Container, Wrapper } from './styled';

interface IDatePickerProps {
  input: {
    onChange: (value: any) => void,
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
  constructor(props: any) {
    super(props);
    this.state = cookInitialState(this.props);
  }

  updateRelations = () => {
    this.updateOptions();
    this.updateDate();
  };

  updateDate = () => {
    const { day, year, month } = this.state;

    if (year && month && day) {
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      this.setState({ date });
      this.props.input.onChange(date);
    }
  };

  updateOptions = () => {
    const { day, year, month } = this.state;

    this.setState({
        ...this.state,
      options: {
          ...this.state.options,
        months: getMonths(day, year),
        days: getMonthDays(month, year),
      }
    })
  };

  renderErrorMessage = () => {
    const { meta: { error } } = this.props;
    return <div><ErrorText>{error}</ErrorText></div>;
  };

  render() {
    const { input, meta, ...rest } = this.props;
    const { minDate, maxDate, ...selectInput } = rest;

    const {
      day,
      month,
      year,
      options,
    } = this.state;

    return (
        <Wrapper>
          <Container>
            <Select
                value={day}
                options={options.days}
                placeholder="Day"
                invalid={meta.touched && meta.invalid}
                valid={meta.touched && meta.valid}
                onChange={value => this.setState({ day: value }, this.updateRelations)}
                {...selectInput}
            />
            <Select
                value={month}
                options={options.months}
                placeholder="Month"
                invalid={meta.touched && meta.invalid}
                valid={meta.touched && meta.valid}
                onChange={value => this.setState({ month: value }, this.updateRelations)}
                style={{ margin: '0 20px' }}
                {...selectInput}
            />
            <Select
                value={year}
                options={options.years}
                placeholder="Year"
                invalid={meta.touched && meta.invalid}
                valid={meta.touched && meta.valid}
                onChange={value => this.setState({ year: value }, this.updateRelations)}
                {...selectInput}
            />
          </Container>
          {meta.touched && meta.error && this.renderErrorMessage()}
        </Wrapper>
    );
  }
}

export default FormDatePicker;
