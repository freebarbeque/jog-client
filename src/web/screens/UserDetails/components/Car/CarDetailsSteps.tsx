import * as React from 'react';
import CarRegistrationNumberForm from './CarRegistrationNumberForm';
import CarDetailsForm from './CarDetailsForm';
import {IVehicleDetails} from '~/common/interfaces/vehicles';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {lookupRegistrationNumber} from 'src/common/actions/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {vehicleStepsFlow} from '~/common/sagas/userDetails/vehicle';

export interface ICarDetailsStepsProps {
    currentStep: number;
    motorId: number;
    lookupRegistrationNumber: ActionCreator<Action>;
}

class CarDetailsSteps extends React.Component<ICarDetailsStepsProps, {}> {

    componentWillMount() {
        injectSaga(vehicleStepsFlow, this.props.motorId);
    }

    handleCarDetailsSubmit = (values: IVehicleDetails) => {
        this.props.lookupRegistrationNumber(values.vrm);
    };

    render() {
        switch (this.props.currentStep) {
            case 1:
                return <CarRegistrationNumberForm onSubmit={this.handleCarDetailsSubmit}/>;

            case 2:
                return <CarDetailsForm/>;

            default:
                return null;
        }
    }
}

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    lookupRegistrationNumber,
}, dispatch);

export default connect(null, mapDispatchToProps)(CarDetailsSteps) as any;