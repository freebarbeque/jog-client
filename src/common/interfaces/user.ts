export interface IUserCreds {
    email: string;
    password: string;
}

export interface IUser extends IUserCreds {
    first_name: string;
    last_name: string;
}