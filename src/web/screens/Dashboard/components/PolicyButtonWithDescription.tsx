import * as React from 'react';
import styled, {StyledFunction} from 'styled-components';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR} from 'src/common/constants/palette';
import {BlackArrow} from 'src/web/images';
import {styledComponentWithProps} from 'src/common/utils/types';

interface IPolicyButtonWithDescription {
  className?: string;
  icon?: JSX.Element;
  onClick?: any;
  disabled?: boolean;
  circleBgColor?: string;
  circleImgUrl?: string;
  policyName?: string;
  policyType: string;
  policyStatus?: string;
}

interface ICircleProps {
  backgroundColor?: string;
  src?: string;
}

const PolicyButtonWithDescription: React.StatelessComponent<IPolicyButtonWithDescription> = (props) => (
  <div
    className={props.className}
    onClick={props.onClick}
  >
    <IconContainer>
      <Circle backgroundColor={props.circleBgColor} src={props.circleImgUrl}>
        {props.icon}
      </Circle>
    </IconContainer>
    <DescriptionWrapper>
      <LeftDescription>
        <PolicyName>
          {props.policyName}
        </PolicyName>
        <PolicyType>
          {props.policyType.toUpperCase()}
        </PolicyType>
      </LeftDescription>
      <RightDescription>
        {props.policyStatus}
      </RightDescription>
      <BlackArrow />
    </DescriptionWrapper>
  </div>
);

const IconContainer = styled.div`
  display: flex;
  flex: 0 0 110px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  color: ${FOOTER_BACKGROUND_COLOR};
  padding: 0 20px;
  align-self: stretch;
`;

const LeftDescription = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-basis: 40%;
`;

const PolicyName = styled.div`
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 10px;
`;

const PolicyType = styled.div`
  font-size: 12px;
  line-height: 15px;
`;

const RightDescription = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  flex-basis: 40%;
`;

const div = styledComponentWithProps<ICircleProps, HTMLDivElement>(styled.div);

const Circle = div`
  width: 72px;
  height: 72px;
  background-color: ${props => props.backgroundColor || '#FFF'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${props => `url(${(props.src)})` || 'unset'};
  background-position: 50%;
  background-size: cover;
`;

const StyledPolicyButtonWithDescription = styled(PolicyButtonWithDescription)`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(150,150,150, 0.5);
  background-color: #FFF;
  height: 88px;
  flex-basis: calc(50% - 20px);
  padding: 0;
  cursor: pointer;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  & {
    ${IconContainer} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#ECEDEF'};
    }
    
    ${DescriptionWrapper} {
      background-color: ${props => props.disabled ? '#F0F0F0' : 'unset'};
    }
  }
  
  &:hover {
    ${IconContainer} {
      background-color: #D4D5D7;
    }
    ${DescriptionWrapper} {
      background-color: #E6E6E6; 
    }
  }
  
  &:active {
    ${IconContainer}, ${DescriptionWrapper} {
      background-color: #C8C9CB;
    }
  }
`;

export default StyledPolicyButtonWithDescription;