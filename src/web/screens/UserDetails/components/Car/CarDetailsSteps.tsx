import * as React from 'react';
import CarRegistrationNumberForm from './CarRegistrationNumberForm';
import CarDetailsForm from './CarDetailsForm';
import {IVehicleDetails} from '~/common/interfaces/vehicles';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {lookupRegistrationNumber} from 'src/common/actions/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {vehicleStepsFlow} from '~/common/sagas/userDetails/vehicle';
import {submitVehicle} from 'src/common/actions/userDetails';

export interface ICarDetailsStepsProps {
    currentStep: number;
    motorId: number;
    lookupRegistrationNumber: ActionCreator<Action>;
    submitVehicle: ActionCreator<Action>;
}

class CarDetailsSteps extends React.Component<ICarDetailsStepsProps, {}> {

    componentWillMount() {
        injectSaga(vehicleStepsFlow, this.props.motorId);
    }

    handleCarRegistrationNumberSubmit = (values: IVehicleDetails) => {
        this.props.lookupRegistrationNumber(values.vrm);
    };

    handleCarDetailsSubmit = () => {
        this.props.submitVehicle();
    };

    render() {
        switch (this.props.currentStep) {
            case 1:
                return <CarRegistrationNumberForm onSubmit={this.handleCarRegistrationNumberSubmit}/>;

            case 2:
                return <CarDetailsForm onSubmit={this.handleCarDetailsSubmit}/>;

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