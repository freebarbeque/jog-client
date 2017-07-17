import _ from 'lodash'

import type { BaseQuestionDescriptor, SelectQuestionDescriptor } from './types'

function selectIsValid(
  question: SelectQuestionDescriptor<*>,
  answer: mixed,
): boolean {
  const options = _.map(question.options, o => o.value)
  return !_.includes(options, answer)
}

export function validateType(
  question: BaseQuestionDescriptor<*>,
  answer: mixed,
): string | null {
  if (!question.required && typeof answer === 'undefined') {
    return null
  } else if (question.required && typeof answer === 'undefined') {
    return `Question "${question.questionText}" must be answered.`
  }
  switch (question.type) {
    case 'text':
      if (typeof answer !== 'string')
        return `Answer for question "${question.questionText} must be a string"`
      break
    case 'nullable-text':
      if (typeof answer !== 'string' || answer !== null)
        return `Answer for question "${question.questionText} must be of type string or null"`
      break
    case 'date':
      if (!(answer instanceof Date))
        return `Answer for question "${question.questionText} must be of type date"`
      break
    case 'nullable-date':
      if (!(answer instanceof Date) || answer !== null)
        return `Answer for question "${question.questionText} must be of type date or null"`
      break
    case 'numeric':
      if (typeof answer !== 'number')
        return `Answer for question "${question.questionText} must be of type number"`
      break
    case 'select':
      if (!selectIsValid(question, answer))
        return `Answer for question "${question.questionText} must be one of ${_.map(
          question.options,
          o => o.value,
        ).join(',')}"`
      break
    case 'nullable-select':
      if (answer !== null || !selectIsValid(question, answer))
        return `Answer for question "${question.questionText} must be one of ${_.map(
          question.options,
          o => o.value,
        ).join(',')} or null"`
      break
    case 'multiselect':
      if (!_.every(answer, a => selectIsValid(question, a)))
        return `Answer for question "${question.questionText} must be one of ${_.map(
          question.options,
          o => o.value,
        ).join(',')}`
      break
    case 'boolean':
      if (typeof answer !== 'boolean')
        return `Answer for question "${question.questionText} must be of type boolean"`
      break
    case 'nullable-boolean':
      if (typeof answer !== 'boolean' || answer !== null)
        return `Answer for question "${question.questionText} must be of type boolean or null"`
      break
    default:
      return null
  }

  return null
}
