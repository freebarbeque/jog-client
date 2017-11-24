import {IWebReduxState} from '~/web/interfaces/store';
import {createSelector} from 'reselect';

export const getModals = (state: IWebReduxState) => state.page.modals;
export const isModalOpen = (modal: string) => createSelector(
    getModals,
    (modals: string[]) => !!modals.find(m => m === modal),
)