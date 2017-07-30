import * as firebase from 'firebase'
import { Address, Car, Person } from '../../business/types'

export function setAddress(uid: string, address: Address) {
  const db = firebase.database()
  return db.ref(`/addresses/${uid}/${address.id}`).set(address)
}

export function setPerson(uid: string, driver: Person) {
  const db = firebase.database()
  return db.ref(`/drivers/${uid}/${driver.id}`).set(driver)
}

export function setCar(uid: string, car: Car) {
  const db = firebase.database()
  return db.ref(`/cars/${uid}/${car.id}`).set(car)
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
  cb: (drivers: { [id: string]: Person }) => void,
): () => void {
  const key = `/drivers/${uid}`
  return sync(key, cb)
}

export function syncAddresses(
  uid: string,
  cb: (addresses: { [id: string]: Address }) => void,
): () => void {
  const key = `/addresses/${uid}`
  return sync(key, cb)
}

export function syncCars(
  uid: string,
  cb: (addresses: { [id: string]: Address }) => void,
): () => void {
  const key = `/cars/${uid}`
  return sync(key, cb)
}
