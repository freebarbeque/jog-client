/*
Common form fields used throughout the jog app.
Fields encapsulate text input properties and validation.

@flow
 */

import type { TextFormField } from 'jog/src/types'

import { emailValidator } from 'jog/src/screens/validators'

export const emailField : TextFormField = {
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true,
    keyboardType: 'email-address',
  },
  label: 'email',
  key: 'email',
  type: 'text',
  validate: emailValidator
}

export const passwordField : TextFormField = {
  inputProps: {
    secureTextEntry: true,
    blurOnSubmit: true,
  },
  label: 'password',
  key: 'password',
  validate: (p) => {
    if (!p || !p.length) {
      return 'Please enter a valid password'
    }
    return null
  },
  type: 'text',
}

export const validatedPasswordField: TextFormField = {
  ...passwordField,
  validate: (password: string) => password && password.length >= 8 ? null : 'Must be at least 8 characters long'
}

export const nameField : TextFormField = {
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true
  },
  type: 'text',
  label: 'full name',
  key: 'name',
  validate: (name: string) => name ? null : 'Please enter your name'
}
