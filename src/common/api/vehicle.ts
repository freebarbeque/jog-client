import {post} from '../api/request';
import {IVehicleDetails} from 'src/common/interfaces/vehicles';
import {MOTOR_VEHICLE} from 'src/common/constants/userDetails';

export function* createVehicle(type: string, vehicle: Partial<IVehicleDetails>) {
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
    yield post('dvla_vehicle', body);
}