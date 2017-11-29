import * as React from 'react';
import {IDataSource} from '~/common/interfaces/dataSource';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';

interface IRadioButtonProps {
    input: {
        onChange: (value: any) => void;
        value: any;
        name: string;
    },
    dataSource: IDataSource[];
}

const Button = styled.div`
    height: 40px;
    background-color: ${props => props.checked ? '#50e3c2' : '#dbdcde'};
    box-shadow: ${props => props.checked ? '0 4px 4px #ddd' : ''};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${props => props.checked ? BLUE : '#666B80'};
`;

const Container = styled.div`
    span {
        width: 100%!important;
        height: 160%!important;
    }
`;

export default (props: IRadioButtonProps) => {
    const {
        input: {
            onChange,
            value,
            name,
        }
    } = props;

    return (
        <Container>
            <RadioButtonGroup
                name={name}
                valueSelected={value}
                onChange={(event: any, value: any) => onChange(value)}
                style={{display: 'flex', justifyContent: 'space-between', height: 40}}
            >
                {props.dataSource.map((d, i) => (
                    <RadioButton
                        disableTouchRipple
                        key={i}
                        value={d.id}
                        uncheckedIcon={<Button>{d.name}</Button>}
                        checkedIcon={<Button checked>{d.name}</Button>}
                        style={{width: `calc(${100 / props.dataSource.length}% - 5px)`, height: 40}}
                        iconStyle={{width: '100%', height: 40}}
                    />
                ))}
            </RadioButtonGroup>
        </Container>
    )
}
