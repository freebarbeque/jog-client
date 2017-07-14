// @flow

import assert from 'assert'

describe('simple', () => {
  it('perfect case', () => {
    const convictions = [
      {
        date: '01/01/2016',
        dvlaOffenceCode: 'SP-30',
        points: 3,
        finePaid: 70,
      },
    ]

    const incidents = [
      {
        date: '01/01/2016',
        type: 'theft',
        noClaimsDamage: true,
      },
    ]

    const answers = {
      'motor/vehicle': {
        registration: 'WR09GKA',
        model: 'Focus Zetekc',
        make: 'Ford',
        value: 2000,
        dateRegistered: '01/01/09',
        imported: false,
      },
      'motor/main-driver': {
        id: 'rich123',
        firstName: 'Richard',
        lastName: 'Gill',
        gender: 'female',
        dob: '01/01/1989',
        motoring: {
          convictions: convictions,
          incidents: incidents,
        },
      },
      'motor/additional-drivers': [],
      'motor/license': 'full',
      'motor/license-length': 18,
      'motor/where-license-issued': 'uk',
      'motor/manual-or-auto': 'manual',
      'motor/other-driving-qualifications': [],
      'motor/dvla-medical-conditions': null,
      'motor/other-cars': null,
      'motor/convictions': convictions,
      'motor/incidents': incidents,
      'motor/no-claims': 1,
      'motor/start-date': '20/07/2017',
    }


  })
})
