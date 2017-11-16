import * as React from 'react';
import styled from 'styled-components';
import {LANDING_INPUT_BG_COLOR, FOOTER_BACKGROUND_COLOR, PINK} from 'src/common/constants/palette';

interface IInputProps {
  className?: string;
  type?: string;
  input: {
    value: string;
    onChange: () => void;
  };
  width?: number;
  bgColor?: string;
  color?: string;
  placeholder?: string;
  meta: {
    error?: string;
    touched?: boolean;
  };
}

const Input = (props) => (
  <div className={props.className}>
    <InputField
      type={props.type}
      value={props.input.value}
      onChange={props.input.onChange}
      placeholder={props.placeholder}
    />
    {props.meta.error && props.meta.touched && <Error>{props.meta.error}</Error>}
  </div>
);

const StyledInput = styled(Input)`
  position: relative;
  height: 56px;
  display: flex;
  min-width: ${props => props.width}px;
  background-color ${props => props.bgColor || LANDING_INPUT_BG_COLOR};
  border: 2px solid ${props => props.meta.error && props.meta.touched ? PINK : 'transparent'};
  color:  ${props => props.color || FOOTER_BACKGROUND_COLOR};
  flex: 1;
  box-sizing: border-box;
`;

const InputField = styled.input`
  align-self: stretch;
  flex: 1;
  font-size: 16px;
  line-height: 18px;
  padding: 0 15px;
  border: none;
  background-color: transparent;
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 2px);
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  color: ${PINK};
`;

StyledInput.defaultProps = {
  input: {
    value: '',
    onChange: () => {console.log('change')},
  },
  width: 180,
  type: 'text',
  placeholder: 'Email Address',
  meta: {
    error: '',
  },
};

export default StyledInput;
