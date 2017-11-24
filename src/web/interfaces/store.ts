import {IReduxState} from '~/common/interfaces/store';

export interface IWebReduxState extends IReduxState {
    page: IPageReduxState;
}

export interface IPageReduxState {
    modals: string[];
}