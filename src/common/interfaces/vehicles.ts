export interface IVehicle {
    id: string;
};

export interface IVehicleDetailsFormValues {};

export interface IVehicleDetails {
    vrm: string;
};

export interface  IVehicleAPIData {
    date_of_registration: string;
    manufacturer_id: string;
    motor_vehicle_model_id: string;
    number_of_seats: string;
    registration: string;
};

export const VehicleDriveHelmSide = {
    right: 'Right',
    left: 'Left',
};

export const VehicleAlarm = {
    none: 'No security device',
    cat1: 'Thatcham approved cat 1',
    cat2: 'Thatcham approved cat 2',
    other: 'Other',
};

export const VehicleRegisteredKeeper = {
    'company-director': 'Company director',
    employee: 'Employee',
    employer: 'Employer',
    garage: 'Garage',
    other: 'Other',
    'other-family-member': 'Other family member',
    partner: 'Partner',
    'civil-partner': 'Civil partner',
    'partner-common-law': 'Partner / common law',
    you: 'You',
    'son-or-daughter': 'Son or daughter',
    spouse: 'Spouse',
    'lease-company': 'Vehicle leasing company',
};

export const VehicleKeptAtNight = {
    G: 'Garage',
    D: 'Driveway',
    R: 'Road',
};