import * as React from 'react';
import styled, {StyledComponentClass} from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import {PINK} from 'src/common/constants/palette';
import ErrorText from 'src/web/components/Forms/ErrorText';

// tslint:disable-next-line:no-var-requires
const FontAwesome = require('react-fontawesome');

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  margin-bottom: ${MARGIN.large}px;
  position: relative;
`;

// language=SCSS prefix=dummy{ suffix=}
const Label = styled.div`
    font-weight: 500;
    font-size: 11px;
    color: white;
    text-transform: uppercase;
`

interface IHtmlInputProps {
    sign: boolean;
}

// language=SCSS prefix=dummy{ suffix=}
const Input: StyledComponentClass<IHtmlInputProps, any, any> = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 50px;
  background-color: white;
  padding-left: ${(props: IHtmlInputProps) => props.sign ? '60px' : `${MARGIN.large}px`};
  padding-right: ${MARGIN.large}px;
  font-size: 20px;
  border-radius: 0;
  border: 2px solid transparent;
`

const Sign = styled.div`
    position: absolute;
    top: 25px;
    left: 10px;
    font-size: 26px;
    width: 40px;
    border-right: 2px solid #dbdcde;
    color: #dbdcde;
`;

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
    sign: string;
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
        sign,
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
            {sign && <Sign>{sign}</Sign>}
            <Input
                onChange={(e: any) => preCheck(e.target.value) && input.onChange(e.target.value)}
                value={input.value}
                style={error && touched ? {...props.style, borderColor: PINK} : props.style}
                type={type || 'text'}
                sign={sign}
            />
            {
                error && touched &&
                <div>
                    <ErrorText>
                        {error}
                    </ErrorText>
                </div>
            }
        </Container>
    )
}