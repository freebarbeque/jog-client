import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { push } from 'react-router-redux'
import { vehicleQuestion } from '../../../business/motor'
import { ICar, ISelectQuestionDescriptor } from '../../../business/types'
import { IFirebaseUser, IReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

interface IProps extends DispatchProp<any> {
  cars: { [id: string]: ICar }
  user: IFirebaseUser
  value: string
  onChange: (id: string) => void
}

interface IState {
  value: string | null
}

class VehicleQuestion extends React.Component<IProps, IState> {
  public render() {
    const descriptor: ISelectQuestionDescriptor<any> = {
      ...vehicleQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.cars).map((car: ICar) => {
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

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-car') {
      this.props.dispatch(push('/app/tabs/markets/motor/vehicle'))
    }
  }
}

export default connect((state: IReduxState) => ({
  cars: state.markets.cars,
  user: state.auth.user,
}))(VehicleQuestion)
