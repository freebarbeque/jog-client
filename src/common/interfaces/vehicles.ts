export interface IVehicle {
    id: string;
};

export interface IVehicleDetailsFormValues {
    registration: string | number;
    abi_code: string | number;
    abs: boolean;
    alarm: string | number;
    date_of_manufacture: string;
    date_of_registration: string;
    drive: string;
    imported: boolean;
    number_of_seats: string | number;
    registered_keeper: string;
    modified: boolean;
    date_of_purchase: string;
    value_cents: number;
    tracking_device: boolean;
    manufacturer_id: string | number;
    motor_vehicle_model_id: string | number;
};