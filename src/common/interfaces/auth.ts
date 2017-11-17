import {IUser} from './user';

export interface IAuthReduxState {
    user: IUser | null;
    sessionToken: number | null;
    isLoading: boolean;
}