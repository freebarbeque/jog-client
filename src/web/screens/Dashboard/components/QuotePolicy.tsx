import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR} from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';

interface IQuotePolicyProps {
  className?: string;
}

const ButtonStyles = {
  width: '620px',
  height: '60px',
  borderRadius: '100px',
  fontSize: '18px',
  marginTop: '40px',
};

const QuotePolicy: React.StatelessComponent<IQuotePolicyProps> = (props) => (
  <div className={props.className}>
    <QuoteHint>
      <HintTitle>
        Get a Quote
      </HintTitle>
      <HintText>
        Complete the questions below to request a quote
      </HintText>
    </QuoteHint>
    <QuoteContentContainer>
      <RoundedButton
        label="Get my quote"
        style={ButtonStyles}
        disabled
        onClick={() => console.log('get quote')}
      />
    </QuoteContentContainer>
  </div>
);

const StyledQuotePolicy = styled(QuotePolicy)`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1 0 auto;
  align-items: center;
`;

const QuoteHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  flex: 0 0 80px;
  background-color: ${FOOTER_BACKGROUND_COLOR};
`;

const HintTitle = styled.div`
  color: #FFF;
  font-size: 24px;
  line-height: 26px;
  margin-bottom: 10px;
  font-weight: 400;
`;

const HintText = styled.div`
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;

const QuoteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  align-self: stretch;
  padding: 20px 150px 150px;
`;

export default StyledQuotePolicy;