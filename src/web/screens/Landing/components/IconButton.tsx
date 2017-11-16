import * as React from 'react';

interface IIconButtonProps {
  className?: string;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton = (props: any) => (
  <button className={props.className} onClick={props.onClick}>
    {props.icon}
  </button>
);

export default IconButton;
