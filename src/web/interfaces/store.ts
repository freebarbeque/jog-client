import {IReduxState} from '~/common/interfaces/store';

export interface IWebReduxState extends IReduxState {
    pages: IPageReduxState;
}

export interface IPageReduxState {
    modals: string[];
}