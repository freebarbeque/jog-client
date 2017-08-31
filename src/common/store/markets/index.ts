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

import {
  IAddress,
  ICar,
  IPerson,
  IQuoteRequest,
} from 'jog-common/business/types'
import { goBack } from 'react-router-redux'

import { demandCurrentUser } from '../../data/auth'
import {
  deleteAddress,
  deleteCar,
  deletePerson,
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
  deleteQuoteRequestTask,
  QuoteRequestAction,
} from './quoteRequests'

import { IAddressAnswers } from 'jog-common/business/address'
import { ICarAnswers } from 'jog-common/business/car'
import { IDriverAnswers } from 'jog-common/business/driver'
import Logger, { Levels } from '~/common/Logger'

const log = new Logger('common/store/markets', Levels.TRACE)

// region Action types
export interface ISetAddressAnswerAction {
  type: 'markets/addresses/SET_ADDRESS_ANSWER'
  key: string
  value: string
}

export interface ISetAddressAnswersAction {
  type: 'markets/addresses/SET_ADDRESS_ANSWERS'
  answers: IAddressAnswers
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

export interface ISetDriverAnswersAction {
  type: 'markets/drivers/SET_DRIVER_ANSWERS'
  answers: IDriverAnswers
}

export interface IDeleteDriverAction {
  type: 'markets/drivers/DELETE_DRIVER'
  id: string
}

export interface IDeleteCarAction {
  type: 'markets/cars/DELETE_CAR'
  id: string
}

export interface IDeleteAddressAction {
  type: 'markets/addresses/DELETE_ADDRESS'
  id: string
}

export interface IAddDriverAction {
  type: 'markets/drivers/ADD_DRIVER'
  driver: IPerson
}

export interface ISetCarAnswer {
  type: 'markets/cars/SET_CAR_ANSWER'
  key: string
  value: any
}

export interface ISetCarAnswers {
  type: 'markets/cars/SET_CAR_ANSWERS'
  answers: ICarAnswers
}

export interface IAddCarAction {
  type: 'markets/cars/ADD_CAR'
  car: ICar
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
  cars: { [id: string]: ICar }
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
  drivers: { [id: string]: IPerson }
}

export interface IAddAddressAction {
  type: 'markets/addresses/ADD_ADDRESS'
  address: IAddress
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
  addresses: { [id: string]: IAddress }
}

export type MarketsAction =
  | ISetAddressAnswerAction
  | ISetAddressAnswersAction
  | ISetMotorAnswersAction
  | IAddAddressAction
  | IReceiveAddressesAction
  | IUnsyncAddressesAction
  | ISyncAddressesAction
  | ISetMotorAnswerAction
  | IAddDriverAction
  | ISetDriverAnswerAction
  | ISetDriverAnswersAction
  | ISyncDriversAction
  | IUnsyncDriversAction
  | IReceiveDriversAction
  | IAddCarAction
  | ISyncCarsAction
  | IUnsyncCarsAction
  | IReceiveCarsAction
  | ISetCarAnswer
  | ISetCarAnswers
  | QuoteRequestAction
  | IDeleteCarAction
  | IDeleteDriverAction
  | IDeleteAddressAction

// endregion

// region Action creators
export function deleteCarAction(id: string): IDeleteCarAction {
  return {
    type: 'markets/cars/DELETE_CAR',
    id,
  }
}

export function deleteAddressAction(id: string): IDeleteAddressAction {
  return {
    type: 'markets/addresses/DELETE_ADDRESS',
    id,
  }
}

export function deleteDriverAction(id: string): IDeleteDriverAction {
  return {
    type: 'markets/drivers/DELETE_DRIVER',
    id,
  }
}

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

export function setAddressAnswers(
  answers: IAddressAnswers,
): ISetAddressAnswersAction {
  return {
    type: 'markets/addresses/SET_ADDRESS_ANSWERS',
    answers,
  }
}

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

export function setCarAnswers(answers: ICarAnswers): ISetCarAnswers {
  return {
    type: 'markets/cars/SET_CAR_ANSWERS',
    answers,
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

export function setDriverAnswers(
  answers: IDriverAnswers,
): ISetDriverAnswersAction {
  return {
    type: 'markets/drivers/SET_DRIVER_ANSWERS',
    answers,
  }
}

export function addAddress(address: IAddress): IAddAddressAction {
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
  [id: string]: IAddress
}): IReceiveAddressesAction {
  return {
    type: 'markets/addresses/RECEIVE_ADDRESSES',
    addresses,
  }
}

export function addDriver(driver: IPerson): IAddDriverAction {
  return {
    type: 'markets/drivers/ADD_DRIVER',
    driver,
  }
}

export function addCar(car: ICar): IAddCarAction {
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

export function receiveCars(cars: { [id: string]: ICar }): IReceiveCarsAction {
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
  [id: string]: IPerson
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
  log.trace(`Adding address with id ${address.id}`, address)
  yield put(startLoading('Adding new address'))
  const user = demandCurrentUser()
  yield call(() => setAddress(user.uid, address))
  log.debug(`Added address with id ${address.id}`, address)
  yield put(finishLoading())
  yield put(goBack())
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
  log.debug(`Adding car with id ${car.id}`, car)
  yield put(startLoading('Adding vehicle'))
  const user = demandCurrentUser()
  yield call(() => setCar(user.uid, car))
  yield put(finishLoading())
  yield put(goBack())
}

export function* deleteCarTask(action: IDeleteCarAction) {
  const carId = action.id
  log.debug(`Deleting car with id ${carId}`)
  yield put(startLoading('Deleting car'))
  const user = demandCurrentUser()
  yield call(() => deleteCar(user.uid, carId))
  yield put(finishLoading())
}

export function* deleteAddressTask(action: IDeleteAddressAction) {
  const addressId = action.id
  log.debug(`Deleting address with id ${addressId}`)
  const user = demandCurrentUser()
  yield call(() => deleteAddress(user.uid, addressId))
  yield put(finishLoading())
}

export function* deleteDriverTask(action: IDeleteDriverAction) {
  const driverId = action.id
  log.debug(`Deleting driver with id ${driverId}`)
  const user = demandCurrentUser()
  yield call(() => deletePerson(user.uid, driverId))
  yield put(finishLoading())
}

export function* addMarketEntitySaga() {
  yield takeLatest('markets/addresses/ADD_ADDRESS', addAddressTask)
  yield takeLatest('markets/drivers/ADD_DRIVER', addDriverTask)
  yield takeLatest('markets/cars/ADD_CAR', addCarTask)
  yield takeLatest('markets/cars/DELETE_CAR', deleteCarTask)
  yield takeLatest('markets/addresses/DELETE_ADDRESS', deleteAddressTask)
  yield takeLatest('markets/drivers/DELETE_DRIVER', deleteDriverTask)
  yield takeLatest(
    'markets/quoteRequests/ADD_QUOTE_REQUEST',
    addQuoteRequestTask,
  )
  yield takeLatest(
    'markets/quoteRequests/DELETE_QUOTE_REQUEST',
    deleteQuoteRequestTask,
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
      log.trace('received new drivers', drivers)
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
      log.trace('received new addresses', addresses)
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
      log.trace('received new cars', cars)
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
  addressAnswers: { [id: string]: any }
  motorAnswers: { [id: string]: any }
  driverAnswers: { [id: string]: any }
  carAnswers: { [id: string]: any }
  addresses: { [id: string]: IAddress }
  drivers: { [id: string]: IPerson }
  cars: { [id: string]: ICar }
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
  } else if (action.type === 'markets/addresses/SET_ADDRESS_ANSWERS') {
    return {
      ...state,
      addressAnswers: action.answers,
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
  } else if (action.type === 'markets/cars/SET_CAR_ANSWERS') {
    return {
      ...state,
      carAnswers: action.answers,
    }
  } else if (action.type === 'markets/drivers/SET_DRIVER_ANSWER') {
    const driverAnswers = { ...state.driverAnswers }
    driverAnswers[action.key] = action.value
    return {
      ...state,
      driverAnswers,
    }
  } else if (action.type === 'markets/drivers/SET_DRIVER_ANSWERS') {
    return {
      ...state,
      driverAnswers: action.answers,
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
