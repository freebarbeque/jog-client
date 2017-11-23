import * as React from 'react';
import styled from 'styled-components';
import {BLUE, DASHBOARD_INACTIVE_LINK_COLOR, LIGHT_GREEN} from 'src/common/constants/palette';
import {BlackArrow, WhiteTick, MoreCircles} from 'src/web/images';

interface IQuoteFieldProps {
  className?: string;
  width?: number;
  icon?: any;
  disabled?: boolean;
  title?: string;
  completed?: boolean;
  onClick?: any;
  withDatePicker?: boolean;
}

const QuoteField: React.StatelessComponent<IQuoteFieldProps> = (props) => (
  <div className={props.className} onClick={props.onClick}>
    <IconBox>
      {props.icon}
    </IconBox>
    <ContentBox>
      <Title>
        {props.title}
      </Title>
      {props.withDatePicker ? (
        <div>
          Date Picker
        </div>
      ) : (
        <StatusContainer>
          <StatusText>
            {props.completed ? 'Review complete' : 'Click to review'}
          </StatusText>
          <StatusIcon>
            {props.completed ? (<WhiteTick />) : (<MoreCircles />)}
          </StatusIcon>
          <BlackArrow />
        </StatusContainer>
      )}
    </ContentBox>
  </div>
);

const IconBox = styled.div`
  display: flex;
  flex: 0 0 110px;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 37px;
`;

const Title = styled.div`
  color: ${BLUE};
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  flex: 0 0 45%;
`;

const StatusContainer = styled.div`
  display: flex;
  flex: 0 0 55%;
  align-items: center;
  justify-content: space-between;
`;

const StatusText = styled.div`
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  flex: 0 0 45%;
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(51,51,51, 0.2);
`;

const StyledQuoteField = styled(QuoteField)`
  display: flex;
  height: 90px;
  width: ${props => props.width || '721'}px;
  box-shadow: 0 2px 4px rgba(51,51,51, 0.2);
  cursor: pointer;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  & {
    ${IconBox} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#ECEDEF'};
    }
    
    ${ContentBox} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#FFF'};
    }
    
    ${StatusIcon} {
      background-color: ${props => props.completed ? LIGHT_GREEN : DASHBOARD_INACTIVE_LINK_COLOR};
    }
  }
  
  &:hover {
    ${IconBox} {
      background-color: #D4D5D7;
    }
    ${ContentBox} {
      background-color: #E6E6E6; 
    }
  }
  
  &:active {
    ${IconBox}, ${ContentBox} {
      background-color: #C8C9CB;
    }
  }
`;

export default StyledQuoteField;