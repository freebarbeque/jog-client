// @flow

import _ from 'lodash'

import type {
  BooleanQuestionDescriptor,
  NullableBooleanQuestionDescriptor,
  NullableTextQuestionDescriptor,
  SelectQuestionDescriptor,
  TextQuestionDescriptor,
} from './types'

export const firstNameQuestion: TextQuestionDescriptor = {
  id: 'person/first-name',
  questionText: "What's your first name?",
  required: true,
}

export const lastNameQuestion: TextQuestionDescriptor = {
  id: 'person/last-name',
  questionText: "What's your last name?",
  required: true,
}

export const genderQuestion: SelectQuestionDescriptor<string> = {
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

export const startLivingUkQuestion: NullableBooleanQuestionDescriptor = {
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

export const drivingLicenseQuestion: NullableTextQuestionDescriptor = {
  type: 'nullable-text',
  id: 'person/license',
  questionText: 'What is your driving license number?',
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
