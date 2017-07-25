// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import type { ReduxState } from '../../../common/types'
import type { Person, SelectQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import { policyHolderQuestion } from '../../../business/motor'

type MainDriverQuestionProps = {
  drivers: { [string]: Person },
  // user: FirebaseUser,
  value: Person,
  onChange: (id: string, value: Person) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

type MainDriverQuestionState = {}

class MainDriverQuestion extends Component {
  props: MainDriverQuestionProps
  state: MainDriverQuestionState

  constructor(props: MainDriverQuestionProps) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.id : null,
    }
  }

  handleSpecialOptionClick = (value: string) => {
    if (value === 'new-driver') {
      // TODO: Route to new driver screen
    }
  }

  render() {
    const descriptor: SelectQuestionDescriptor<string> = {
      ...policyHolderQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.drivers, (d: Person) => {
          return {
            value: d.id,
            label: `${d.firstName} ${d.lastName}`,
          }
        }),
        {
          value: 'you',
          label: `You`,
        },
      ],
    }

    return (
      <SelectQuestion
        descriptor={descriptor}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        specialOptions={[{ label: 'Add new driver', value: 'new-driver' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
      />
    )
  }
}

export default connect((state: ReduxState) => ({
  drivers: state.markets.drivers,
  user: state.auth.user,
}))(MainDriverQuestion)
