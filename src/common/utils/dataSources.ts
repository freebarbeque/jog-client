import {isLeapYear, getYear, getMonth, getDate} from 'date-fns';
import {IDataSource} from '../interfaces/dataSource';

const bigMonths = [1, 5, 7, 8, 10, 12];
const months = [
    {id: 1, name: 'January'},
    {id: 2, name: 'February'},
    {id: 3, name: 'March'},
    {id: 4, name: 'April'},
    {id: 5, name: 'May'},
    {id: 6, name: 'June'},
    {id: 7, name: 'July'},
    {id: 8, name: 'August'},
    {id: 9, name: 'September'},
    {id: 10, name: 'October'},
    {id: 11, name: 'November'},
    {id: 12, name: 'December'},
];

export function getMonthDays(month?: string, year?: string) {
    const now = Date.now();
    const currentYear = getYear(now);
    const currentMonth = getMonth(now);
    const currentDay = getDate(now);

    const days: IDataSource[] = [];
    let lastDay;

    if (!month || bigMonths.find(m => m === +month)) {
        lastDay = 31;
    } else if (+month !== 2) {
        lastDay = 30;
    } else if (year && isLeapYear(year)) {
        lastDay = 29;
    } else {
        lastDay = 28;
    }

    for (let i = 1; i <= lastDay; i++) {
        days.push({id: i, name: `${i}`});
    }

    if (month && year && +month === currentMonth + 1 && +year === currentYear) {
        return days.slice(currentDay - 1);
    } else {
        return days;
    }
}

export function getMonths(year?: string) {
    const now = Date.now();
    const currentYear = getYear(now);
    const currentMonth = getMonth(now);

    if ((year && +year === currentYear)) {
        return months.slice(currentMonth);
    } else {
        return months;
    }
}

export function getYears() {
    const currentYear = getYear(Date.now());
    const years: IDataSource[] = [];

    for (let i = currentYear; i <= currentYear + 20; i++) {
        years.push({id: i, name: `${i}`});
    }

    return years;
}