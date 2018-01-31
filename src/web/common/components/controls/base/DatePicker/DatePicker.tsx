import * as React from 'react';
import * as moment from 'moment';

import { cookInitialState, updateStateOptions } from './helpers';

import DatePickerContent from './DatePickerContent';

class DatePicker extends React.PureComponent<any, any> {
    static defaultProps = {
        gapWidth: 15,
    };

    constructor(props: any) {
        super(props);

        this.state = cookInitialState({
            initialDate: props.initialDate,
            minDate: props.minDate,
            maxDate: props.maxDate,
        });
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.initialDate !== nextProps.initialDate) {
            const nextState = cookInitialState({
                initialDate: nextProps.initialDate,
                minDate: nextProps.minDate,
                maxDate: nextProps.maxDate,
            });

            this.setState(nextState);
        }
    }

    handleChange = key => value => {
      this.setState({
          ...this.state,
          values: {
              ...this.state.values,
              ...{ [key]: value },
          },
      }, () => {
          this.updateOptionLists();

          if (this.props.onChange) {
              const { year, month, day } = this.state.values;

              if (year && month && day) {
                  const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
                  this.props.onChange(date);
              }
          }
      })
    };

    updateOptionLists = () => {
        this.setState(updateStateOptions({
            state: this.state,
            day: this.state.values.day,
            month: this.state.values.month,
            year: this.state.values.year,
        }))
    };

    render() {
        const { gapWidth, selectProps: initialSelectProps, valid, invalid } = this.props;

        const dataSource = [{
            placeholder: 'Day',
            value: this.state.values.day,
            options: this.state.options.days,
            onChange: this.handleChange('day'),
        }, {
            placeholder: 'Month',
            value: this.state.values.month,
            options: this.state.options.months,
            onChange: this.handleChange('month'),
            rootStyles: { margin: `0 ${gapWidth}px` }
        }, {
            placeholder: 'Year',
            value: this.state.values.year,
            options: this.state.options.years,
            onChange: this.handleChange('year'),
        }];

        const selectProps = {
            ...initialSelectProps,
            valid,
            invalid,
        };

        return (
            <DatePickerContent
                dataSource={dataSource}
                selectProps={selectProps}
            />
        );
    }
}

export default DatePicker;
