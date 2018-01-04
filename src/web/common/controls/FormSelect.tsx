import * as React from 'react';

import Select from './base/Select';

export default function FormSelect(props: any) {
    const { input, meta, ...rest } = props;
    const { name, value, onChange, ...restInput } = input;

    return (
        <Select
            name={name}
            value={value}
            onChange={onChange}
            inputProps={restInput}
            errorMessage={(meta.touched && meta.error) || null}
            disabled={meta.submitting}
            {...rest}
        />
    )
}