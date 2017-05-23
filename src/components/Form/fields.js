/*
Common form fields used throughout the jog app.
Fields encapsulate text input properties and validation.

@flow
 */

import { emailValidator } from 'jog/src/screens/validators'
import type { TextFormField } from 'jog/src/types'

export const emailField: TextFormField = {
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

export const passwordField: TextFormField = {
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

export const validatedPasswordField: TextFormField = {
  ...passwordField,
  type: 'text',
  validate: (password: string) =>
    password && password.length >= 8
      ? null
      : 'Must be at least 8 characters long',
}

export const nameField: TextFormField = {
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
