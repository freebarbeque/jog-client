import Firestack from 'react-native-firestack'

let firestack = null

export function getFirestack(): Firestack {
  if (!firestack) throw new Error('Firestack not initialised.')
  return firestack
}

export function initFirestack() {
  firestack = new Firestack()
  return firestack
}
