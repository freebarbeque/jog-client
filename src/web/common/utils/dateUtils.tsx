import * as moment from 'moment';

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

export function  getYearsInRange(minDate?: any, maxDate?: any) {
    const minYear = minDate ? minDate.year() : moment().subtract(20, 'year').year();
    const maxYear = maxDate ? maxDate.year() : moment().add(20, 'year').year();
    const years: any[] = [];

    for (let i = minYear; i <= maxYear; i++) {
        years.push({id: i, name: `${i}`});
    }

    return years;
}

export function getMonthsForDate(day?: any, year?: any) {
    if (!day || !year) {
        return months;
    }

    const monthsWithDaysCount = months.map(m => ({
        ...m,
        daysCount: moment(`${year}-${m.id}`, 'YYYY-MM').daysInMonth(),
    }));

    return monthsWithDaysCount.filter(m => m.daysCount >= day)
}

export function getDaysForMonth(month?: any, year?: any) {
    const daysCount = month && year ? moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() : 31;

    const days: any[] = [];

    for (let i = 1; i <= daysCount; i++) {
        days.push({id: i, name: `${i}`});
    }

    return days;
}
