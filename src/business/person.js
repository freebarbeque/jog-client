// @flow

import {
  BooleanQuestionDescriptor,
  NullableBooleanQuestionDescriptor,
  SelectQuestionDescriptor,
  TextQuestionDescriptor,
} from './types'

export const firstNameQuestion: TextQuestionDescriptor = {
  id: 'person/first-name',
  questionText: "What's your first name?",
}

export const lastNameQuestion: TextQuestionDescriptor = {
  id: 'person/last-name',
  questionText: "What's your last name?",
}

export const genderQuestion: SelectQuestionDescriptor<string> = {
  id: 'person/gender',
  questionText: "What's your gender?",
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ],
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
}

export const childrenQuestion: BooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'person/children',
}

export const startLivingUkQuestion: NullableBooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'person/uk-start-living',
}
