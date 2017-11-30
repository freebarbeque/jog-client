import {IAction} from '../interfaces/action';
import {IDriversReduxState, IDriver} from '../interfaces/drivers';
import {SET_DRIVERS, SET_LOADING} from '../constants/drivers';

const defaultState = {
  list: [],
  isLoading: false,
};

export default function (state: IDriversReduxState = defaultState, action: IAction) {
  switch (action.type) {

    case (SET_DRIVERS): {
      return {
        ...state,
        list: action.drivers,
      };
    }

    case (SET_LOADING): {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    default: {
      return state;
    }
  }
}