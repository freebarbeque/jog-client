import * as React from 'react';
import styled from 'styled-components';
import {SOCIAL_BUTTON_BG_COLOR, CREAM} from 'src/common/constants/palette';

interface ISocialSignInButton {
  onClick?: () => void;
  title: string;
  className?: string;
  style?: any;
}

const SocialSignInButton = (props: ISocialSignInButton) => (
  <button className={props.className} onClick={props.onClick} style={props.style}>
    {props.title.toUpperCase()}
  </button>
);

const StyledSocialSignInButton = styled(SocialSignInButton)`
  width: 300px;
  height: 56px;
  border-radius: 100px;
  background-color: ${SOCIAL_BUTTON_BG_COLOR};
  color: ${CREAM};
  padding: 0;
  outline: 0;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: #325192;
  };
`;

export default StyledSocialSignInButton;