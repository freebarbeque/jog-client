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
import {getAddress, getSelectedDriverId, getUserAddress, getDriversList} from '~/common/selectors/userDetils';
import {getPolicyQuoteRequest, getLoadingState, getStartPolicyDate} from '~/common/selectors/policyQuoteRequest';
import {IAddress} from '~/common/interfaces/userDetails';
import {policyQuoteRequestWorker} from '~/common/sagas/policyQuoteRequest';
import {makePolicyQuoteRequest, updateStartDateOnPolicyQuoteRequest} from '~/common/actions/policyQuoteRequest';
import {find, propEq} from 'ramda';

interface IQuotePolicyProps {
    className?: string;
    push: ActionCreator<Action>;
    motorId: string;
    policyQuoteRequest: any;
    makePolicyQuoteRequest: any;
    isLoading: boolean;
    updateStartDateOnPolicyQuoteRequest: any;
    startDate: any;
    drivers: any;
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

    getDriversNames = (selected, driversList) => {
        let output: string = '';
        let array: any[] = [];
        selected.forEach(item => {
            let selectedItem = find(propEq('id', item.id))(driversList);
            /* tslint:disable-next-line */
            selectedItem && array.push(selectedItem);
        });

        output = array.reduce((acc, cur, index, array) => {
            const suffix = `, `;
            if (cur.first_name && cur.last_name) {
              acc += `${cur.first_name} ${cur.last_name}${index < array.length - 1 ? suffix : ``}`;
            }
            return acc;
        }, '');

        return output;
    };

    render() {
        const { policyQuoteRequest: { vehicle, driver, address }, startDate, isLoading } = this.props;
        const { drivers: driversList } = this.props;
        const driversNames: string = (driver && driver.length > 0 && driversList && driversList.length > 0)
        ? this.getDriversNames(driver, driversList)
        : 'Create or select driver(s)';

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
                        title="Which car would you like to insure?"
                        primaryTitle={vehicle ? vehicle.registration : ''}
                        onClick={() => this.props.push(`/app/motor/${this.props.motorId}/quote/vehicle`)}
                        completed={!!vehicle}
                    />
                    <QuoteField
                        icon={<QuoteHolder/>}
                        title="Drivers details"
                        primaryTitle={driversNames}
                        onClick={() => this.props.push(`/app/user/motor/${this.props.motorId}/holder`)}
                        completed={!!(driver && driver.length > 0)}
                    />
                    <QuoteField
                        icon={<QuoteAddress/>}
                        title="At what Address will the vehicle be stored?"
                        primaryTitle={address ? `${address.line1}, ${address.line2}, ${address.city}` : ''}
                        onClick={() => this.props.push(`/app/motor/${this.props.motorId}/quote/address`)}
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
    drivers: getDriversList(state),
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
