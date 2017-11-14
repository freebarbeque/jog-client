import {IUser, IUserCreds} from '../interfaces/user';
import {SIGN_IN, SIGN_UP, LOG_OUT, SET_USER} from '../constants/auth';

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

export function logOut() {
    return {
        type: LOG_OUT,
    }
}

export function setUser(user: IUser|null) {
    return {
        type: SET_USER,
        user,
    }
}