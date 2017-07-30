import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { ReduxState, FirebaseUser } from '../../../common/types'
import { Person, SelectQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import { policyHolderQuestion } from '../../../business/motor'

type VehicleQuestionProps = {
  drivers: { [id: string]: Person },
  user: FirebaseUser,
  value: string,
  onChange: (id: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

type VehicleQuestionState = {
  value: string | null
}

class VehicleQuestion extends React.Component<VehicleQuestionProps, VehicleQuestionState> {

  constructor(props: VehicleQuestionProps) {
    super(props)
    const value = props.value
    this.state = {
      value,
    }
  }

  handleSpecialOptionClick = (value: string) => {
    if (value === 'new-driver') {
      // TODO: Route to new driver screen
    }
  }

  render() {
    const descriptor: SelectQuestionDescriptor<any> = {
      ...policyHolderQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.drivers).map((person: Person) => {
          return {
            value: person.id,
            label: `${person.firstName} ${person.lastName}`,
          }
        }),
        {
          value: 'you',
          label: `You`,
        },
      ],
    }

    const value = this.props.value

    return (
      <SelectQuestion
        value={value}
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
}))(VehicleQuestion)
