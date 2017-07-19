// @flow

import _ from 'lodash'

import type { BaseQuestionDescriptor, ValidationErrors } from './types'

function selectIsValid(question: any, answer: mixed): boolean {
  if (question.options) {
    const options = _.map(question.options, o => o.value)
    return _.includes(options, answer)
  }
  throw new Error('Select question descriptor has no options')
}

export function validate(
  questions: any[],
  answers: {
    [questionId: string]: mixed,
  },
) {
  const errors: ValidationErrors = {
    hasError: false,
    nonField: [],
    field: {},
  }

  const requiredQuestions = questions.filter(q => q.required)

  requiredQuestions.forEach(q => {
    if (answers[q.id] === undefined) {
      errors.field[q.id] = `This field is required.`
      errors.hasError = true
    }
  })

  questions.forEach(q => {
    const answer: any = answers[q.id]
    let error = validateType(q, answer)
    if (error) {
      errors.field[q.id] = error
      errors.hasError = true
    }

    if (!errors.field[q.id] && answer && q.validate) {
      error = q.validate(answer)
      if (error) {
        errors.field[q.id] = error
        errors.hasError = true
      }
    }
  })

  return errors
}

export function validateType(
  question: BaseQuestionDescriptor<*>,
  answer: mixed,
): string | null {
  if (!question.required && typeof answer === 'undefined') {
    return null
  } else if (question.required && typeof answer === 'undefined') {
    return `This field is required.`
  }
  switch (question.type) {
    case 'text':
      if (typeof answer !== 'string')
        return `Answer for question "${question.questionText} must be a string"`
      else if (question.required && answer.trim() === '')
        return `This field is required.`
      break
    case 'nullable-text':
      if (typeof answer !== 'string' && answer !== null)
        return `Answer for question "${question.questionText} must be of type string or null"`
      break
    case 'date':
      if (!(answer instanceof Date))
        return `Answer for question "${question.questionText} must be an instance of Date"`
      break
    case 'nullable-date':
      if (!(answer instanceof Date) && answer !== null)
        return `Answer for question "${question.questionText} must be an instance of Date or null"`
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
      if (answer !== null && !selectIsValid(question, answer))
        return `Answer for question "${question.questionText} must be one of ${_.map(
          question.options,
          o => o.value,
        ).join(',')} or null"`
      break
    case 'multiselect':
      if (
        Array.isArray(answer) &&
        !_.every(answer, a => selectIsValid(question, a))
      )
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
      if (typeof answer !== 'boolean' && answer !== null)
        return `Answer for question "${question.questionText} must be of type boolean or null"`
      break
    default:
      return null
  }

  return null
}
