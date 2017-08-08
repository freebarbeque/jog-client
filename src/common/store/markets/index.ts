//
// Action Types
//

import { eventChannel } from 'redux-saga'
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects'

import { goBack } from 'react-router-redux'
import { Address, Car, IQuoteRequest, Person } from '../../../business/types'
import { demandCurrentUser } from '../../data/auth'
import {
  setAddress,
  setCar,
  setPerson,
  syncAddresses,
  syncCars,
  syncPeople,
} from '../../data/quotes'
import { finishLoading, startLoading } from '../loading/actions'
import {
  addQuoteRequestTask,
  IAddQuoteRequest,
  QuoteRequestAction,
} from './quoteRequests'

// region Action types
export interface ISetAddressAnswerAction {
  type: 'markets/addresses/SET_ADDRESS_ANSWER'
  key: string
  value: string
}

export interface ISetMotorAnswerAction {
  type: 'markets/cars/SET_MOTOR_ANSWER'
  key: string
  value: any
}

export interface ISetMotorAnswersAction {
  type: 'markets/cars/SET_MOTOR_ANSWERS'
  answers: { [id: string]: any }
}

export interface ISetDriverAnswerAction {
  type: 'markets/drivers/SET_DRIVER_ANSWER'
  key: string
  value: any
}

export interface IAddDriverAction {
  type: 'markets/drivers/ADD_DRIVER'
  driver: Person
}

export interface ISetCarAnswer {
  type: 'markets/cars/SET_CAR_ANSWER'
  key: string
  value: any
}

export interface IAddCarAction {
  type: 'markets/cars/ADD_CAR'
  car: Car
}

export interface ISyncCarsAction {
  type: 'markets/cars/SYNC_CARS'
  uid: string
}

export interface IUnsyncCarsAction {
  type: 'markets/cars/UNSYNC_CARS'
}

export interface IReceiveCarsAction {
  type: 'markets/cars/RECEIVE_CARS'
  cars: { [id: string]: Car }
}

export interface ISyncDriversAction {
  type: 'markets/drivers/SYNC_DRIVERS'
  uid: string
}

export interface IUnsyncDriversAction {
  type: 'markets/drivers/UNSYNC_DRIVERS'
}

export interface IReceiveDriversAction {
  type: 'markets/drivers/RECEIVE_DRIVERS'
  drivers: { [id: string]: Person }
}

export interface IAddAddressAction {
  type: 'markets/addresses/ADD_ADDRESS'
  address: Address
}

export interface ISyncAddressesAction {
  type: 'markets/addresses/SYNC_ADDRESSES'
  uid: string
}

export interface IUnsyncAddressesAction {
  type: 'markets/addresses/UNSYNC_ADDRESSES'
}

export interface IReceiveAddressesAction {
  type: 'markets/addresses/RECEIVE_ADDRESSES'
  addresses: { [id: string]: Address }
}

export type MarketsAction =
  | ISetAddressAnswerAction
  | ISetMotorAnswersAction
  | IAddAddressAction
  | IReceiveAddressesAction
  | IUnsyncAddressesAction
  | ISyncAddressesAction
  | ISetMotorAnswerAction
  | IAddDriverAction
  | ISetDriverAnswerAction
  | ISyncDriversAction
  | IUnsyncDriversAction
  | IReceiveDriversAction
  | IAddCarAction
  | ISyncCarsAction
  | IUnsyncCarsAction
  | IReceiveCarsAction
  | ISetCarAnswer
  | QuoteRequestAction

// endregion

// region Action creators
export function setAddressAnswer(
  key: string,
  value: string,
): ISetAddressAnswerAction {
  return {
    type: 'markets/addresses/SET_ADDRESS_ANSWER',
    key,
    value,
  }
}

// region Action creators
export function setMotorAnswer(key: string, value: any): ISetMotorAnswerAction {
  return {
    type: 'markets/cars/SET_MOTOR_ANSWER',
    key,
    value,
  }
}

export function setMotorAnswers(answers: {
  [id: string]: any
}): ISetMotorAnswersAction {
  return {
    type: 'markets/cars/SET_MOTOR_ANSWERS',
    answers,
  }
}

