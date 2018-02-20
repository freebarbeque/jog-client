import * as React from 'react';
import * as moment from 'moment';
import { reduxForm, Field } from 'redux-form';
import { validate } from 'validate.js';

import { handleScrollToErrorField } from 'src/web/common/utils/form/scrollingToErrorField';
import PeopleInsurance, { You } from 'src/web/model/PeopleInsurance';
import { Refresh } from 'src/web/images';
import {
    onlyNumber,
    onlyDecimal,
} from 'src/web/common/utils/form/valueNormalize';
import Section from 'src/web/common/components/Section';
import FormSelect from 'src/web/common/components/controls/FormSelect';
import FormRadioGroup from 'src/web/common/components/controls/FormRadioGroup';
import FormTextField from 'src/web/common/components/controls/FormTextField';
import FormDatePicker from 'src/web/common/components/controls/FormDatePicker';

import {
    FormGroup,
    RefreshButton,
    RefreshButtonContent,
    SubmitButton,
} from './assets/MotorPolicyQuoteVehicleDetails.styled';

class MotorPolicyQuoteVehicleDetails extends React.PureComponent<any, any> {
    render() {
        const {
            formValues,
            quoteVehicle,
            onRefreshButtonClick,
            submitting,
            invalid,
        } = this.props;

        return (
            <Section
                style={{
                    width: '60%',
                    minWidth: '660px',
                    boxSizing: 'border-box',
                }}
            >
                <form onSubmit={this.props.handleSubmit}>
                    <FormGroup style={{ marginBottom: '40px' }}>
                        <Field
                            name="registration"
                            errorAboveField
                            label="Registration number"
                            placeholder="000000"
                            component={FormTextField}
                        />
                        <RefreshButton
                            style={{ flexGrow: 0 }}
                            onClick={() =>
                                onRefreshButtonClick(formValues.registration)
                            }
                        >
                            <RefreshButtonContent
                                loading={quoteVehicle.isFormUpdating}
                            >
                                <Refresh />
                            </RefreshButtonContent>
                        </RefreshButton>
                    </FormGroup>

                    <Field
                        errorAboveField
                        label="Vehicle Brand"
                        name="manufacturer_name"
                        component={FormTextField}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        errorAboveField
                        label="Vehicle Model"
                        name="motor_vehicle_model_name"
                        component={FormTextField}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="abs"
                        label="Does the car have ABS?"
                        component={FormRadioGroup}
                        options={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        errorAboveField
                        name="alarm"
                        label="What type of alarm does the car have?"
                        component={FormSelect}
                        options={[
                            {
                                value: 'none',
                                label: 'No security device',
                            },
                            {
                                value: 'cat1',
                                label: 'Thatcham approved cat 1',
                            },
                            {
                                value: 'cat2',
                                label: 'Thatcham approved cat 2',
                            },
                            {
                                value: 'other',
                                label: 'Other',
                            },
                        ]}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        errorAboveField
                        name="date_of_registration"
                        label="When was the car registered?"
                        component={FormDatePicker}
                        maxDate={moment()}
                        minDate={moment().subtract(50, 'years')}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="drive"
                        label="Is the car left or right hand drive?"
                        component={FormRadioGroup}
                        options={[
                            { id: 'right', name: 'Right' },
                            { id: 'left', name: 'Left' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="imported"
                        label="Is the car an import?"
                        component={FormRadioGroup}
                        options={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="number_of_seats"
                        label="How many seats does the car have?"
                        errorAboveField
                        component={FormTextField}
                        normalize={onlyNumber}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="ownership"
                        label="Who is the owner of the car?"
                        component={FormRadioGroup}
                        options={[You, { id: 'other', name: 'Other' }]}
                        format={value =>
                            value && value !== You.id ? 'other' : value
                        }
                        errorAboveField
                        style={{
                            ...(formValues &&
                            formValues.ownership &&
                            formValues.ownership !== You.id
                                ? { marginBottom: '10px' }
                                : { marginBottom: '40px' }),
                        }}
                    />

                    {formValues &&
                        formValues.ownership &&
                        formValues.ownership !== You.id && (
                            <Field
                                errorAboveField
                                name="ownership"
                                placeholder="Select the owner of the car"
                                component={FormSelect}
                                options={PeopleInsurance.VehicleOwner.map(
                                    o => ({ value: o.id, label: o.name })
                                )}
                                style={{ marginBottom: '40px' }}
                            />
                        )}

                    <Field
                        name="registered_keeper"
                        label="Who is the registered keeper of the car?"
                        component={FormRadioGroup}
                        options={[You, { id: 'other', name: 'Other' }]}
                        format={value =>
                            value && value !== You.id ? 'other' : value
                        }
                        errorAboveField
                        style={{
                            ...(formValues &&
                            formValues.registered_keeper &&
                            formValues.registered_keeper !== You.id
                                ? { marginBottom: '10px' }
                                : { marginBottom: '40px' }),
                        }}
                    />

                    {formValues &&
                        formValues.registered_keeper &&
                        formValues.registered_keeper !== You.id && (
                            <Field
                                errorAboveField
                                name="registered_keeper"
                                placeholder="Select the registered keeper of the car"
                                component={FormSelect}
                                options={PeopleInsurance.VehicleKeeper.map(
                                    o => ({ value: o.id, label: o.name })
                                )}
                                style={{ marginBottom: '40px' }}
                            />
                        )}

                    <Field
                        name="modified"
                        label="Has the car been modified?"
                        component={FormRadioGroup}
                        options={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="purchase"
                        label="Have you already purchased the vehicle?"
                        component={FormRadioGroup}
                        options={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    {formValues &&
                        formValues.purchase && (
                            <Field
                                errorAboveField
                                name="date_of_purchase"
                                label="When did you purchase the vehicle?"
                                component={FormDatePicker}
                                maxDate={moment()}
                                minDate={moment().subtract(50, 'years')}
                                style={{ marginBottom: '40px' }}
                            />
                        )}

                    <Field
                        name="value_cents"
                        label="Vehicle value"
                        errorAboveField
                        leftIcon="\u00A3"
                        component={FormTextField}
                        normalize={onlyDecimal}
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        name="tracking_device"
                        label="Does it have a tracking device?"
                        component={FormRadioGroup}
                        options={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                        errorAboveField
                        style={{ marginBottom: '40px' }}
                    />

                    <Field
                        errorAboveField
                        name="motor_vehicle_storage_location"
                        label="Where is your vehicle kept at night?"
                        component={FormSelect}
                        options={[
                            {
                                value: 'G',
                                label: 'Garage',
                            },
                            {
                                value: 'D',
                                label: 'Driveway',
                            },
                            {
                                value: 'R',
                                label: 'Road',
                            },
                        ]}
                        style={{ marginBottom: '40px' }}
                    />

                    <SubmitButton type="submit">
                        Use this vehicle info
                    </SubmitButton>
                </form>
            </Section>
        );
    }
}

const validationSchema = {
    registration: {
        presence: {
            message: 'Please enter vehicle registration number',
            allowEmpty: false,
        },
    },
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
    },
};

const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, { fullMessages: false });
    return errors;
};

const initialValues = {
    abs: false,
    imported: false,
    modified: false,
    tracking_device: false,
    purchase: false,
    ownership: You.id,
    registered_keeper: You.id,
};

export default reduxForm({
    initialValues,
    validate: validateForm,
    onSubmitFail: handleScrollToErrorField(),
})(MotorPolicyQuoteVehicleDetails);
