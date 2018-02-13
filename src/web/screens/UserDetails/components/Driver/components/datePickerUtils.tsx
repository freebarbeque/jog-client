import * as React from 'react';
import DatePicker from 'src/web/components/PolicyDatePicker';
const moment = require('moment');

export const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
        minDate={moment().subtract(100, 'years')}
        maxDate={moment()}
    />
);
