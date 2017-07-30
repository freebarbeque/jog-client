// @flow

import * as _ from 'lodash'
import uuid from 'uuid/v4'
import { validate } from './validation'

import {
  BooleanQuestionDescriptor,
  Person,
  SelectQuestionDescriptor,
  TextQuestionDescriptor,
} from './types'

export const firstNameQuestion: TextQuestionDescriptor = {
  id: 'person/first-name',
  type: 'text',
  questionText: "What's your first name?",
  required: true,
}

export const lastNameQuestion: TextQuestionDescriptor = {
  id: 'person/last-name',
  type: 'text',
  questionText: "What's your last name?",
  required: true,
}

export const genderQuestion: SelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'person/gender',
  questionText: "What's your gender?",
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ],
  required: true,
}

export const relationshipStatusQuestion: SelectQuestionDescriptor<string> = {
  id: 'person/relationship-status',
  questionText: "What's your relationship status?",
  type: 'select',
  options: [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Partner', value: 'partner' },
    { label: 'Common law', value: 'common-law' },
    { label: 'Seperated', value: 'seperated' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ],
  required: true,
}

export const childrenQuestion: BooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'person/children',
  questionText: 'Do you have any children under the age of 16?',
  required: false,
}

export const startLivingUkQuestion: BooleanQuestionDescriptor = {
  type: 'boolean',
  questionText: 'When did you start living in the UK?',
  id: 'person/uk-start-living',
  required: false,
}

export const jobQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'person/job',
  questionText: 'What job do you do?',
  required: true,
}

export const industryQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'person/industry',
  questionText: 'What industry do you work in?',
  required: true,
}

export const drivingLicenseQuestion: TextQuestionDescriptor = {
  type: 'text',
  id: 'person/license',
  questionText: 'What is your driving license number?',
  hint: 'This is not required by law',
  required: false,
}

export const questions = [
  firstNameQuestion,
  lastNameQuestion,
  genderQuestion,
  relationshipStatusQuestion,
  childrenQuestion,
  startLivingUkQuestion,
  jobQuestion,
  industryQuestion,
  drivingLicenseQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export function constructDriver(answers: { [id: string]: any }): Person {
  if (validate(questions, answers).hasError) {
    throw new Error('Address questions should have passed validation.')
  } else {
    const driver: Person = {
      id: uuid(),
      firstName: answers['person/first-name'],
      lastName: answers['person/last-name'],
      gender: answers['person/gender'],
      dob: answers['person/dob'],
    }

    return driver
  }
}
