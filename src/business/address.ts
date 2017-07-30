import * as _ from 'lodash'
import uuid from 'uuid/v4'
import { Address, TextQuestionDescriptor } from './types'
import { validate } from './validation'

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

export const nicknameQuestion: TextQuestionDescriptor = {
  id: 'address/nickname',
  type: 'text',
  questionText: 'Nick name',
  required: true,
}

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
  nicknameQuestion,
  firstLineQuestion,
  secondLineQuestion,
  cityQuestion,
  provinceQuestion,
  postCodeQuestion,
]

export const questionMap = _.keyBy(questions, q => q.id)

export function constructAddress(answers: { [id: string]: string }): Address {
  if (validate(questions, answers).hasError) {
    throw new Error('Address questions should have passed validation.')
  } else {
    const address: Address = {
      id: uuid(),
      name: '',
      firstLine: answers['address/first-line'] || '',
      secondLine: answers['address/second-line'] || '',
      city: answers['address/city'] || '',
      province: answers['address/province'] || '',
      postCode: answers['address/post-code'] || '',
    }

    return address
  }
}
