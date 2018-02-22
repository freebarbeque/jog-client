import { request } from './request';
import authToken from 'src/web/next/utils/authToken';

export async function getCurrentUser() {
    if (!authToken.get()) {
        return null;
    }

    try {
        const { data: { user } } = await request('users/retrieve_user');
        return user;
    } catch (e) {
        return null;
    }
}

interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export async function join(user: IUser) {
    authToken.clean();

    const { data } = await request('users/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        data: { user },
    });

    return data;
}

interface ICredentials {
    email: string,
    password: string,
}

export async function login(credentials: ICredentials) {
    authToken.clean();

    const { data, headers } = await request('users/sign_in', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        data: { user: credentials }
    });

    if (headers.authorization) {
        const match = headers.authorization.match(/Bearer\s(.+)/i);
        authToken.set(match[1]);
    }

    return data;
}

export async function logout() {
    authToken.clean();

    await request('users/sign_out', {
        method: 'DELETE',
    });
}

export async function restore(email: string) {
    const { data } = await request('users/password', {
        method: 'POST',
        data: { user: { email } },
        headers: {
            'Accept': '*/*',
        }
    });

    return data;
}