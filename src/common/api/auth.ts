import {IUser, IUserCreds} from '../interfaces/user';
import {post} from '../api/request';

export function* signIn(creds: IUserCreds) {
    // const user = yield post('users/sign_in', creds);
    const user = yield post(`users/sign_in?user[email]=${creds.email}&user[password]=${creds.password}`);
    return user;
}

export function* signUp(user: IUser) {
    const createdUser = yield post(`users/register?user[first_name]=${user.first_name}&user[last_name]=${user.last_name}&user[email]=${user.email}&user[password]=${user.password}`);
    return createdUser;
}