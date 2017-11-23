import * as React from 'react';
import styled from 'styled-components';
import {WhiteSubmitArrow as WhiteArrow}  from 'src/web/images';

interface IArrowButtonProps {
  className?: string;
  onClick?: any;
  type?: string;
  position?: 'left' | 'right';
  width?: number;
  height?: number;
}

const ArrowButton: React.StatelessComponent<IArrowButtonProps> = (props) => (
  <button className={props.className} type="button" onClick={props.onClick}>
    <WhiteArrow width={props.width} height={props.height} />
  </button>
);

const StyledArrowButton = styled(ArrowButton)`
  background-color: transparent;
  border: none;
  outline: none;
  & > .white-arrow-icon {
    transform: rotate(${props => props.position === 'left' ? '180deg' : '0'});
    cursor: pointer;
  } 
`;

export default StyledArrowButton;