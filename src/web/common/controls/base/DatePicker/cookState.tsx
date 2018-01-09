import * as moment from 'moment';

import { getDaysForMonth, getMonthsForDate, getYearsInRange } from 'src/web/common/dateUtils';

export const cookInitialState = (params: any) => {
    const date = moment(params.initialDate);

    if (date.isValid()) {
        const day = date.date();
        const month = date.month() + 1;
        const year = date.year();

        return {
            day,
            month,
            year,
            date,
            options: {
                years: getYearsInRange(params.minDate, params.maxDate),
                months: getMonthsForDate(day, year),
                days: getDaysForMonth(month, year),
            }
        }
    }

    return {
        day: undefined,
        month: undefined,
        year: undefined,
        date: undefined,
        options: {
            years: getYearsInRange(params.minDate, params.maxDate),
            months: getMonthsForDate(),
            days: getDaysForMonth(),
        }
    }
};
