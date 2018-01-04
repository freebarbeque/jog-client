import * as React from 'react';
import * as moment from 'moment';

import Select from '../base/Select';
import { getYears, getMonths, getMonthDays } from 'src/common/utils/dataSources';

class FormDatePicker extends React.PureComponent<any, any> {
  state = {
    day: undefined,
    month: undefined,
    year: undefined,
    options: {
      years: getYears(),
      months: getMonths(),
      days: getMonthDays(),
    }
  };

  private menu;

  componentWillReceiveProps(nextProps: any) {
    // console.log('Log => componentWillReceiveProps nextProps: ', nextProps);
  }

  componentDidUpdate() {
    // this.updateDateField();
  }

  handleYearSelected = (value) => {
    this.setState({ year: value }, () => { console.log('LOL') })
  };

  handleMonthSelected = (value) => {
    this.setState({ month: value })
  };

  handleDaySelected = (value) => {
    this.setState({ day: value });
  };

  updateOptions = () => {
    const { day, year, month } = this.state;

    this.setState({
        ...this.state,
      options: {
        years: getYears(month),
        months: getMonths(day, year),
        days: getMonthDays(month, year),
      }
    })
  };

  updateDateField = () => {
    const { day, year, month } = this.state;

    if (year && month && day) {
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      this.props.input.onChange(date);
    }
  };

  render() {
    const { input, meta, ...rest } = this.props;

    console.log('Log => state: ', this.state);

    const {
      day,
      month,
      year,
      options,
    } = this.state;

    return (
        <div>
          <Select value={day} options={options.days} onChange={this.handleDaySelected}/>
          <Select value={month} options={options.months} onChange={this.handleMonthSelected}/>
          <Select value={year} options={options.years} onChange={this.handleYearSelected}/>
        </div>
    );
  }
}

export default FormDatePicker;
