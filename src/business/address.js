// @flow

import _ from 'lodash'
import type { TextQuestionDescriptor, ValidationErrors } from './types'

// export interface Address {
//   id: string,
//   name: string,
//   firstLine: string,
//   city: string,
//   postCode: string,
//   houseType?: 'semi-detached' | 'detached' | 'terrace',
//   floors?: number,
//   numBedrooms?: number,
//   /* ... */
// }

export const firstLineQuestion: TextQuestionDescriptor = {
  id: 'address/first-line',
  type: 'text',
  questionText: 'First line',
  required: true,
}

export const secondLineQuestion: TextQuestionDescriptor = {
  id: 'address/second-line',
  type: 'text',
  questionText: 'Second line',
  required: false,
}

export const cityQuestion: TextQuestionDescriptor = {
  id: 'address/city',
  type: 'text',
  questionText: 'City',
  required: true,
}

export const provinceQuestion: TextQuestionDescriptor = {
  id: 'address/province',
  type: 'text',
  questionText: 'Province/County',
  required: false,
}

export const postCodeQuestion: TextQuestionDescriptor = {
  id: 'address/post-code',
  type: 'text',
  questionText: 'Post Code',
  required: true,
  validate: (answer: string) => {
    const valid = answer.match(
      /^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/,
    )
    return valid ? null : 'Invalid postcode'
  },
}

export const questions = [
  firstLineQuestion,
  secondLineQuestion,
  cityQuestion,
  provinceQuestion,
  postCodeQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export function validate(answers: {
  [questionId: string]: mixed,
}): ValidationErrors {
  const errors: ValidationErrors = {
    hasError: false,
    nonField: [],
    field: {},
  }

  const requiredQuestions = questions.filter(q => q.required)
  requiredQuestions.forEach(q => {
    if (!answers[q.id]) {
      errors.field[q.id] = `The question "${q.questionText}" must be answered.`
      errors.hasError = true
    }
  })

  questions.forEach(q => {
    const answer = answers[q.id]
    if (!errors.field[q.id] && answer && q.validate) {
      const error = q.validate(answer.answer)
      if (error) {
        error.field[q.id] = error
        errors.hasError = true
      }
    }
  })

  return errors
}
