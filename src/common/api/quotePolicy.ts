import {post} from '../api/request';

export function* createQuotePolicyRequest({ user, motorPolicyId, quoteType, vehicle, address, driver }: any) {
    const { id: vehicleId, ...vehicleParams } = vehicle;
    const { id: driverId, ...driverParams } = driver;
    const { id: addressId, ...addressParams } = address;

    const reqBody = {
        data: {
            type: quoteType,
            attributes: {
                motor_vehicle_attributes: {
                    ...vehicleParams,
                    user_id: user.id,
                },
                driver_attributes: {
                    ...driverParams,
                    user_id: user.id,
                },
                address_attributes: {
                    ...addressParams,
                    user_id: user.id,
                },
            },
        }
    };

    const { body } = yield post(`users/${user.id}/motor_policies/${motorPolicyId}/quote_requests`, reqBody);

    return body;
}