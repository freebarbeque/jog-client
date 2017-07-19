// @flow

import _ from 'lodash'
import assert from 'assert'

import * as address from '../src/business/address'
import { validate } from '../src/business/validation'

describe('address', () => {
  const baseAnswers = {
    'address/first-line': '15 Southlands',
    'address/second-line': 'Kirkheaton',
    'address/city': 'Huddersfield',
    'address/province': 'West Yorkshire',
    'address/post-code': 'HD50JU',
  }

  it('perfect', () => {
    const errors = validate(address.questions, baseAnswers)
    console.log('errors', errors)
    assert(!errors.hasError)
    assert(!_.keys(errors.field).length)
    assert(!errors.nonField.length)
  })

  it('missing first line', () => {
    const answers = { ...baseAnswers }
    delete answers['address/first-line']
    const errors = validate(address.questions, answers)
    console.log('errors', errors)
    assert(errors.hasError)
    const fieldError = errors.field['address/first-line']
    console.log('field error', fieldError)
    assert(fieldError)
    assert(!errors.nonField.length)
  })

  it('missing second line', () => {
    const answers = { ...baseAnswers }
    delete answers['address/second-line']
    const errors = validate(address.questions, baseAnswers)
    console.log('errors', errors)
    assert(!errors.hasError)
    assert(!_.keys(errors.field).length)
    assert(!errors.nonField.length)
  })
})
