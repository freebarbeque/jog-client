import * as firebase from 'firebase'
import {
  IAddress,
  ICar,
  IPerson,
  IQuoteRequest,
} from 'jog-common/business/types'

export function setAddress(uid: string, address: IAddress) {
  const db = firebase.database()
  return db.ref(`/addresses/${uid}/${address.id}`).set(address)
}

export function setPerson(uid: string, driver: IPerson) {
  const db = firebase.database()
  return db.ref(`/drivers/${uid}/${driver.id}`).set(driver)
}

export function setCar(uid: string, car: ICar) {
  const db = firebase.database()
  return db.ref(`/cars/${uid}/${car.id}`).set(car)
}

export function deleteQuoteRequest(uid: string, quoteId: string) {
  const db = firebase.database()
  return db.ref(`/quoteRequests/${uid}/${quoteId}`).remove()
}

export function sync<T>(
  key: string,
  cb: (items: { [id: string]: T }) => void,
): () => void {
  const db = firebase.database()
  const ref = db.ref(key)
  const listener = snapshot => {
    const items = snapshot.val() || {}
    cb(items)
  }
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export function syncPeople(
  uid: string,
  cb: (drivers: { [id: string]: IPerson }) => void,
): () => void {
  const key = `/drivers/${uid}`
  return sync(key, cb)
}

export function syncAddresses(
  uid: string,
  cb: (addresses: { [id: string]: IAddress }) => void,
): () => void {
  const key = `/addresses/${uid}`
  return sync(key, cb)
}

export function syncCars(
  uid: string,
  cb: (addresses: { [id: string]: IAddress }) => void,
): () => void {
  const key = `/cars/${uid}`
  return sync(key, cb)
}

export function syncQuoteRequests(
  uid: string,
  cb: (quoteRequests: { [id: string]: IQuoteRequest }) => void,
): () => void {
  const key = `/quoteRequests/${uid}`
  return sync(key, cb)
}
