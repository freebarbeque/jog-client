import * as React from 'react';
import * as spinners from 'react-spinners';
import PostCodeForm from './PostCodeForm';
import {IAddressFormValues} from '~/common/interfaces/userDetails';
import {injectSaga} from '~/common/utils/saga';
import {addressStepsFlow} from '~/common/sagas/userDetails/address';
import {lookupPostCode} from 'src/common/actions/userDetails';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Address from './Address';
import {getIsLoading} from '~/common/selectors/userDetils';

export interface IAddressStepsProps {
    isLoading: boolean;
    currentStep: number;
    motorId: number;
    lookupPostCode: ActionCreator<Action>;
}

const {ScaleLoader}: { ScaleLoader: any } = spinners;

class AddressSteps extends React.Component<IAddressStepsProps, {}> {
    componentWillMount() {
        injectSaga(addressStepsFlow, this.props.motorId);
    }

    handleAddressFormSubmit = (values: IAddressFormValues) => {
        this.props.lookupPostCode(values.postcode);
    };

    render() {
        if (this.props.isLoading) {
            return <ScaleLoader color={'#50e3c2'} loading={true} />;
        }

        switch (this.props.currentStep) {
            case 1:
                return <PostCodeForm onSubmit={this.handleAddressFormSubmit} />;
            case 2:
                return <Address />;
            default:
                return null;
        }
    }
}

const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    lookupPostCode,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddressSteps) as any;