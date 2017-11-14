import {IUser, IUserCreds} from "~/common/interfaces/user";
import {SIGN_IN, SIGN_UP} from '../constants/auth';

export function signIn(creds: IUserCreds) {
    return {
        type: SIGN_IN,
        creds,
    }
}

export function signUp(user: IUser) {
    return {
        type: SIGN_UP,
        user,
    }
}