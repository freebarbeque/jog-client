export interface IVehicle {
    id: string;
};

export interface IVehicleDetailsFormValues {
    date_of_registration: string;
    manufacturer_name: string;
    motor_vehicle_model_name: string;
    number_of_seats: string;
    registration: string;
    abs: boolean;
    imported: boolean,
    modified: boolean,
    tracking_device: boolean,
    purchase: boolean,
    alarm: string;
    date_of_purchase: string;
    drive: string;
    motor_vehicle_storage_location: string;
    ownership: string;
    value_cents: string|number;
    registered_keeper: string;
};

export interface IVehicleDetails {
    vrm: string;
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