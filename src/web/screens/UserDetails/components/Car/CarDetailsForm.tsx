import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';
import {connect, ComponentClass} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading, getVehicleDataForm} from '~/common/selectors/userDetils';
import styled from 'styled-components';
import RoundedButton from 'src/web/components/RoundedButton';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import FieldTitle from '../FieldTitle';
import {reduxForm, Field, getFormValues} from 'redux-form';
const validate = require('validate.js');
import DatePicker from 'src/web/components/PolicyDatePicker';
import StyledInput from '../StyledInput';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import {formSelectIconStyle, formSelectLabelStyle, formSelectStyle, signStyle, VEHICLE_DETAILS_FORM} from 'src/common/constants/userDetails';
import {onlyNumber} from 'src/common/utils/form';
import {cancelSubmitVehicle} from 'src/common/actions/userDetails';
import {IVehicleDetailsFormValues, VehicleDriveHelmSide, VehicleAlarm, VehicleRegisteredKeeper, VehicleKeptAtNight} from '~/common/interfaces/vehicles';
import FormSelect from '~/web/components/Forms/FormSelect';
import {mapObjectToDataSource} from 'src/common/utils/dataSources';
import {PINK} from '~/common/constants/palette';
import {injectSaga} from '~/common/utils/saga';

import FormDatePicker from 'src/web/common/controls/FormDatePicker';

const moment = require('moment');

interface ICarDetailsProps {
    className: string;
    vehicleData: IVehicleDetailsFormValues|null;
    cancelSubmitVehicle: ActionCreator<Action>;
    isLoading: boolean;
    initialValues: any;
    formValues: any;
    error?: string;
    handleSubmit: any;
}

const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
        maxDate={moment()}
        minDate={moment().subtract(100, 'years')}
    />
);

