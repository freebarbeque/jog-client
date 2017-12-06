import {post} from '../api/request';
import {IVehicleDetails, IVehicleDetailsFormValues} from 'src/common/interfaces/vehicles';
import {MOTOR_VEHICLE, CREATE_VEHICLE} from 'src/common/constants/userDetails';

export function* getVehicle(type: string, vehicle: Partial<IVehicleDetails>) {
    let vehicleType;
    switch (type) {
        case MOTOR_VEHICLE: {
            vehicleType = 'dvla_vehicles';
            break;
        }
        default: {
            throw new Error('Unknown policy type');
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

export function* createVehicle(userId: string | number, type: string, vehicle: Partial<IVehicleDetailsFormValues>) {
    let vehicleType;
    switch (type) {
        case CREATE_VEHICLE: {
            vehicleType = 'motor_vehicles';
            break;
        }
        default: {
            throw new Error('Unknown policy type');
        }
    }

    const body = {
        data: {
            type: vehicleType,
            attributes: vehicle,
        }
    };
    const data = yield post(`users/${userId}/${vehicleType}`, body);
}