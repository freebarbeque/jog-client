// @flow

import _ from 'lodash'

import type {
  BaseQuestionDescriptor,
  BooleanQuestionDescriptor,
  NullableDateQuestionDescriptor,
  NumericQuestionDescriptor,
  SelectQuestionDescriptor,
} from './types'

export type Hand = 'right' | 'left'
export type Alarm = 'none' | 'cat1' | 'cat2' | 'other'

export type Owner =
  | 'company-director'
  | 'employee'
  | 'employer'
  | 'garage'
  | 'other'
  | 'other-family-member'
  | 'partner'
  | 'civil-partner'
  | 'partner-common-law'
  | 'you'
  | 'son-or-daughter'
  | 'spouse'
  | 'lease-company'

export type Modification = {
  category: string,
  subcategory: string,
}

export const handDriveQuestion: SelectQuestionDescriptor<Hand> = {
  type: 'select',
  id: 'car/hand-drive',
  questionText: 'Is the car left or right hand drive?',
  options: [
    {
      label: 'Right',
      value: 'right',
    },
    {
      label: 'Left',
      value: 'left',
    },
  ],
  required: true,
}

export const numSeatsQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'car/num-seats',
  questionText: 'How many seats does the car have?',
  required: true,
}

export const trackingDeviceQuestion: BooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'car/tracking-device',
  questionText: 'Does it have a tracking device?',
  required: true,
}

export const alarmQuestion: SelectQuestionDescriptor<Alarm> = {
  type: 'select',
  id: 'car/alarm',
  questionText: 'What type of alarm does the car have?',
  required: true,
  options: [
    {
      value: 'none',
      label: 'No security device',
    },
    {
      value: 'cat1',
      label: 'Thatcham approved cat 1',
    },
    {
      value: 'cat2',
      label: 'Thatcham approved cat 2',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ],
}

export const importQuestion: BooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'car/import',
  questionText: 'Is the car an import?',
  required: true,
}

export const modificationsQuestion: BaseQuestionDescriptor<Modification[]> = {
  type: 'car/modifications',
  id: 'car/modifications',
  questionText: 'How has the car been modified?',
  required: false,
}

export const valueQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'car/value',
  questionText: 'Roughly, how much is the car worth?',
  required: true,
}

export const whenPurchasedQuestion: NullableDateQuestionDescriptor = {
  type: 'nullable-date',
  id: 'car/when-purchased',
  questionText: 'When did you purchase the vehicle?',
  required: true,
}

const ownerOptions = [
  {
    label: 'Company director',
    value: 'company-director',
  },
  {
    label: 'Employee',
    value: 'employee',
  },
  {
    label: 'Employer',
    value: 'employer',
  },
  {
    label: 'Garage',
    value: 'garage',
  },
  {
    label: 'Other',
    value: 'other',
  },
  {
    label: 'Other family member',
    value: 'other-family-member',
  },
  {
    label: 'Partner',
    value: 'partner',
  },
  {
    label: 'Civil partner',
    value: 'civil-partner',
  },
  {
    label: 'Partner / common law',
    value: 'partner-common-law',
  },
  {
    label: 'You',
    value: 'you',
  },
  {
    label: 'Son or daughter',
    value: 'son-or-daughter',
  },
  {
    label: 'Spouse',
    value: 'spouse',
  },
  {
    label: 'Vehicle leasing company',
    value: 'lease-company',
  },
]

export const ownerQuestion: SelectQuestionDescriptor<Owner> = {
  type: 'select',
  id: 'car/owner',
  questionText: 'Who is the owner of the car?',
  required: true,
  options: ownerOptions,
  defaultValue: () => 'you',
}

export const registeredKeeperQuestion: SelectQuestionDescriptor<Owner> = {
  type: 'select',
  id: 'car/registered-keeper',
  questionText: 'Who is the registered keeper of the car?',
  required: true,
  defaultValue: 'you',
  options: ownerOptions,
}

export const questions = [
  handDriveQuestion,
  numSeatsQuestion,
  trackingDeviceQuestion,
  alarmQuestion,
  importQuestion,
  modificationsQuestion,
  valueQuestion,
  whenPurchasedQuestion,
  ownerQuestion,
  registeredKeeperQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)
