import {IUser} from "~/common/interfaces/user";
import {SIGN_IN, SIGN_UP} from '../constants/auth';

export function signIn(user: IUser) {
    return {
        type: SIGN_IN,
    }
}

export function signUp(user: IUser) {
    return {
        type: SIGN_UP,
    }
}