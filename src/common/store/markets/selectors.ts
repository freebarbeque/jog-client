import * as _ from 'lodash'
import { createSelector } from 'reselect'
import { ICar, IPerson, IQuoteRequest } from '../../../business/types'
import { IReduxState } from '../../types'

export interface INormalQuoteRequest extends IQuoteRequest {
  normalCar?: INormalCar | null
}

export interface INormalCar extends ICar {
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

// Generate presentable quoteR
export const selectNormalisedQRs = createSelector(
  (state: IReduxState) => state.markets.cars,
  (state: IReduxState) => state.markets.quoteRequests,
  (cars, quoteRequests) => {
    const nQuoteRequests: { [id: string]: INormalQuoteRequest } = {}
    _.forEach(quoteRequests, (qr: IQuoteRequest) => {
      const carId = qr.vehicle
      const car = carId ? cars[carId] : null

      if (qr.id) {
        nQuoteRequests[qr.id] = {
          ...qr,
          normalCar: car ? normaliseCar(car) : null,
        }
      }
    })
    return nQuoteRequests
  },
)
