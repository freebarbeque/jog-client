import * as _ from 'lodash'

import {
  Address,
  BaseQuestionDescriptor,
  BasicQuestion,
  Car,
  DateQuestionDescriptor,
  MotoringConviction,
  MotoringIncident,
  MultiSelectQuestionDescriptor,
  NumericQuestionDescriptor,
  Person,
  SelectQuestionDescriptor,
  BooleanDependentQuestionDescriptor,
} from './types'

export type DrivingQualifications = 'pass-plus' | 'advanced-driving'
export type DrivingRestriction = 'aware-no-restrictions' | 'aware-1-year-restriction' | 'aware-2-year-restriction' | 'aware-3-year-restriction' | 'not-aware' | 'advised-not-to-drive-by-doctor'

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

export const additionalDrivingQualificationsQuestion: MultiSelectQuestionDescriptor<DrivingQualifications> = {
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

type MedicalConditionDependentQuestion = BasicQuestion | SelectQuestionDescriptor<DrivingRestriction>

export const dvlaMedicalConditions: BooleanDependentQuestionDescriptor<MedicalConditionDependentQuestion> = {
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

export const motoringConvictionsQuestion: BaseQuestionDescriptor<MotoringConviction[]> = {
  type: 'motor/convictions',
  id: 'motor/convictions',
  questionText: 'Do you have any motoring convictions?',
  required: false,
}

export const motoringIncidentsQuestion: BaseQuestionDescriptor<MotoringIncident[]> = {
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
  additionalDriversQuestion,
  drivingLicenseTypeQuestion,
  yearsHeldLicenseQuestion,
  whereLicenseIssuedQuestion,
  manualOrAutomaticQuestion,
  additionalDrivingQualificationsQuestion,
  dvlaMedicalConditions,
  otherCars,
  motoringConvictionsQuestion,
  motoringIncidentsQuestion,
  noClaimsDiscountQuestion,
  startDateQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

// Compute outstanding questions
// Validation
