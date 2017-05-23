// @flow

export type DeclareErrorAction = {
  type: 'errors/DECLARE',
  text: string,
}

export type ClearErrorAction = {
  type: 'errors/CLEAR',
}

export type ErrorAction = DeclareErrorAction | ClearErrorAction
