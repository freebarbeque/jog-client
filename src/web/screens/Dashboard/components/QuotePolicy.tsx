import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR} from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';
import QuoteField from './QuoteField';
import {QuoteCar, QuoteAddress, QuoteCalendar, QuoteHolder} from 'src/web/images';
import {push} from 'react-router-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface IQuotePolicyProps {
  className?: string;
  push: ActionCreator<Action>;
  motorId: string;
}

const ButtonStyles = {
  width: '620px',
  height: '60px',
  borderRadius: '100px',
  fontSize: '18px',
  marginTop: '40px',
};

const QuotePolicy: React.StatelessComponent<IQuotePolicyProps> = (props: IQuotePolicyProps) => {
  return (
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
            <QuoteField icon={<QuoteCar />} title="Car" />
            <QuoteField icon={<QuoteHolder />} title="Policy holder" onClick={() => props.push(`/app/user/motor/${props.motorId}/holder`)}/>
            <QuoteField icon={<QuoteAddress />} title="Address" />
            <QuoteField icon={<QuoteCalendar />} withDatePicker title="Policy start date" />
            <RoundedButton
                label="Get my quote"
                style={ButtonStyles}
                disabled
                onClick={() => console.log('get quote')}
            />
          </QuoteContentContainer>
        </div>
    );
}

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
  & > ${QuoteField} {
    margin-bottom: 2px;
  }
`;

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(StyledQuotePolicy);