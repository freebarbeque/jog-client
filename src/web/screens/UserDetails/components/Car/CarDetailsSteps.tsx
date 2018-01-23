import * as React from 'react';
import styled from 'styled-components';
import {WHITE, TITLE_COLOR, SHADOW_COLOR} from '~/common/constants/palette';
import CarRegistrationNumberForm from './CarRegistrationNumberForm';
import CarDetailsForm from './CarDetailsForm';
import {IVehicleDetails} from '~/common/interfaces/vehicles';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {lookupRegistrationNumber} from 'src/common/actions/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {vehicleStepsFlow} from '~/common/sagas/userDetails/vehicle';
import {submitVehicle} from 'src/common/actions/userDetails';
import { withDeferredSubmit } from 'src/web/common/utils/form/withDeferredSubmit';

export interface ICarDetailsStepsProps {
    currentStep: number;
    motorId: number;
    lookupRegistrationNumber: ActionCreator<Action>;
    submitVehicle: ActionCreator<Action>;
}

const ContentContainer = styled.div`
    color: ${TITLE_COLOR};
    box-shadow: 0 2px 4px ${SHADOW_COLOR};
    background-color: ${WHITE};
    width: 980px;
    margin: 10px auto;
    text-align: center;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-self: stretch;
`;

const Content = styled.div`
    padding: 40px 10px 50px;
    margin: 0 auto;
    width: 70%;
`;

class CarDetailsSteps extends React.Component<ICarDetailsStepsProps, {}> {

    componentWillMount() {
        injectSaga(vehicleStepsFlow, this.props.motorId);
    }

    handleCarRegistrationNumberSubmit = (values: IVehicleDetails) => {
        this.props.lookupRegistrationNumber(values.vrm);
    };

    handleCarDetailsSubmit = (values) => {
        return withDeferredSubmit(this.props.submitVehicle, values);
    };

    render() {
        switch (this.props.currentStep) {
            case 1:
                return (
                    <ContentContainer>
                        <Content>
                            <CarRegistrationNumberForm onSubmit={this.handleCarRegistrationNumberSubmit}/>
                        </Content>
                    </ContentContainer>
                );
            case 2:
                return (
                    <ContentContainer>
                        <Content>
                            <CarDetailsForm onSubmit={this.handleCarDetailsSubmit}/>
                        </Content>
                    </ContentContainer>
                );
            default:
                return null;
        }
    }
}

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    lookupRegistrationNumber,
    submitVehicle,
}, dispatch);

export default connect(null, mapDispatchToProps)(CarDetailsSteps) as any;