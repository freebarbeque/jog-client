/*
Common form fields used throughout the jog app.
Fields encapsulate text input properties and validation.
 */

import { ITextFormField } from '../../../common/types'
import { emailValidator } from '../../screens/validators'

export const emailField: ITextFormField = {
  type: 'text',
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true,
    keyboardType: 'email-address',
  },
  label: 'email',
  key: 'email',
  validate: emailValidator,
}

export const passwordField: ITextFormField = {
  type: 'text',
  inputProps: {
    secureTextEntry: true,
    blurOnSubmit: true,
  },
  label: 'password',
  key: 'password',
  validate: p => {
    if (!p || !p.length) {
      return 'Please enter a valid password'
    }
    return null
  },
}

export const validatedPasswordField: ITextFormField = {
  ...passwordField,
  type: 'text',
  validate: (password: string) =>
    password && password.length >= 8
      ? null
      : 'Must be at least 8 characters long',
}

export const nameField: ITextFormField = {
  type: 'text',
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true,
  },
  label: 'full name',
  key: 'name',
  validate: (name: string) => (name ? null : 'Please enter your name'),
}
