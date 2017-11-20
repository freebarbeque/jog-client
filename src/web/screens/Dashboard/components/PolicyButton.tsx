import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import {BlackArrow} from 'src/web/images';
import {Link} from 'react-router-dom';

interface IPolicyButton {
  className?: string;
  icon?: JSX.Element;
  title?: string;
  onClick?: any;
  disabled?: boolean;
}

const PolicyButton = (props: IPolicyButton) => (
  <div
    className={props.className}
    onClick={props.onClick}
  >
    <IconContainer>
      {props.icon}
    </IconContainer>
    <TitleContainer>
      <Title>
        {props.title}
      </Title>
      <BlackArrow />
    </TitleContainer>
  </div>
);

const IconContainer = styled.div`
  display: flex;
  flex: 0 0 110px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  color: ${FOOTER_BACKGROUND_COLOR};
  padding: 0 20px;
  align-self: stretch;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledPolicyButton = styled(PolicyButton)`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(51,51,51, 0.5);
  height: 88px;
  flex-basis: calc(50% - 20px);
  padding: 0;
  cursor: pointer;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  & {
    ${IconContainer} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#ECEDEF'};
    }
    
    ${TitleContainer} {
      background-color: ${props => props.disabled ? '#F0F0F0' : 'unset'};
    }
  }
  
  &:hover {
    ${IconContainer} {
      background-color: #D4D5D7;
    }
    ${TitleContainer} {
      background-color: #E6E6E6; 
    }
  }
  
  &:active {
    ${IconContainer}, ${TitleContainer} {
      background-color: #C8C9CB;
    }
  }
`;

export default StyledPolicyButton;