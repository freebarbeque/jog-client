import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import ArrowButton from 'src/web/components/ArrowButton';
import Avatar from 'src/web/components/Avatar';

interface ICurrentPolicyProps {
  className?: string;
  history?: any;
  onBackArrowClick?: () => void;
  insurerAvatar?: string;
  insurerName?: string;
  policyName?: string;
}

const CurrentPolicy: React.StatelessComponent<ICurrentPolicyProps> = (props) => (
  <div className={props.className}>
    <ArrowButton onClick={props.onBackArrowClick} position="left" width={11} height={16}/>
    <Avatar src={props.insurerAvatar} />
    <TextContainer>
      <PolicyName>
        {props.policyName}
      </PolicyName>
      <InsurerName>
        {props.insurerName}
      </InsurerName>
    </TextContainer>
  </div>
);

const StyledCurrentPolicy = styled(CurrentPolicy)`
  display: flex;
  align-items: center;
  align-self: stretch;
  background-color: ${BLUE};
  height: 110px;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 45px;
  
  & ${Avatar} {
    margin: 0 17px 0 3px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #FFF;
  font-weight: 400;
`;

const PolicyName = styled.div`
  font-size: 32px;
`;

const InsurerName = styled.div`
  font-size: 24px;
`;

export default StyledCurrentPolicy;