export function setCarAnswer(key: string, value: any): ISetCarAnswer {
  return {
    type: 'markets/cars/SET_CAR_ANSWER',
    key,
    value,
  }
}

export function setDriverAnswer(
  key: string,
  value: any,
): ISetDriverAnswerAction {
  return {
    type: 'markets/drivers/SET_DRIVER_ANSWER',
    key,
    value,
  }
}

export function addAddress(address: Address): IAddAddressAction {
  return {
    type: 'markets/addresses/ADD_ADDRESS',
    address,
  }
}

export function syncAddressesAction(uid: string): ISyncAddressesAction {
  return {
    type: 'markets/addresses/SYNC_ADDRESSES',
    uid,
  }
}

export function unsyncAddressesAction(): IUnsyncAddressesAction {
  return {
    type: 'markets/addresses/UNSYNC_ADDRESSES',
  }
}

export function receiveAddresses(addresses: {
  [id: string]: Address
}): IReceiveAddressesAction {
  return {
    type: 'markets/addresses/RECEIVE_ADDRESSES',
    addresses,
  }
}

export function addDriver(driver: Person): IAddDriverAction {
  return {
    type: 'markets/drivers/ADD_DRIVER',
    driver,
  }
}

export function addCar(car: Car): IAddCarAction {
  return {
    type: 'markets/cars/ADD_CAR',
    car,
  }
}

export function syncCarsAction(uid: string): ISyncCarsAction {
  return {
    type: 'markets/cars/SYNC_CARS',
    uid,
  }
}

export function unsyncCarsAction(): IUnsyncCarsAction {
  return {
    type: 'markets/cars/UNSYNC_CARS',
  }
}

export function receiveCars(cars: { [id: string]: Car }): IReceiveCarsAction {
  return {
    type: 'markets/cars/RECEIVE_CARS',
    cars,
  }
}

export function syncDriversAction(uid: string): ISyncDriversAction {
  return {
    type: 'markets/drivers/SYNC_DRIVERS',
    uid,
  }
}

export function unsyncDriversAction(): IUnsyncDriversAction {
  return {
    type: 'markets/drivers/UNSYNC_DRIVERS',
  }
}

export function receiveDrivers(drivers: {
  [id: string]: Person
}): IReceiveDriversAction {
  return {
    type: 'markets/drivers/RECEIVE_DRIVERS',
    drivers,
  }
}

// endregion

// region Sagas
export function* addAddressTask(action: IAddAddressAction) {
  const address = action.address
  yield put(startLoading('Adding new address'))
  const user = demandCurrentUser()
  yield call(() => setAddress(user.uid, address))
  yield put(finishLoading())
}

export function* addDriverTask(action: IAddDriverAction) {
  const driver = action.driver
  yield put(startLoading('Adding new driver'))
  const user = demandCurrentUser()
  yield call(() => setPerson(user.uid, driver))
  yield put(finishLoading())
  yield put(goBack())
}

export function* addCarTask(action: IAddCarAction) {
  const car = action.car
  yield put(startLoading('Adding vehicle'))
  const user = demandCurrentUser()
  yield call(() => setCar(user.uid, car))
  yield put(finishLoading())
  yield put(goBack())
}

export function* addMarketEntitySaga() {
  yield takeLatest('markets/addresses/ADD_ADDRESS', addAddressTask)
  yield takeLatest('markets/drivers/ADD_DRIVER', addDriverTask)
  yield takeLatest('markets/cars/ADD_CAR', addCarTask)
  yield takeLatest(
    'markets/quoteRequests/ADD_QUOTE_REQUEST',
    addQuoteRequestTask,
  )
}

function addressEventChannel(uid: string) {
  return eventChannel(emitter =>
    syncAddresses(uid, addresses => {
      emitter(addresses)
    }),
  )
}

function driverEventChannel(uid: string) {
  return eventChannel(emitter =>
    syncPeople(uid, addresses => {
      emitter(addresses)
    }),
  )
}

function carsEventChannel(uid: string) {
  return eventChannel(emitter =>
    syncCars(uid, cars => {
      emitter(cars)
    }),
  )
}

