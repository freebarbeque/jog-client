import * as React from 'react';
import * as moment from 'moment';

import Select from '../Select';
import { getDaysForMonth, getMonthsForDate } from 'src/web/common/dateUtils';
import { cookInitialState } from './cookState';

import ErrorText from 'src/web/components/Forms/ErrorText';
import { Container, Wrapper } from './styled';

interface IDatePickerProps {
    name?: string;
    initialDate?: any;
    minDate?: any;
    maxDate?: any;
    onChange?: (value: any) => void;
    errorMessage?: any;
    valid?: any;
    invalid?: any;
}

class DatePicker extends React.PureComponent<IDatePickerProps, any> {
    constructor(props: any) {
        super(props);

        this.state = cookInitialState({
            initialDate: this.props.initialDate,
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
        });
    }

    updateRelations = () => {
        this.updateOptions();
        this.updateDate();
    };

    updateDate = () => {
        const { day, year, month } = this.state;

        if (year && month && day && this.props.onChange) {
            const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
            this.props.onChange(date);
        }
    };

    updateOptions = () => {
        const { day, year, month } = this.state;

        this.setState({
            ...this.state,
            options: {
                ...this.state.options,
                months: getMonthsForDate(day, year),
                days: getDaysForMonth(month, year),
            }
        })
    };

    renderErrorMessage = () => {
        const { errorMessage } = this.props;
        return <div><ErrorText>{errorMessage}</ErrorText></div>;
    };

    render() {
        const { name, valid, invalid, errorMessage, ...rest } = this.props;

        const {
            day,
            month,
            year,
            options,
        } = this.state;

        return (
            <Wrapper>
                <Container name={name}>
                    <Select
                        value={day}
                        options={options.days}
                        placeholder="Day"
                        invalid={invalid}
                        valid={valid}
                        onChange={value => this.setState({ day: value }, this.updateRelations)}
                    />
                    <Select
                        value={month}
                        options={options.months}
                        placeholder="Month"
                        invalid={invalid}
                        valid={valid}
                        onChange={value => this.setState({ month: value }, this.updateRelations)}
                        style={{ margin: '0 20px' }}
                    />
                    <Select
                        value={year}
                        options={options.years}
                        placeholder="Year"
                        invalid={invalid}
                        valid={valid}
                        onChange={value => this.setState({ year: value }, this.updateRelations)}
                    />
                </Container>
                {errorMessage && this.renderErrorMessage()}
            </Wrapper>
        );
    }
}

export default DatePicker;
