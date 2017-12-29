import * as React from 'react';
import styled from 'styled-components';
import * as spinners from 'react-spinners';
import {injectSaga} from '~/common/utils/saga';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR, PINK, DARK_TRANSPARENT_GRAY, WHITE, VERY_LIGHT_GRAY} from 'src/common/constants/palette';
import RoundedButton from 'src/web/components/RoundedButton';
import QuoteField from './QuoteField';
import {QuoteCar, QuoteAddress, QuoteCalendar, QuoteHolder} from 'src/web/images';
import {push} from 'react-router-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getAddress, getSelectedDriverId, getUserAddress} from '~/common/selectors/userDetils';
import {getPolicyQuote, getLoadingState} from '~/common/selectors/policyQoute';
import {IAddress} from '~/common/interfaces/userDetails';
import {quotePolicyWorker} from '~/common/sagas/quotePolicy';
import {createQuotePolicyRequest} from '~/common/actions/quotePolicy';

interface IQuotePolicyProps {
    className?: string;
    push: ActionCreator<Action>;
    motorId: string;
    policyQuote: any;
    createQuotePolicyRequest: any;
    isLoading: boolean;
}

const ButtonStyles = {
    width: '620px',
    height: '60px',
    borderRadius: '100px',
    fontSize: '18px',
    marginTop: '40px',
};

const {BounceLoader}: { BounceLoader: any } = spinners;

class QuotePolicy extends React.PureComponent<IQuotePolicyProps, {}> {
    componentWillMount() {
        injectSaga(quotePolicyWorker, this.props.motorId);
    }

    renderLoadingOverlay() {
        const { policyQuote: { vehicle } } = this.props;

        return (
            <QuoteLoadingOverlay>
                <QuoteLoadingContainer>
                    <QuoteInfo>
                        <QuoteInfoType>Car:</QuoteInfoType>
                        <QuoteInfoIdentifier>{vehicle && vehicle.registration}</QuoteInfoIdentifier>
                    </QuoteInfo>
                    <QuoteLoadingSpinner><BounceLoader size={80} color={PINK} /></QuoteLoadingSpinner>
                    <QuoteLoadingText>Please wait while we find you the best quotes on the market...</QuoteLoadingText>
                </QuoteLoadingContainer>
            </QuoteLoadingOverlay>
        );
    }

    render() {
        const { policyQuote: { vehicle, driver, address }, isLoading } = this.props;

        return (
            <div className={this.props.className}>
                {isLoading && this.renderLoadingOverlay()}
                <QuoteHint>
                    <HintTitle>Get a Quote</HintTitle>
                    <HintText>Complete the questions below to request a quote</HintText>
                </QuoteHint>
                <QuoteContentContainer>
                    <QuoteField
                        icon={<QuoteCar/>}
                        title="Vehicle details"
                        primaryTitle={vehicle ? vehicle.registration : ''}
                        onClick={() => this.props.push(`/app/user/motor/${this.props.motorId}/car`)}
                        completed={!!vehicle}
                    />
                    <QuoteField
                        icon={<QuoteHolder/>}
                        title="Drivers details"
                        primaryTitle={driver ? `${driver.first_name} ${driver.last_name}` : ''}
                        onClick={() => this.props.push(`/app/user/motor/${this.props.motorId}/holder`)}
                        completed={!!driver}
                    />
                    <QuoteField
                        icon={<QuoteAddress/>}
                        title="Insurance address"
                        primaryTitle={address ? `${address.line1}, ${address.line2}, ${address.city}` : ''}
                        onClick={() => this.props.push(`/app/user/motor/${this.props.motorId}/address`)}
                        completed={address && address.postcode}
                    />
                    <QuoteField icon={<QuoteCalendar/>} withDatePicker title="Policy start date" motorId={this.props.motorId}/>
                    <RoundedButton
                        label="Get My Quote"
                        style={ButtonStyles}
                        disabled={!address || !vehicle || !driver}
                        onClick={this.props.createQuotePolicyRequest}
                    />
                </QuoteContentContainer>
            </div>
        );
    }
}

const StyledQuotePolicy = styled(QuotePolicy)`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1 0 auto;
  align-items: center;
`;

const QuoteLoadingOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: ${DARK_TRANSPARENT_GRAY};
`;

const QuoteInfo = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QuoteInfoType = styled.div`
    margin-right: 10px;
    display: flex;
    color: ${VERY_LIGHT_GRAY};
    font-size: 18px;
`;

const QuoteInfoIdentifier = styled.div`
    display: flex;
    color: ${VERY_LIGHT_GRAY};
    font-size: 22px;
`;

const QuoteLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const QuoteLoadingSpinner = styled.div`
    margin-bottom: 30px;
`;

const QuoteLoadingText = styled.div`
    color: ${VERY_LIGHT_GRAY};
    font-size: 22px;
    font-weight: 400;
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

const mapStateToProps = (state: IReduxState, props: IQuotePolicyProps) => ({
    policyQuote: getPolicyQuote(state, props.motorId),
    isLoading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
    createQuotePolicyRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledQuotePolicy);