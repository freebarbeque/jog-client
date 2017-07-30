const validator = require('email-validator')

export function emailValidator(email: string): string | null {
  if (!validator.validate(email)) {
    return 'Please enter a valid email address.'
  }
  return null
}
