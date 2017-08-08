import * as _ from 'lodash'

import {
  Address,
  BaseQuestionDescriptor,
  BasicQuestion,
  BooleanDependentQuestionDescriptor,
  Car,
  DateQuestionDescriptor,
  IQuoteRequest,
  MotoringConviction,
  MotoringIncident,
  MultiSelectQuestionDescriptor,
  NumericQuestionDescriptor,
  Person,
  SelectQuestionDescriptor,
  IDrivingQualification,
  DrivingRestriction,
} from './types'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

export const addressQuestion: BaseQuestionDescriptor<Address> = {
  type: 'motor/address',
  id: 'motor/address',
  questionText: 'Address',
  required: true,
}

export const policyHolderQuestion: BaseQuestionDescriptor<Person> = {
  type: 'motor/main-driver',
  id: 'motor/main-driver',
  questionText: 'Who is the main policy holder?',
  required: true,
}

const additionalDriversQuestion: BaseQuestionDescriptor<Person[]> = {
  type: 'motor/additional-drivers',
  id: 'motor/additional-drivers',
  questionText: 'Additional drivers',
  required: false,
}

export const drivingLicenseTypeQuestion: SelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'motor/license',
  questionText: 'What kind of license do you hold?',
  options: [
    { label: 'Provisional', value: 'provisional' },
    {
      label: 'Full',
      value: 'full',
    },
    {
      label: 'Medically Restricted',
      value: 'medical-restriction',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ],
  required: true,
}

export const vehicleQuestion: BaseQuestionDescriptor<Car> = {
  type: 'motor/vehicle',
  id: 'motor/vehicle',
  questionText: 'Which car would you like to insure?',
  required: true,
}

export const yearsHeldLicenseQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'motor/license-length',
  questionText: 'For how many years have you held your license?',
  required: true,
}

export const whereLicenseIssuedQuestion: SelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'motor/where-license-issued',
  questionText: 'Where was your license issued?',
  options: [
    { label: 'UK', value: 'uk' },
    { label: 'EU', value: 'eu' },
    { label: 'Europe (Non-EU)', value: 'europe' },
    {
      label: 'International',
      value: 'international',
    },
  ],
  required: true,
}

export const manualOrAutomaticQuestion: SelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'motor/manual-or-auto',
  questionText: 'Does your license cover manual cars or just automatic?',
  options: [
    {
      label: 'Manual & Automatic',
      value: 'manual',
    },
    {
      label: 'Automatic only',
      value: 'automatic',
    },
  ],
  required: true,
}

export const additionalDrivingQualificationsQuestion: MultiSelectQuestionDescriptor<
  IDrivingQualification
> = {
  type: 'multiselect',
  id: 'motor/other-driving-qualifications',
  questionText: 'Do you have any additional driving qualifications?',
  options: [
    {
      label: 'Pass Plus',
      value: 'pass-plus',
    },
    {
      label: 'Advanced Driving Test',
      value: 'advanced-driving',
    },
  ],
  required: false,
}

type MedicalConditionDependentQuestion =
  | BasicQuestion
  | SelectQuestionDescriptor<DrivingRestriction>

export const dvlaMedicalConditions: BooleanDependentQuestionDescriptor<
  MedicalConditionDependentQuestion
> = {
  id: 'motor/has-medical-conditions',
  type: 'boolean-dependent',
  questionText:
    'Do you have any medical conditions that could affect your driving?',
  dependentQuestions: [
    {
      type: 'select',
      id: 'motor/dvla-medical-conditions',
      questionText: 'Does the DVLA know about these conditions?',
      options: [
        {
          label: 'DVLA aware - no restrictions',
          value: 'aware-no-restrictions',
        },
        {
          label: 'DVLA aware - 1 year restricted license',
          value: 'aware-1-year-restriction',
        },
        {
          label: 'DVLA aware - 2 year restricted license',
          value: 'aware-2-year-restriction',
        },
        {
          label: 'DVLA aware - 3 year restricted license',
          value: 'aware-3-year-restriction',
        },
        {
          label: 'DVLA not aware',
          value: 'not-aware',
        },
        {
          label: 'Advised not to drive by doctor',
          value: 'advised-not-to-drive-by-doctor',
        },
      ],
      required: true,
    },
  ],
  required: true,
}

