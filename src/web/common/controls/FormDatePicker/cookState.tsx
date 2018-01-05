import * as moment from 'moment';
import { getYearsInRange, getMonths, getMonthDays } from 'src/common/utils/dataSources';

export const cookInitialState = (props: any) => {
    const date = moment(props.input.value);

    if (date.isValid()) {
        const day = date.date();
        const month = date.month();
        const year = date.year();

        return {
            day,
            month: month + 1, // getMonths fn: months in range [1..12]
            year,
            date,
            options: {
                years: getYearsInRange(props.minDate, props.maxDate),
                months: getMonths(day, year),
                days: getMonthDays(month, year),
            }
        }
    }

    return {
        day: undefined,
        month: undefined,
        year: undefined,
        date: undefined,
        options: {
            years: getYearsInRange(props.minDate, props.maxDate),
            months: getMonths(),
            days: getMonthDays(),
        }
    }
};
