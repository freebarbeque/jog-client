import {IUser, IUserCreds} from "~/common/interfaces/user";
import {post} from "~/common/api/request";

export function* signIn(creds: IUserCreds) {
    const user = yield post('users/sign_in', creds);
    return user;
}

export function* signUp(user: IUser) {
    const createdUser = yield post('users/sign_in', user);
    return createdUser;
}