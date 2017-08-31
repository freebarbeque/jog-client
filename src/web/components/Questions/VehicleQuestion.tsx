import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import { vehicleQuestion } from 'jog-common/business/motor'
import { ICar, ISelectQuestionDescriptor } from 'jog-common/business/types'
import { push } from 'react-router-redux'

import { deleteCarAction, setCarAnswers } from '~/common/store/markets'
import EditDeleteSelectAccessories from '~/web/components/Questions/EditDeleteSelectAccessories'
import { IFirebaseUser, IReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

interface IProps extends DispatchProp<any>, RouteComponentProps<{}> {
  cars: { [id: string]: ICar }
  user: IFirebaseUser
  value: string
  onChange: (id: string) => void
  error?: string
  index?: number
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
        error={this.props.error}
        index={this.props.index}
        renderAccessory={(o: { label: string; value: string }) => {
          return (
            <EditDeleteSelectAccessories
              onDeletePress={() => this.onDeletePress(o.value)}
              onEditPress={() => this.onEditPress(o.value)}
            />
          )
        }}
      />
    )
  }

  private onEditPress = (vehicleId: string) => {
    this.props.dispatch(push(`/app/tabs/markets/motor/vehicle/${vehicleId}`))
  }

  private onDeletePress = (vehicleId: string) => {
    this.props.dispatch(deleteCarAction(vehicleId))
  }

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-car') {
      this.props.dispatch(setCarAnswers({}))
      this.props.dispatch(push('/app/tabs/markets/motor/vehicle'))
    }
  }
}

export default connect((state: IReduxState) => ({
  cars: state.markets.cars,
  user: state.auth.user,
}))(withRouter(VehicleQuestion))
