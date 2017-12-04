import {post} from '../api/request';
import {IVehicleDetailsFormValues} from 'src/common/interfaces/vehicles';
import {MOTOR_VEHICLE} from 'src/common/constants/userDetails';

export function* createVehicle(userId: string | number, type: string, vehicle: Partial<IVehicleDetailsFormValues>) {
    let vehicleType;
    switch (type) {
        case MOTOR_VEHICLE: {
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
    yield post(`users/${userId}/${vehicleType}`, body);
}