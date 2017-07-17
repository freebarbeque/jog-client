// @flow
import _ from 'lodash'

import type {
  BaseQuestionDescriptor,
  Car,
  DateQuestionDescriptor,
  MotoringConviction,
  MotoringIncident,
  MultiSelectQuestionDescriptor,
  NullableSelectQuestionDescriptor,
  NumericQuestionDescriptor,
  Person,
  SelectQuestionDescriptor,
} from './types'

export type DrivingQualifications = 'pass-plus' | 'advanced-driving'

const policyHolderQuestion: BaseQuestionDescriptor<Person> = {
  type: 'motor/main-driver',
  id: 'motor/main-driver',
  questionText: 'Main driver',
  required: true,
}

const additionalDriversQuestion: BaseQuestionDescriptor<Person[]> = {
  type: 'motor/additional-drivers',
  id: 'motor/additional-drivers',
  questionText: 'Additional drivers',
  required: false,
}

const drivingLicenseTypeQuestion: SelectQuestionDescriptor<string> = {
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

const vehicleQuestion: BaseQuestionDescriptor<Car> = {
  type: 'motor/vehicle',
  id: 'motor/vehicle',
  questionText: 'Which car would you like to ensure?',
  required: true,
}

const monthsHeldLicenseQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'motor/license-length',
  questionText: 'For how long have you held your license?',
  required: true,
}

const whereLicenseIssuedQuestion: SelectQuestionDescriptor<string> = {
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

const manualOrAutomaticQuestion: SelectQuestionDescriptor<string> = {
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

const additionalDrivingQualificationsQuestion: MultiSelectQuestionDescriptor<
  DrivingQualifications,
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

const dvlaMedicalConditions: NullableSelectQuestionDescriptor<string> = {
  type: 'nullable-select',
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
  required: false,
}

const otherCars: NullableSelectQuestionDescriptor<string> = {
  type: 'nullable-select',
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

const motoringConvictionsQuestion: BaseQuestionDescriptor<
  MotoringConviction[],
> = {
  type: 'motor/convictions',
  id: 'motor/convictions',
  questionText: 'Do you have any motoring convictions?',
  required: false,
}

const motoringIncidentsQuestion: BaseQuestionDescriptor<MotoringIncident[]> = {
  type: 'motor/incidents',
  id: 'motor/incidents',
  questionText:
    'Have you had any motoring incidents/claims in the last 5 years?',
  required: false,
}

const noClaimsDiscountQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'motor/no-claims',
  questionText: 'How many years no claims discount do you have?',
  defaultValue: () => 0,
}

const startDateQuestion: DateQuestionDescriptor = {
  type: 'date',
  id: 'motor/start-date',
  questionText: 'When would you like your insurance to start?',
  defaultValue: () => new Date(),
}

export const questions = [
  vehicleQuestion,
  policyHolderQuestion,
  additionalDriversQuestion,
  drivingLicenseTypeQuestion,
  monthsHeldLicenseQuestion,
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
