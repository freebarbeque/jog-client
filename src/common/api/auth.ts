import {IUser, IUserCreds} from '../interfaces/user';
import {post} from '../api/request';

const headers = new Headers({
    'Content-type': 'application/vnd.api+json',
});

export function* signIn(creds: IUserCreds) {
    // const user = yield post('users/sign_in', creds);
    const response = yield post(`users/sign_in?user[email]=${creds.email}&user[password]=${creds.password}`, {}, headers);
    return response;
}

export function* signUp(userToCreate: IUser) {
    const {body} = yield post(
        `users/register?user[first_name]=${userToCreate.first_name}&user[last_name]=${userToCreate.last_name}&user[email]=${userToCreate.email}&user[password]=${userToCreate.password}`,
        {},
        headers,
    );
    return body;
}

export function* resendEmail(email: string) {
    yield post(`users/confirmation`, {user: {email}}, headers, false);
}

export function* requestPasswordChange(email: string) {
    yield post(`users/password`, {user: {email}}, headers, false);
}
