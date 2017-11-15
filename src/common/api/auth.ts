import {IUser, IUserCreds} from '../interfaces/user';
import {post} from '../api/request';

export function* signIn(creds: IUserCreds) {
    // const user = yield post('users/sign_in', creds);
    const {user} = yield post(`users/sign_in?user[email]=${creds.email}&user[password]=${creds.password}`);
    return user;
}

export function* signUp(userToCreate: IUser) {
    const {user} = yield post(`users/register?user[first_name]=${userToCreate.first_name}&user[last_name]=${userToCreate.last_name}&user[email]=${userToCreate.email}&user[password]=${userToCreate.password}`);
    return user;
}

export function* resendEmail(email: string) {
    yield post(`users/confirmation?user[email]=${email}`, false);
}

export function* requestPasswordChange(email: string) {
    yield post(`users/password?user[email]=${email}`, false);
}
