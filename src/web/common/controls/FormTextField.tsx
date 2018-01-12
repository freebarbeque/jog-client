import * as React from 'react';
import TextField from './base/TextField';

export default function FormTextField(props: any) {
    const { input, meta, ...rest } = props;
    const { name, value, onChange, ...restInput } = input;

    return (
        <TextField
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
