import {post} from '../api/request';

export function* makePolicyQuoteRequest({ user, motorPolicyId, quoteType, policyQuoteRequest }: any) {
    const { vehicle, driver, address, startDate } = policyQuoteRequest;

    const reqBody = {
        data: {
            type: quoteType,
            attributes: {
                start_date: startDate,
                ...(vehicle ? {
                    motor_vehicle_attributes: {
                        id: vehicle.id,
                    },
                } : null),
                ...(driver ? {
                    drivers_attributes: driver,
                } : null),
                ...(address ? {
                    address_attributes: {
                        id: address.id,
                    },
                } : null),
            },
        }
    };

    const { body } = yield post(`users/${user.id}/motor_policies/${motorPolicyId}/quote_requests`, reqBody);

    return body;
}
