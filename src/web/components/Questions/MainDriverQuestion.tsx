import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { ReduxState, FirebaseUser } from '../../../common/types'
import { Person, SelectQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import { policyHolderQuestion } from '../../../business/motor'

interface MainDriverQuestionProps {
  drivers: { [id: string]: Person },
  user: FirebaseUser,
  value: string,
  onChange: (id: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

type MainDriverQuestionState = {}

class MainDriverQuestion extends React.Component<MainDriverQuestionProps, MainDriverQuestionState>  {
  constructor(props: MainDriverQuestionProps) {
    super(props)
    const value = props.value
    this.state = {
      value
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
        ..._.values(this.props.drivers).map((d: Person) => {
          const value: string = d.id;
          const label = `${d.firstName} ${d.lastName}`;
          return {
            value,
            label,
          }
        }),
        {
          value: 'you',
          label: "You",
        },
      ],
    }

    return (
      <SelectQuestion
        value={this.props.value}
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
