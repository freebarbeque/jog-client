import {IUser, IUserCreds} from '../interfaces/user';

import {
    SIGN_IN,
    SIGN_UP,
    LOG_OUT,
    RESEND_EMAIL,
    SET_USER,
    SET_SESSION_TOKEN,
    SET_IS_LOADING,
    REQUEST_PASSWORD_CHANGE,
} from '../constants/auth';

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

export function setIsLoading(isLoading: boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading,
    }
}

export function resendEmail(email: string) {
    return {
        type: RESEND_EMAIL,
        email,
    }
}

export function requestPasswordChange(email: string) {
    return {
        type: REQUEST_PASSWORD_CHANGE,
        email,
    }
}

export function setSessionToken(token: string | null) {
    return {
        type: SET_SESSION_TOKEN,
        token,
    }
}