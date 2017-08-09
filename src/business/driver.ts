import * as _ from 'lodash'
import { validate } from './validation'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

import {
  IBooleanDependentQuestionDescriptor,
  IBooleanQuestionDescriptor,
  IDateQuestionDescriptor,
  INumericQuestionDescriptor,
  IPerson,
  ISelectQuestionDescriptor,
  ITextQuestionDescriptor,
} from './types'

export const firstNameQuestion: ITextQuestionDescriptor = {
  id: 'person/first-name',
  type: 'text',
  questionText: "What's your first name?",
  required: true,
}

export const lastNameQuestion: ITextQuestionDescriptor = {
  id: 'person/last-name',
  type: 'text',
  questionText: "What's your last name?",
  required: true,
}

export const genderQuestion: ISelectQuestionDescriptor<string> = {
  type: 'select',
  id: 'person/gender',
  questionText: "What's your gender?",
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ],
  required: true,
}

export const dobQuestion: IDateQuestionDescriptor = {
  type: 'date',
  id: 'person/dob',
  questionText: "What's your date of birth?",
  required: true,
}

export const relationshipStatusQuestion: ISelectQuestionDescriptor<string> = {
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

export const childrenQuestion: IBooleanQuestionDescriptor = {
  type: 'boolean',
  id: 'person/children',
  questionText: 'Do you have any children under the age of 16?',
  required: true,
}

export const startLivingUkQuestion: IBooleanDependentQuestionDescriptor<
  IDateQuestionDescriptor
> = {
  type: 'boolean-dependent',
  questionText: 'Have you lived in the UK all your life?',
  id: 'person/uk-all-life',
  dependentQuestions: [
    {
      type: 'date',
      questionText: 'When did you start living in the UK?',
      id: 'person/started-living',
    },
  ],
  required: true,
  reverse: true,
}

export const jobQuestion: ITextQuestionDescriptor = {
  type: 'text',
  id: 'person/job',
  questionText: 'What job do you do?',
  required: true,
}

export const industryQuestion: ITextQuestionDescriptor = {
  type: 'text',
  id: 'person/industry',
  questionText: 'What industry do you work in?',
  required: true,
}

export const drivingLicenseQuestion: ITextQuestionDescriptor = {
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
  dobQuestion,
  relationshipStatusQuestion,
  childrenQuestion,
  startLivingUkQuestion,
  jobQuestion,
  industryQuestion,
  drivingLicenseQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export function constructDriver(answers: { [id: string]: any }): IPerson {
  if (validate(questions, answers).hasError) {
    throw new Error('Address questions should have passed validation.')
  } else {
    const driver: IPerson = {
      id: uuid(),
      firstName: answers['person/first-name'],
      lastName: answers['person/last-name'],
      gender: answers['person/gender'],
      dob: answers['person/dob'] || null,
    }

    return driver
  }
}