class CarDetailsForm extends React.PureComponent<ICarDetailsProps, {}> {
    render() {
        console.log('Log => CarDetailsForm::props: ', this.props);

        return (
            <form className={this.props.className} onSubmit={this.props.handleSubmit}>
                <FieldsContainer>
                    <Container>
                        <FieldTitle>
                            Vehicle Brand
                        </FieldTitle>
                        <Field
                            name="manufacturer_name"
                            component={StyledInput}
                        />
                    </Container>
                    <Container>
                        <FieldTitle>
                            Vehicle Model
                        </FieldTitle>
                        <Field
                            name="motor_vehicle_model_name"
                            component={StyledInput}
                        />
                    </Container>
                </FieldsContainer>
                <FieldContainer>
                    <FieldTitle>
                        What is the car's ABI code?
                    </FieldTitle>
                    <Field
                        name="abi_code"
                        component={StyledInput}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Does the car have ABS ?
                    </FieldTitle>
                    <Field
                        name="abs"
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        What type of alarm does the car have?
                    </FieldTitle>
                    <Field
                        name="alarm"
                        component={FormSelect}
                        dataSource={mapObjectToDataSource(VehicleAlarm)}
                        maxHeight={300}
                        labelStyle={formSelectLabelStyle}
                        iconStyle={formSelectIconStyle}
                        style={formSelectStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        When was the car manufactured?
                    </FieldTitle>
                    <Field
                        name="date_of_manufacture"
                        component={FormDatePicker}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        When was the car registered?
                    </FieldTitle>
                    <Field
                        name="date_of_registration"
                        component={FormDatePicker}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Is the car left or right hand drive?
                    </FieldTitle>
                    <Field
                        name="drive"
                        component={FormSelect}
                        dataSource={mapObjectToDataSource(VehicleDriveHelmSide)}
                        maxHeight={300}
                        labelStyle={formSelectLabelStyle}
                        iconStyle={formSelectIconStyle}
                        style={formSelectStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Is the car an import?
                    </FieldTitle>
                    <Field
                        name="imported"
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How many seats does the car have?
                    </FieldTitle>
                    <Field
                        name="number_of_seats"
                        component={StyledInput}
                        preCheck={onlyNumber}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Who is the owner of the car?
                    </FieldTitle>
                    <Field
                        name="ownership"
                        component={FormSelect}
                        dataSource={mapObjectToDataSource(VehicleRegisteredKeeper)}
                        maxHeight={300}
                        labelStyle={formSelectLabelStyle}
                        iconStyle={formSelectIconStyle}
                        style={formSelectStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Who is the registered keeper of the car?
                    </FieldTitle>
                    <Field
                        name="registered_keeper"
                        component={StyledInput}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Has the car been modified ?
                    </FieldTitle>
                    <Field
                        name="modified"
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Have you already purchased the vehicle?
                    </FieldTitle>
                    <Field
                        name="purchase"
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                {this.props.formValues && this.props.formValues.purchase ?
                    <FieldContainer>
                        <FieldTitle>
                            When did you purchase the vehicle?
                        </FieldTitle>
                        <Field
                            name="date_of_purchase"
                            component={renderDatePicker}
                            placeholder="Select date of purchase"
                        />
                    </FieldContainer> : null
                }
                <FieldContainer>
                    <FieldTitle>
                        Vehicle cost
                    </FieldTitle>
                    <Field
                        name="value_cents"
                        component={StyledInput}
                        style={{padding: '0 10px 0 45px'}}
                        preCheck={onlyNumber}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Does it have a tracking device ?
                    </FieldTitle>
                    <Field
                        name="tracking_device"
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Where is your vehicle kept at night?
                    </FieldTitle>
                    <Field
                        name="motor_vehicle_storage_location"
                        component={FormSelect}
                        dataSource={mapObjectToDataSource(VehicleKeptAtNight)}
                        maxHeight={300}
                        labelStyle={formSelectLabelStyle}
                        iconStyle={formSelectIconStyle}
                        style={formSelectStyle}
                    />
                </FieldContainer>
                {this.props.error && <Error>{this.props.error}</Error>}
                <ButtonsContainer>
                    <RoundedButton
                        label="Back"
                        disabled={this.props.isLoading}
                        style={{
                            marginRight: 20,
                            width: 200,
                        }}
                        onClick={() => this.props.cancelSubmitVehicle()}
                    />
                    <RoundedButton
                        label="Submit Vehicle Details"
                        disabled={this.props.isLoading}
                        style={{
                            width: 200,
                        }}
                        type="submit"
                    />
                </ButtonsContainer>
            </form>
        )
    }
};

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
  & > ${DatePicker} {
    align-self: center;
  }
`;

const FieldsContainer = styled.div`
  display: flex;
  align-self: stretch;
  margin-bottom: 30px;
  justify-content: space-between;
  & > div:first-child {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
`;

const Error = styled.div`
  width: 100%;
  text-align: right;
  margin-top: -10px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  color: ${PINK};
`;

const validationSchema = {
    manufacturer_name: {
        presence: {
            message: 'Please enter vehicle brand',
            allowEmpty: false,
        },
    },
    motor_vehicle_model_name: {
        presence: {
            message: 'Please enter vehicle model',
            allowEmpty: false,
        },
    },
    abi_code: {
        presence: {
            message: 'Please enter your ABI code',
            allowEmpty: false,
        },
    },
    date_of_manufacture: {
        presence: {
            message: `Please enter your car's date of manufacture`,
            allowEmpty: false,
        },
    },
    date_of_registration: {
        presence: {
            message: `Please enter your car's date of register`,
            allowEmpty: false,
        },
    }
};

const initialValues = {
    number_of_seats: '',
    abs: false,
    imported: false,
    modified: false,
    tracking_device: false,
    purchase: false,
    abi_code: '',
    alarm: '',
    drive: '',
    motor_vehicle_storage_location: '',
    value_cents: '',
    ownership: '',
    registered_keeper: '',
};

const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, {fullMessages: false});

    return errors;
};

const form = reduxForm({
    form: VEHICLE_DETAILS_FORM,
    validate: validateForm,
})(styledForm(CarDetailsForm));

const mapStateToProps = (state: IReduxState): Partial<ICarDetailsProps> => ({
    initialValues: { ...initialValues, ...getVehicleDataForm(state)},
    isLoading: getIsLoading(state),
    formValues: getFormValues(VEHICLE_DETAILS_FORM)(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    cancelSubmitVehicle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(form) as any;