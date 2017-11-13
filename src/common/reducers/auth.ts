import {IAuthReduxState} from "~/common/interfaces/auth";
import {Action} from "redux";

const defaultState = {
    user: null,
};

export default function (state: IAuthReduxState = defaultState, action: Action) {
    switch (action.type) {

        default: {
            return state;
        }

    }
}