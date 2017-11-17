import {IStore} from "~/common/interfaces/store";

interface IWindow extends Window {
    store: IStore;
}

declare const window: IWindow;

export async function injectSaga(saga: any) {
    window.store.runSaga(saga);
}