import * as moment from 'moment';

import { getDaysForMonth, getMonthsForDate, getYearsInRange } from 'src/web/common/utils/dateUtils';

export const cookInitialState = ({ initialDate, minDate, maxDate }) => {
    const date = moment(initialDate);

    if (date.isValid()) {
        const day = date.date();
        const month = date.month() + 1;
        const year = date.year();

        return {
            values: {
                day,
                month,
                year,
            },
            options: {
                years: getYearsInRange(minDate, maxDate),
                months: getMonthsForDate(day, year),
                days: getDaysForMonth(month, year),
            }
        }
    }

    return {
        values: {
            day: undefined,
            month: undefined,
            year: undefined,
        },
        options: {
            years: getYearsInRange(minDate, maxDate),
            months: getMonthsForDate(),
            days: getDaysForMonth(),
        }
    }
};

export const updateStateOptions = ({ state, day, month, year }) => {
    return {
        ...state,
        options: {
            ...state.options,
            months: getMonthsForDate(day, year),
            days: getDaysForMonth(month, year),
        }
    }
};
