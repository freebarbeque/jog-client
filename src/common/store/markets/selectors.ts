import { ICar, IPerson, IQuoteRequest } from 'jog-common/business/types'
import * as _ from 'lodash'
import { createSelector } from 'reselect'
import { IReduxState } from '../../types'

export interface IResolvedQuoteRequest extends IQuoteRequest {
  normalCar?: INormalCar | null
  normalMainDriver?: INormalPerson | null
}

export interface INormalCar extends ICar {
  description: string
}

export interface INormalPerson extends IPerson {
  description: string
}

function normaliseCar(car: ICar): INormalCar {
  let description = `Unknown`

  if (car.make && car.model) {
    description = `${car.make} ${car.model}`
  } else if (car.make) {
    description = `${car.make}`
  } else if (car.model) {
    description = `${car.model}`
  }

  if (car.registration) {
    description = `${description} (${car.registration})`
  }

  return {
    ...car,
    description,
  }
}

function normalisePerson(person: IPerson): INormalPerson {
  return {
    ...person,
    description: `${person.firstName}${person.lastName
      ? ' '
      : ''}${person.lastName}`,
  }
}

// Generate presentable quoteR
export const selectNormalisedQRs = createSelector(
  (state: IReduxState) => state.markets.cars,
  (state: IReduxState) => state.markets.drivers,
  (state: IReduxState) => state.markets.quoteRequests,
  (cars, drivers, quoteRequests) => {
    const nQuoteRequests: { [id: string]: IResolvedQuoteRequest } = {}
    _.forEach(quoteRequests, (qr: IQuoteRequest) => {
      const carId = qr.vehicle
      const car = carId ? cars[carId] : null

      const mainDriverId = qr.mainDriver
      const mainDriver = mainDriverId ? drivers[mainDriverId] : null

      if (qr.id) {
        nQuoteRequests[qr.id] = {
          ...qr,
          normalCar: car ? normaliseCar(car) : null,
          normalMainDriver: mainDriver ? normalisePerson(mainDriver) : null,
        }
      }
    })
    return nQuoteRequests
  },
)
