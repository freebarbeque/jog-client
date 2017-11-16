import * as React from 'react';
import styled from 'styled-components';
import {LANDING_INPUT_BG_COLOR, FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';

interface IInputProps {
  className?: string;
  type?: string;
  value?: string;
  onChange: () => void;
  width?: number;
  bgColor?: string;
  color?: string;
  placeholder?: string;
}

const Input = (props) => (
  <input
    className={props.className}
    type={props.type}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
);

const StyledInput = styled(Input)`
  min-height: 56px;
  width: ${props => props.width}px;
  background-color ${props => props.bgColor || LANDING_INPUT_BG_COLOR};
  font-size: 16px;
  line-height: 18px;
  border: none;
  color:  ${props => props.color || FOOTER_BACKGROUND_COLOR};
  padding: 0 15px;
`;

StyledInput.defaultProps = {
  value: '',
  width: 180,
  type: 'text',
  placeholder: 'Email Address',
};

export default StyledInput;
