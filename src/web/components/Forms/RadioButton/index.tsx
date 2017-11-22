import * as React from 'react';
import {IDataSource} from '~/common/interfaces/dataSource';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

interface IRadioButtonProps {
    input: {
        onChange: (value: any) => void;
        value: any;
        name: string;
    },
    dataSource: IDataSource[];
}

export default (props: IRadioButtonProps) => {
    const {
        input: {
            onChange,
            value,
            name,
        }
    } = props;

    return (
        <RadioButtonGroup
            name={name}
            valueSelected={value}
            onChange={(event: any, value: any) => onChange(value)}
            style={{display: 'flex'}}
        >
            {props.dataSource.map((d, i) => (
                <RadioButton
                    key={i}
                    value={d.id}
                    label={d.name}
                    labelStyle={{width: 'unset'}}
                    iconStyle={value === d.id ? {fill: '#50E3C2'} : {fill: '#dbdcde'}}
                />
            ))}
        </RadioButtonGroup>
    )
}