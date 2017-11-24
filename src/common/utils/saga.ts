import {IStore} from '../interfaces/store';

interface IWindow extends Window {
    store: IStore;
}

declare const window: IWindow;

export async function injectSaga(saga: any, ...args: any[]) {
    window.store.runSaga(saga, ...args);
}