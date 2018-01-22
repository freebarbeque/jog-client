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
import { handleScrollToErrorField } from 'src/web/common/utils/form/scrollingToErrorField';

import FormSelect2 from 'src/web/common/controls/FormSelect'

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
        return (
            <form className={this.props.className} onSubmit={this.props.handleSubmit}>
                <FieldsContainer>
                    <Container>
                        <FieldTitle name="manufacturer_name">
                            Vehicle Brand
                        </FieldTitle>
                        <Field
                            name="manufacturer_name"
                            component={StyledInput}
                        />
                    </Container>
                    <Container>
                        <FieldTitle name="motor_vehicle_model_name">
                            Vehicle Model
                        </FieldTitle>
                        <Field
                            name="motor_vehicle_model_name"
                            component={StyledInput}
                        />
                    </Container>
                </FieldsContainer>
                <FieldContainer name="abs">
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
                <FieldContainer name="alarm">
                    <FieldTitle>
                        What type of alarm does the car have?
                    </FieldTitle>
                    <Field
                        name="alarm"
                        errorBelowField
                        component={FormSelect2}
                        design={FormSelect2.Modern}
                        options={mapObjectToDataSource(VehicleAlarm)}
                    />
                </FieldContainer>
                <FieldContainer name="date_of_registration">
                    <FieldTitle>
                        When was the car registered?
                    </FieldTitle>
                    <Field
                        name="date_of_registration"
                        component={FormDatePicker}
                        maxDate={moment()}
                        minDate={moment().subtract(50, 'years')}
                    />
                </FieldContainer>
                <FieldContainer name="drive">
                    <FieldTitle>
                        Is the car left or right hand drive?
                    </FieldTitle>
                    <Field
                        name="drive"
                        errorBelowField
                        component={FormSelect2}
                        design={FormSelect2.Modern}
                        options={mapObjectToDataSource(VehicleDriveHelmSide)}
                    />
                </FieldContainer>
                <FieldContainer name="imported">
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
                <FieldContainer name="number_of_seats">
                    <FieldTitle>
                        How many seats does the car have?
                    </FieldTitle>
                    <Field
                        name="number_of_seats"
                        component={StyledInput}
                        preCheck={onlyNumber}
                    />
                </FieldContainer>
                <FieldContainer name="ownership">
                    <FieldTitle>
                        Who is the owner of the car?
                    </FieldTitle>
                    <Field
                        name="ownership"
                        errorBelowField
                        component={FormSelect2}
                        design={FormSelect2.Modern}
                        options={mapObjectToDataSource(VehicleRegisteredKeeper)}
                    />
                </FieldContainer>
                <FieldContainer name="registered_keeper">
                    <FieldTitle>
                        Who is the registered keeper of the car?
                    </FieldTitle>
                    <Field
                        name="registered_keeper"
                        component={StyledInput}
                    />
                </FieldContainer>
                <FieldContainer name="modified">
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
                <FieldContainer name="purchase">
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
                    <FieldContainer name="date_of_purchase">
                        <FieldTitle>
                            When did you purchase the vehicle?
                        </FieldTitle>
                        <Field
                            name="date_of_purchase"
                            component={FormDatePicker}
                            maxDate={moment()}
                            minDate={moment().subtract(50, 'years')}
                        />
                    </FieldContainer> : null
                }
                <FieldContainer name="value_cents">
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
                <FieldContainer name="tracking_device">
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
                <FieldContainer name="motor_vehicle_storage_location">
                    <FieldTitle>
                        Where is your vehicle kept at night?
                    </FieldTitle>
                    <Field
                        name="motor_vehicle_storage_location"
                        errorBelowField
                        component={FormSelect2}
                        design={FormSelect2.Modern}
                        options={mapObjectToDataSource(VehicleKeptAtNight)}
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
    onSubmitFail: handleScrollToErrorField(),
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