import {IUser} from '~/common/interfaces/user';

export interface IAuthReduxState {
    user: IUser | null
}