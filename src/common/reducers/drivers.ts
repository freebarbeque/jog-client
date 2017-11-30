import {IAction} from '../interfaces/action';
import {IDriversReduxState, IDriver} from '../interfaces/drivers';

const defaultState = {
  list: [],
};

export default function (state: IDriversReduxState = defaultState, action: IAction) {
  switch (action.type) {

    default: {
      return state;
    }
  }
}