import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { push } from 'react-router-redux'
import { vehicleQuestion } from '../../../business/motor'
import { Car, SelectQuestionDescriptor } from '../../../business/types'
import { FirebaseUser, ReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

interface Props extends DispatchProp<any> {
  cars: { [id: string]: Car }
  user: FirebaseUser
  value: string
  onChange: (id: string) => void
}

interface VehicleQuestionState {
  value: string | null
}

class VehicleQuestion extends React.Component<Props, VehicleQuestionState> {
  constructor(props: Props) {
    super(props)
    const value = props.value
    this.state = {
      value,
    }
  }

  handleSpecialOptionClick = (value: string) => {
    if (value === 'new-car') {
      this.props.dispatch(push('/app/tabs/markets/motor/vehicle'))
    }
  }

  render() {
    const descriptor: SelectQuestionDescriptor<any> = {
      ...vehicleQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.cars).map((car: Car) => {
          return {
            value: car.id,
            label: `${car.make} ${car.model}`,
          }
        }),
      ],
    }

    const value = this.props.value

    return (
      <SelectQuestion
        value={value}
        descriptor={descriptor}
        onChange={this.props.onChange}
        specialOptions={[{ label: 'Add new vehicle', value: 'new-car' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
      />
    )
  }
}

export default connect((state: ReduxState) => ({
  cars: state.markets.cars,
  user: state.auth.user,
}))(VehicleQuestion)
