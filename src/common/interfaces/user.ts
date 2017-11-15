export interface IUserCreds {
    email: string;
    password: string;
}

export interface IUser extends IUserCreds {
    first_name: string;
    last_name: string;
}

export interface ISignUpFormValues extends IUserCreds {
    name: string;
}

export interface IPasswordResetFormValues {
    email: string;
}