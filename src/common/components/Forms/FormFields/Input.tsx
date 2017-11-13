import * as React from 'react';
import styled from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import {PINK} from 'src/common/constants/palette';

// tslint:disable-next-line:no-var-requires
//const FontAwesome = require('react-fontawesome');

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`margin-bottom: ${MARGIN.large}px;`;

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
    font-weight: 500;
    font-size: 11px;
    color: white;
    text-transform: uppercase;
`
// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  color: ${PINK};
  font-size: 11px;
`

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 50px;
  background-color: white;
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  font-size: 20px;
  border-radius: 0;
  border: 2px solid transparent;
`

interface IInputProps {
    label?: string;
    input: {
        onChange: (v: any) => void;
        value: any;
    },
    meta: {
        error?: string;
    }
}

export default (props: IInputProps) => {
    const {
        label,
        input,
    } = props;
    
    return (
        <Container>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {label ?
                    <Label>
                        {label}
                    </Label>
                    : null
                }
                <div style={{flex: 1}}/>
            </div>
            <Input
                onChange={(v: any) => input.onChange(v)}
                value={input.value}
            />
        </Container>
    )
}