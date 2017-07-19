// @flow

import _ from 'lodash'
import assert from 'assert'
import { validate } from '../src/business/validation'

import * as car from '../src/business/car'

describe('car', () => {
  function answers(merge: { [string]: mixed } = {}): { [string]: mixed } {
    const opts: { [string]: mixed } = {
      'car/hand-drive': 'right',
      'car/num-seats': 5,
      'car/tracking-device': false,
      'car/alarm': 'cat1',
      'car/import': false,
      'car/value': 2200,
      'car/when-purchased': new Date(),
      'car/owner': 'you',
      'car/registered-keeper': 'you',
      ...merge,
    }
    return opts
  }

  it('perfect', () => {
    const errors = validate(car.questions, answers())
    assert(!errors.hasError)
    assert(!_.keys(errors.field).length)
    assert(!errors.nonField.length)
  })

  it('incorrect boolean data type', () => {
    const errors = validate(
      car.questions,
      answers({ 'car/tracking-device': 'false' }),
    )
    assert(errors.hasError)
    assert(errors.field['car/tracking-device'])
    assert(!errors.nonField.length)
  })

  it('incorrect date data type', () => {
    const errors = validate(
      car.questions,
      answers({ 'car/when-purchased': 56 }),
    )
    assert(errors.hasError)
    assert(errors.field['car/when-purchased'])
    assert(!errors.nonField.length)
  })

  it('missing fields', () => {
    const errors = validate(
      car.questions,
      answers({ 'car/when-purchased': 56 }),
    )
    assert(errors.hasError)
    assert(errors.field['car/when-purchased'])
    assert(!errors.nonField.length)
  })
})
