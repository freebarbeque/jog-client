import {IReduxState} from "~/common/interfaces/store";

export const getFormError = (state: IReduxState, props: any) => {
    return state.form[props.form].error;
}