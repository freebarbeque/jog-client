// @flow

export type SetAddressAnswerAction = {
  type: 'markets/address/SET_ADDRESS_ANSWER',
  key: string,
  value: string,
}

export type MarketsAction = SetAddressAnswerAction

export type MarketsReduxState = {
  addressAnswers: { [string]: string },
}

const DEFAULT_STATE: MarketsReduxState = {
  addressAnswers: {},
}

export function setAddressAnswer(
  key: string,
  value: string,
): SetAddressAnswerAction {
  return {
    type: 'markets/address/SET_ADDRESS_ANSWER',
    key,
    value,
  }
}

export default function reducer(
  state: MarketsReduxState = DEFAULT_STATE,
  action: MarketsAction,
): MarketsReduxState {
  if (action.type === 'markets/address/SET_ADDRESS_ANSWER') {
    const addressAnswers = { ...state.addressAnswers }
    addressAnswers[action.key] = action.value
    return {
      ...state,
      addressAnswers,
    }
  }

  return state
}
