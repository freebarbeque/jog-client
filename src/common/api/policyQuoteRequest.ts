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
                        user_id: user.id,
                    },
                } : null),
                ...(driver ? {
                    driver_attributes: {
                        id: driver.id,
                        user_id: user.id,
                    },
                } : null),
                ...(address ? {
                    address_attributes: {
                        id: address.id,
                        user_id: user.id,
                    },
                } : null),
            },
        }
    };

    const { body } = yield post(`users/${user.id}/motor_policies/${motorPolicyId}/quote_requests`, reqBody);

    return body;
}