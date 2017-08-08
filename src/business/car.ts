// @flow

import * as _ from 'lodash'

const uuid = require('uuid/v4')

import {
  Alarm,
  BaseQuestionDescriptor,
  BooleanDependentQuestionDescriptor,
  IBooleanQuestionDescriptor,
  Car,
  DateQuestionDescriptor,
  HandDrive,
  NullableDateQuestionDescriptor,
  NumericQuestionDescriptor,
  Owner,
  SelectQuestionDescriptor,
  TextQuestionDescriptor,
  VehicleModification,
} from './types'

export const registrationQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'car/registration',
  questionText: "What is the car's registration?",
  required: true,
}

export const makeQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'car/make',
  questionText: 'What is the make of the car?',
  required: true,
}

export const modelQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'car/model',
  questionText: 'What is the model of the car?',
  required: true,
}

export const valueQuestion: NumericQuestionDescriptor = {
  type: 'numeric',
  id: 'car/value',
  questionText: 'Roughly, how much is the car worth?',
  required: true,
}

export const registeredQuestion: DateQuestionDescriptor = {
  type: 'date',
  id: 'car/registered',
  questionText: 'When was the car registered?',
  required: false,
}

export const handDriveQuestion: SelectQuestionDescriptor<HandDrive> = {
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

export const trackingDeviceQuestion: IBooleanQuestionDescriptor = {
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

export const importQuestion: IBooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'car/import',
  questionText: 'Is the car an import?',
  required: true,
}

export const modificationsQuestion: BaseQuestionDescriptor<
  VehicleModification[]
> = {
  type: 'car/modifications',
  id: 'car/modifications',
  questionText: 'How has the car been modified?',
  required: false,
}

export const purchasedQuestion: BooleanDependentQuestionDescriptor<
  DateQuestionDescriptor
> = {
  type: 'boolean-dependent',
  id: 'car/purchased',
  questionText: 'Have you already purchased the vehicle?',
  dependentQuestions: [
    {
      type: 'date',
      id: 'car/when-purchased',
      questionText: 'When did you purchase the vehicle?',
      required: true,
    },
  ],
  required: true,
}

const ownerOptions: Array<{ label: string; value: Owner }> = [
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
  defaultValue: 'you',
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
  makeQuestion,
  modelQuestion,
  registrationQuestion,
  valueQuestion,
  registeredQuestion,
  importQuestion,
  handDriveQuestion,
  numSeatsQuestion,
  trackingDeviceQuestion,
  alarmQuestion,
  modificationsQuestion,
  purchasedQuestion,
  ownerQuestion,
  registeredKeeperQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export function constructCar(answers: { [key: string]: any }): Car {
  return {
    id: uuid(),
    registration: answers['car/registration'],
    model: answers['car/model'],
    make: answers['car/make'],
    value: answers['car/value'],
    dateRegistered: answers['car/registered'],
    imported: answers['car/import'],
    drive: answers['car/hand-drive'],
    numSeats: answers['car/num-seats'],
    trackingDevice: answers['car/tracking-device'],
    alarm: answers['car/alarm'],
    modifications: answers['car/modifications'] || [],
    purchasedDate: answers['car/when-purchased'] || null,
    owner: answers['car/owner'],
    registeredKeeper: answers['car/registered-keeper'],
  }
}
