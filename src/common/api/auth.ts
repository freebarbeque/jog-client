import {IUserCreds} from "~/common/interfaces/user";
import {post} from "~/common/api/request";

export function* signIn(creds: IUserCreds) {
    const user = yield post('users/sign_in', creds);
    return user;
}