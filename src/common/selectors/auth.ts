import {IReduxState} from "~/common/interfaces/store";

export const getUser = (state: IReduxState) => state.auth.user;