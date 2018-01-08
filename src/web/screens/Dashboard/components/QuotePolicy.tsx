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
import {getPolicyQuoteRequest, getLoadingState, getStartPolicyDate} from '~/common/selectors/policyQuoteRequest';
import {IAddress} from '~/common/interfaces/userDetails';
import {policyQuoteRequestWorker} from '~/common/sagas/policyQuoteRequest';
import {makePolicyQuoteRequest, updateStartDateOnPolicyQuoteRequest} from '~/common/actions/policyQuoteRequest';

interface IQuotePolicyProps {
    className?: string;
    push: ActionCreator<Action>;
    motorId: string;
    policyQuoteRequest: any;
    makePolicyQuoteRequest: any;
    isLoading: boolean;
    updateStartDateOnPolicyQuoteRequest: any;
    startDate: any;
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
        injectSaga(policyQuoteRequestWorker, this.props.motorId);
    }

    renderLoadingOverlay() {
        const { policyQuoteRequest: { vehicle } } = this.props;

        return (
            <QuoteLoadingOverlay>
                <QuoteLoadingWrapper>
                    <Container>
                        <Aside>
                            <QuoteCar height={66} width={50}/>
                        </Aside>
                        <Main>
                            <QuoteLoadingHeader>
                                <Type>Car</Type>
                                <Registration>{vehicle && vehicle.registration}</Registration>
                            </QuoteLoadingHeader>
                            <QuoteLoadingBody><BounceLoader size={80} color={PINK} /></QuoteLoadingBody>
                            <QuoteLoadingFooter>Please wait while we find you the best quotes on the market...</QuoteLoadingFooter>
                        </Main>
                    </Container>
                </QuoteLoadingWrapper>
            </QuoteLoadingOverlay>
        );
    }

    handleDatePickerChange = (value: any) => {
        this.props.updateStartDateOnPolicyQuoteRequest(this.props.motorId, value);
    };

    render() {
        const { policyQuoteRequest: { vehicle, driver, address }, startDate, isLoading } = this.props;

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
                    <QuoteField
                        icon={<QuoteCalendar/>}
                        initialValues={{ date: startDate }}
                        onDatePickerChange={this.handleDatePickerChange}
                        withDatePicker
                        title="Policy start date"
                        motorId={this.props.motorId}
                    />
                    <RoundedButton
                        label="Get My Quote"
                        style={ButtonStyles}
                        disabled={!address || !vehicle || !driver || !startDate}
                        onClick={this.props.makePolicyQuoteRequest}
                    />
                </QuoteContentContainer>
            </div>
        );
    }
}

const Container = styled.div`
    max-width: 600px;
    display: flex;
`;

const Main = styled.div``;

const Aside = styled.div`
    margin-right: 20px;
    
    img {
        margin-top: 15px;
    }
`;

const QuoteLoadingHeader = styled.div`
    margin-bottom: 20px;
`;

const Type = styled.div`
    margin-bottom: 10x;
    font-size: 14px;
    text-transform: uppercase;
    color: #a5aaaf;
    font-weight: 500;
`;

const Registration = styled.div`
    font-size: 30px;
    color: #FFF;
`;

const QuoteLoadingBody = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
`;

const QuoteLoadingFooter = styled.div`
    font-size: 26px;
`;

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

const QuoteLoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    startDate: getStartPolicyDate(state, props),
    policyQuoteRequest: getPolicyQuoteRequest(state, props.motorId),
    isLoading: getLoadingState(state, props.motorId),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
    makePolicyQuoteRequest,
    updateStartDateOnPolicyQuoteRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledQuotePolicy);