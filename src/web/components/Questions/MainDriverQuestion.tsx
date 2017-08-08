import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { push } from 'react-router-redux'
import { policyHolderQuestion } from '../../../business/motor'
import { Person, SelectQuestionDescriptor } from '../../../business/types'
import { FirebaseUser, ReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

interface Props {
  drivers: { [id: string]: Person }
  user: FirebaseUser
  value: string
  onChange: (id: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

interface ConnectedProps extends Props, DispatchProp<any> {}

interface State {}

class MainDriverQuestion extends React.Component<ConnectedProps, State> {
  constructor(props: ConnectedProps) {
    super(props)
    const value = props.value
    this.state = {
      value,
    }
  }

  handleSpecialOptionClick = (value: string) => {
    if (value === 'new-driver') {
      this.props.dispatch(push('/app/tabs/markets/motor/driver'))
    }
  }

  render() {
    const descriptor: SelectQuestionDescriptor<any> = {
      ...policyHolderQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.drivers).map((d: Person) => {
          const value: string = d.id
          const label = `${d.firstName} ${d.lastName}`
          return {
            value,
            label,
          }
        }),
        {
          value: 'you',
          label: 'You',
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

const ConnectedMainDriverQuestion: React.ComponentClass<Props> = connect<
  {},
  {},
  Props
>((state: ReduxState) => ({
  drivers: state.markets.drivers,
  user: state.auth.user,
}))(MainDriverQuestion)

export default ConnectedMainDriverQuestion
