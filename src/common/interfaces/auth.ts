import {IUser} from './user';

export interface IAuthReduxState {
    user: IUser | null;
    isLoading: boolean;
}