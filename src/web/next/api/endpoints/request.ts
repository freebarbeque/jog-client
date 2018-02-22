import axios from 'axios';

import authToken from 'src/web/next/utils/authToken';

interface IReqConfig {
    method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
    headers?: any,
    data?: any,
}

export function request(endpoint: string, reqConfig: IReqConfig = { method: 'GET' }) {
    const token = authToken.get();

    const baseConfig = {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : null),
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
        }
    };

    const mergedConfig = {
        ...baseConfig,
        ...reqConfig,
        headers: {
            ...baseConfig.headers,
            ...reqConfig.headers,
        }
    };

    return axios.request({
        ...mergedConfig,
        url: `${process.env.BASE_API}${endpoint}`,
    });
}
