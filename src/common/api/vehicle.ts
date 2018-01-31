import {post} from '../api/request';
import {IVehicleDetails, IVehicleDetailsFormValues} from '../interfaces/vehicles';
import {MOTOR_VEHICLE, CREATE_VEHICLE} from '../constants/userDetails';

export function* getExternalVehicleInformation(registrationNumber: string) {
    const body = {
        data: {
            type: 'dvla_vehicles',
            attributes: {
                vrm: registrationNumber,
            },
        }
    };

    const data = yield post('dvla_vehicle', body);
    return data.body.dvla_vehicle;
}

export function* getVehicle(type: string, vehicle: Partial<IVehicleDetails>) {
    let vehicleType;
    switch (type) {
        case MOTOR_VEHICLE: {
            vehicleType = 'dvla_vehicles';
            break;
        }
        default: {
            throw new Error('Unknown vehicle type');
        }
    }

    const body = {
        data: {
            type: vehicleType,
            attributes: vehicle,
        }
    };
    const data = yield post('dvla_vehicle', body);
    return data.body.dvla_vehicle;
}

export function* createVehicle(userId: string | number, vehicle: Partial<IVehicleDetailsFormValues>) {
    const reqBody = {
        data: {
            type: 'motor_vehicles',
            attributes: vehicle,
        }
    };

    const { body } = yield post(`users/${userId}/motor_vehicles`, reqBody);

    return body;
}