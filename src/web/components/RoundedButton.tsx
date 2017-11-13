import * as React from 'react';
import styled from 'styled-components';
import { PINK } from 'src/common/constants/palette';

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  background-color: ${PINK};
  width: 120px;
  height: 40px;
  display: flex;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white !important;
  border: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.7;
  }
`

interface IProps {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  labelColor?: string;
  type: string;
}

const RoundedButton = (props: IProps) => {
    const {
        loading,
        disabled,
        labelColor,
        ...buttonProps,
    } = props;

    return (
        <Button disabled={loading || disabled} {...buttonProps}>
            <div style={{ color: labelColor || 'white' }}>
                {props.label}
            </div>
        </Button>
    )
}

export default RoundedButton