function* syncDriversTask({ uid }) {
  const channel = yield call(driverEventChannel, uid)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const drivers = yield take(channel)
      console.log('syncDriversTask received new policies', drivers)
      yield put(receiveDrivers(drivers))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* syncAddressesTask({ uid }) {
  const channel = yield call(addressEventChannel, uid)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const addresses = yield take(channel)
      console.log('syncMotorPoliciesTask received new policies', addresses)
      yield put(receiveAddresses(addresses))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* syncCarsTask({ uid }) {
  const channel = yield call(carsEventChannel, uid)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const cars = yield take(channel)
      console.log('syncCarsTask received new cars', cars)
      yield put(receiveCars(cars))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncAddressesSaga() {
  let action: ISyncAddressesAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('markets/addresses/SYNC_ADDRESSES'))) {
    // Start the sync in the background
    const bgTask = yield fork(syncAddressesTask, action)

    // Wait for the sync to cancel
    yield take('markets/addresses/UNSYNC_ADDRESSES')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}

export function* syncDriversSaga() {
  let action: ISyncDriversAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('markets/drivers/SYNC_DRIVERS'))) {
    // Start the sync in the background
    const bgTask = yield fork(syncDriversTask, action)

    // Wait for the sync to cancel
    yield take('markets/drivers/UNSYNC_DRIVERS')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}

export function* syncCarsSaga() {
  let action: ISyncDriversAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('markets/cars/SYNC_CARS'))) {
    // Start the sync in the background
    const bgTask = yield fork(syncCarsTask, action)

    // Wait for the sync to cancel
    yield take('markets/cars/UNSYNC_CARS')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}
// endregion

// region State
export interface IMarketsReduxState {
  addressAnswers: { [id: string]: string }
  motorAnswers: { [id: string]: any }
  driverAnswers: { [id: string]: any }
  carAnswers: { [id: string]: any }
  addresses: { [id: string]: Address }
  drivers: { [id: string]: Person }
  cars: { [id: string]: Car }
  quoteRequests: { [id: string]: IQuoteRequest }
}

const DEFAULT_STATE: IMarketsReduxState = {
  addressAnswers: {},
  addresses: {},
  motorAnswers: {},
  driverAnswers: {},
  carAnswers: {},
  drivers: {},
  cars: {},
  quoteRequests: {},
}
// endregion

export default function reducer(
  state: IMarketsReduxState = DEFAULT_STATE,
  action: MarketsAction,
): IMarketsReduxState {
  if (action.type === 'markets/addresses/SET_ADDRESS_ANSWER') {
    const addressAnswers = { ...state.addressAnswers }
    addressAnswers[action.key] = action.value
    return {
      ...state,
      addressAnswers,
    }
  } else if (action.type === 'markets/cars/SET_MOTOR_ANSWER') {
    const motorAnswers = { ...state.motorAnswers }
    motorAnswers[action.key] = action.value
    return {
      ...state,
      motorAnswers,
    }
  } else if (action.type === 'markets/cars/SET_MOTOR_ANSWERS') {
    return {
      ...state,
      motorAnswers: action.answers,
    }
  } else if (action.type === 'markets/cars/SET_CAR_ANSWER') {
    const carAnswers = { ...state.carAnswers }
    carAnswers[action.key] = action.value
    return {
      ...state,
      carAnswers,
    }
  } else if (action.type === 'markets/drivers/SET_DRIVER_ANSWER') {
    const driverAnswers = { ...state.driverAnswers }
    driverAnswers[action.key] = action.value
    return {
      ...state,
      driverAnswers,
    }
  } else if (action.type === 'markets/addresses/RECEIVE_ADDRESSES') {
    return {
      ...state,
      addresses: action.addresses,
    }
  } else if (action.type === 'markets/drivers/RECEIVE_DRIVERS') {
    return {
      ...state,
      drivers: action.drivers,
    }
  } else if (action.type === 'markets/cars/RECEIVE_CARS') {
    return {
      ...state,
      cars: action.cars,
    }
  } else if (action.type === 'markets/quoteRequests/RECEIVE_QUOTE_REQUESTS') {
    return {
      ...state,
      quoteRequests: action.quoteRequests,
    }
  }

  return state
}
