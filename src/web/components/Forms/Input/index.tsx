import * as React from 'react';
import styled from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import {PINK} from 'src/common/constants/palette';
import ErrorText from 'src/web/components/Forms/ErrorText';

// tslint:disable-next-line:no-var-requires
const FontAwesome = require('react-fontawesome');

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
        touched: boolean;
    },
    type?: string;
    style?: any;
    preCheck?: (value: string) => boolean;
}

const defaultProps = {
    style: {},
    preCheck: (value: string) => true,
}

export default (passedProps: IInputProps) => {
    const props = {...defaultProps, ...passedProps};

    const {
        label,
        input,
        meta: {error, touched},
        type,
        preCheck,
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
                {error && touched &&
                <div>
                    <FontAwesome name="exclamation-triangle" color={PINK}/>
                    <ErrorText>
                        {error[0].split(' ').slice(1).join(' ')}
                    </ErrorText>
                </div>}
            </div>
            <Input
                onChange={(e: any) => preCheck(e.target.value) && input.onChange(e.target.value)}
                value={input.value}
                style={error && touched ? {...props.style, borderColor: PINK} : props.style}
                type={type || 'text'}
            />
        </Container>
    )
}