export const otherCars: SelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'motor/other-cars',
  questionText: 'Which of these cars do you drive?',
  options: [
    {
      label: 'Own another car',
      value: 'own-another-car',
    },
    {
      label: 'Have use of another car',
      value: 'have-use-of-another-car',
    },
    {
      label: 'Company car, for business and social use',
      value: 'company-car-social',
    },
    {
      label: 'Company car, for business use only',
      value: 'company-car-business',
    },
  ],
  required: false,
}

export const motoringConvictionsQuestion: BaseQuestionDescriptor<
  MotoringConviction[]
> = {
  type: 'motor/convictions',
  id: 'motor/convictions',
  questionText: 'Do you have any motoring convictions?',
  required: false,
}

export const motoringIncidentsQuestion: BaseQuestionDescriptor<
  MotoringIncident[]
> = {
  type: 'motor/incidents',
  id: 'motor/incidents',
  questionText:
    'Have you had any motoring incidents/claims in the last 5 years?',
  required: false,
}

export const noClaimsDiscountQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'motor/no-claims',
  questionText: 'How many years no claims discount do you have?',
  defaultValue: () => 0,
}

export const startDateQuestion: DateQuestionDescriptor = {
  type: 'date',
  id: 'motor/start-date',
  questionText: 'When would you like your insurance to start?',
  defaultValue: () => new Date(),
}

export const questions = [
  vehicleQuestion,
  policyHolderQuestion,
  addressQuestion,
  drivingLicenseTypeQuestion,
  yearsHeldLicenseQuestion,
  whereLicenseIssuedQuestion,
  manualOrAutomaticQuestion,
  additionalDrivingQualificationsQuestion,
  dvlaMedicalConditions,
  otherCars,
  noClaimsDiscountQuestion,
  startDateQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export interface IQuoteAnswers {
  'motor/main-driver': string
  'motor/vehicle': string
  'motor/license-length': number
  'motor/where-license-issued': string
  'motor/manual-or-auto': string
  'motor/other-driving-qualifications': IDrivingQualification[]
  'motor/dvla-medical-conditions': DrivingRestriction | null
  'motor/other-cars': string[] | null
  'motor/convictions': MotoringConviction[]
  'motor/incidents': MotoringIncident[]
  'motor/no-claims': number
  'motor/start-date': Date
}

export function constructQuoteRequest(
  answers: {
    [id: string]: any
  },
  id?: string,
): IQuoteRequest {
  return {
    id: id || uuid(),
    mainDriver: answers['motor/main-driver'] || null,
    vehicle: answers['motor/vehicle'] || null,
    yearsHeld: answers['motor/license-length'] || null,
    whereLicenseIssued: answers['motor/where-license-issued'] || null,
    transmission: answers['motor/manual-or-auto'] || null,
    qualifications: answers['motor/other-driving-qualifications'] || [],
    dvlaAwareMedicalConditions:
      answers['motor/dvla-medical-conditions'] || null,
    otherCars: answers['motor/other-cars'] || [],
    motoringConvictions: answers['motor/convictions'] || [],
    motoringIncidents: answers['motor/incidents'] || [],
    noClaimsDiscount: answers['motor/no-claims'] || null,
    startDate: answers['motor/start-date'] || null,
  }
}

export function constructAnswers(quote: IQuoteRequest): IQuoteAnswers {
  return {
    'motor/main-driver': quote.mainDriver,
    'motor/vehicle': quote.vehicle,
    'motor/license-length': quote.yearsHeld,
    'motor/where-license-issued': quote.whereLicenseIssued,
    'motor/manual-or-auto': quote.transmission,
    'motor/other-driving-qualifications': quote.qualifications,
    'motor/dvla-medical-conditions': quote.dvlaAwareMedicalConditions,
    'motor/other-cars': quote.otherCars,
    'motor/convictions': quote.motoringConvictions,
    'motor/incidents': quote.motoringIncidents,
    'motor/no-claims': quote.noClaimsDiscount,
    'motor/start-date': quote.startDate,
  }
}
