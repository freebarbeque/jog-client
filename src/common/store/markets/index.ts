//
// Action Types
//

import {
  fork,
  put,
  call,
  cancel,
  takeLatest,
  take,
  cancelled,
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { Address, Car, Person } from '../../../business/types'
import { finishLoading, startLoading } from '../loading/actions'
import {
  setAddress,
  setCar,
  setPerson,
  syncAddresses,
  syncCars,
  syncPeople,
} from '../../data/quotes'
import { demandCurrentUser } from '../../data/auth'
import { goBack } from 'react-router-redux'

// region Action types
export type SetAddressAnswerAction = {
  type: 'markets/addresses/SET_ADDRESS_ANSWER'
  key: string
  value: string
}

export type SetMotorAnswerAction = {
  type: 'markets/cars/SET_MOTOR_ANSWER'
  key: string
  value: any
}

export type SetDriverAnswerAction = {
  type: 'markets/drivers/SET_DRIVER_ANSWER'
  key: string
  value: any
}

export type AddDriverAction = {
  type: 'markets/drivers/ADD_DRIVER'
  driver: Person
}

export type AddCarAction = {
  type: 'markets/cars/ADD_CAR'
  car: Car
}

export type SyncCarsAction = {
  type: 'markets/cars/SYNC_CARS'
  uid: string
}

export type UnsyncCarsAction = {
  type: 'markets/cars/UNSYNC_CARS'
}

export type ReceiveCarsAction = {
  type: 'markets/cars/RECEIVE_CARS'
  cars: { [id: string]: Car }
}

export type SyncDriversAction = {
  type: 'markets/drivers/SYNC_DRIVERS'
  uid: string
}

export type UnsyncDriversAction = {
  type: 'markets/drivers/UNSYNC_DRIVERS'
}

export type ReceiveDriversAction = {
  type: 'markets/drivers/RECEIVE_DRIVERS'
  drivers: { [id: string]: Person }
}

export type AddAddressAction = {
  type: 'markets/addresses/ADD_ADDRESS'
  address: Address
}

export type SyncAddressesAction = {
  type: 'markets/addresses/SYNC_ADDRESSES'
  uid: string
}

export type UnsyncAddressesAction = {
  type: 'markets/addresses/UNSYNC_ADDRESSES'
}

export type ReceiveAddressesAction = {
  type: 'markets/addresses/RECEIVE_ADDRESSES'
  addresses: { [id: string]: Address }
}

export type MarketsAction =
  | SetAddressAnswerAction
  | AddAddressAction
  | ReceiveAddressesAction
  | UnsyncAddressesAction
  | SyncAddressesAction
  | SetMotorAnswerAction
  | AddDriverAction
  | SetDriverAnswerAction
  | SyncDriversAction
  | UnsyncDriversAction
  | ReceiveDriversAction
  | AddCarAction
  | SyncCarsAction
  | UnsyncCarsAction
  | ReceiveCarsAction

// endregion

// region Action creators
export function setAddressAnswer(
  key: string,
  value: string,
): SetAddressAnswerAction {
  return {
    type: 'markets/addresses/SET_ADDRESS_ANSWER',
    key,
    value,
  }
}

// region Action creators
export function setMotorAnswer(key: string, value: any): SetMotorAnswerAction {
  return {
    type: 'markets/cars/SET_MOTOR_ANSWER',
    key,
    value,
  }
}

export function setDriverAnswer(
  key: string,
  value: any,
): SetDriverAnswerAction {
  return {
    type: 'markets/drivers/SET_DRIVER_ANSWER',
    key,
    value,
  }
}

export function addAddress(address: Address): AddAddressAction {
  return {
    type: 'markets/addresses/ADD_ADDRESS',
    address,
  }
}

export function syncAddressesAction(uid: string): SyncAddressesAction {
  return {
    type: 'markets/addresses/SYNC_ADDRESSES',
    uid,
  }
}

export function unsyncAddressesAction(): UnsyncAddressesAction {
  return {
    type: 'markets/addresses/UNSYNC_ADDRESSES',
  }
}

export function receiveAddresses(addresses: {
  [id: string]: Address
}): ReceiveAddressesAction {
  return {
    type: 'markets/addresses/RECEIVE_ADDRESSES',
    addresses,
  }
}

export function addDriver(driver: Person): AddDriverAction {
  return {
    type: 'markets/drivers/ADD_DRIVER',
    driver,
  }
}

export function addCar(car: Car): AddCarAction {
  return {
    type: 'markets/cars/ADD_CAR',
    car,
  }
}

export function syncCarsAction(uid: string): SyncCarsAction {
  return {
    type: 'markets/cars/SYNC_CARS',
    uid,
  }
}

export function unsyncCarsAction(): UnsyncCarsAction {
  return {
    type: 'markets/cars/UNSYNC_CARS',
  }
}

export function receiveCars(cars: { [id: string]: Car }): ReceiveCarsAction {
  return {
    type: 'markets/cars/RECEIVE_CARS',
    cars,
  }
}

export function syncDriversAction(uid: string): SyncDriversAction {
  return {
    type: 'markets/drivers/SYNC_DRIVERS',
    uid,
  }
}

export function unsyncDriversAction(): UnsyncDriversAction {
  return {
    type: 'markets/drivers/UNSYNC_DRIVERS',
  }
}

export function receiveDrivers(drivers: {
  [id: string]: Person
}): ReceiveDriversAction {
  return {
    type: 'markets/drivers/RECEIVE_DRIVERS',
    drivers,
  }
}

// endregion

// region Sagas
export function* addAddressTask(action: AddAddressAction) {
  const address = action.address
  yield put(startLoading('Adding new address'))
  const user = demandCurrentUser()
  yield call(() => setAddress(user.uid, address))
  yield put(finishLoading())
}

export function* addDriverTask(action: AddDriverAction) {
  const driver = action.driver
  yield put(startLoading('Adding new driver'))
  const user = demandCurrentUser()
  yield call(() => setPerson(user.uid, driver))
  yield put(finishLoading())
  yield put(goBack())
}

export function* addCarTask(action: AddCarAction) {
  const car = action.car
  yield put(startLoading('Adding vehicle'))
  const user = demandCurrentUser()
  yield call(() => setCar(user.uid, car))
  yield put(finishLoading())
}

export function* addMarketEntitySaga() {
  yield takeLatest('markets/addresses/ADD_ADDRESS', addAddressTask)
  yield takeLatest('markets/drivers/ADD_DRIVER', addDriverTask)
  yield takeLatest('markets/cars/ADD_CAR', addCarTask)
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
      console.log('syncMotorPoliciesTask received new policies', cars)
      yield put(receiveCars(cars))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncAddressesSaga() {
  let action: SyncAddressesAction

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
  let action: SyncDriversAction

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
  let action: SyncDriversAction

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
export type MarketsReduxState = {
  addressAnswers: { [id: string]: string }
  motorAnswers: { [id: string]: any }
  driverAnswers: { [id: string]: any }
  addresses: { [id: string]: Address }
  drivers: { [id: string]: Person }
  cars: { [id: string]: Car }
}

const DEFAULT_STATE: MarketsReduxState = {
  addressAnswers: {},
  addresses: {},
  motorAnswers: {},
  driverAnswers: {},
  drivers: {},
  cars: {},
}
// endregion

export default function reducer(
  state: MarketsReduxState = DEFAULT_STATE,
  action: MarketsAction,
): MarketsReduxState {
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
  }

  return state
}
