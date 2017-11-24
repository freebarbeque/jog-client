import * as React from 'react';
import styled from 'styled-components';
import {PercentShape} from 'src/web/images';
import {BLUE, PINK} from 'src/common/constants/palette';

interface IOffersPlaceholder {
  className?: string;
}

const OffersPlaceholder: React.StatelessComponent<IOffersPlaceholder> = (props) => (
  <div className={props.className}>
    <PercentShape />
    <Title>
      Best market rates for Jog members
    </Title>
    <MotivationText>
      Complete your questions to get started!
    </MotivationText>
  </div>
);

const StyledOffersPlaceholder = styled(OffersPlaceholder)`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  align-items: center;
  align-self: stretch;
  padding: 26px 0 16px;
`;

const Title = styled.div`
  color: ${BLUE};
  margin: 18px 70px 13px;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
`;

const MotivationText = styled.div`
  color: ${PINK};
  font-size: 13px;
  line-height: 15px;
`;

export default StyledOffersPlaceholder;
