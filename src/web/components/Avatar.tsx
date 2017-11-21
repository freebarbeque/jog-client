import * as React from 'react';
import styled from 'styled-components';

interface IAvatarProps {
  src?: string;
  size?: string;
  className?: string;
}

const Avatar: React.StatelessComponent<IAvatarProps> = (props) => (
  <img className={props.className} src={props.src} alt="insurer-avatar"/>
);

const StyledAvatar = styled(Avatar)`
  width: ${props => props.size || 64}px;
  height: ${props => props.size || 64}px;
  border-radius: 50%;
  background-color: #FFF;
  object-fit: cover;
`;

export default StyledAvatar;